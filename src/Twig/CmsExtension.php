<?php

namespace App\Twig;

use App\Entity\CmsHtml;
use App\Entity\CmsImage;
use App\Entity\CmsText;
use App\Entity\CmsWidgetItem;
use App\Repository\CmsImageRepository;
use App\Repository\CmsMenuRepository;
use App\Repository\CmsWidgetRepository;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CmsExtension extends AbstractExtension
{
    public function __construct(
        private CmsMenuRepository $menuRepository,
        private CmsWidgetRepository $widgetRepository,
        private CmsImageRepository $imageRepository,
        private Environment $twig,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('cms_menu', [$this, 'getMenu']),
            new TwigFunction('cms_widget', [$this, 'renderWidget'], ['is_safe' => ['html']]),
            new TwigFunction('cms_image', [$this, 'getImage'], ['is_safe' => ['html']]),
            new TwigFunction('cms_page_content', [$this, 'getPageContent'], ['is_safe' => ['html'], 'needs_context' => true,]),

        ];
    }

    public function getMenu(string $identifier): array
    {
        $menu = $this->menuRepository->findOneBy(['name' => $identifier]);

        if (!$menu) {
            return [];
        }

        $items = $menu->getCmsMenuItems()->toArray();
        usort($items, fn($a, $b) => $a->getPosition() <=> $b->getPosition());

        return $items;
    }

    public function getImage($imageId): string
    {
        $image = $this->imageRepository->findOneBy(['id' => $imageId]);

        if (!$image) {
            return sprintf('<img src="%s" alt="%s">', '/_none', '_none');
        }
        return sprintf('<img src="%s" alt="%s">', $image->getPath(), $image->getAlt());
    }


    public function getPageContent(array $context, string $content): string
    {
        $template = $this->twig->createTemplate($content);
        return $template->render($context);
    }



    public function renderWidget(string $name): string
    {
        $widget = $this->widgetRepository->findOneBy(['name' => $name]);
        if (!$widget) return $this->parseDynamicContent('{{\'define_widget\'|trans}} \''.$name.'\'');

        $output = '';
        foreach ($widget->getCmsWidgetItems() as $item) {

            $content = $this->resolveContent($item);

            $output .= $this->parseDynamicContent($content);
        }

        return $output;
    }

    private function parseDynamicContent(string $content): string
    {
        $template = $this->twig->createTemplate($content);
        return $template->render([]);
    }

    private function resolveContent(CmsWidgetItem $item)
    {
        $output = '';
        $content = $item->getCmsContent();

        if ($content instanceof CmsHtml) {
            $output .= $content->getContent();
        } elseif ($content instanceof CmsText) {
            $output .= $content->getPlainText();
        } elseif ($content instanceof CmsImage) {
            $output .= sprintf('<img src="%s" alt="%s">', $content->getPath(), $content->getAlt());
        }

        return $output;
    }
}
