<?php

namespace App\Twig;

use App\Entity\CmsHtml;
use App\Entity\CmsImage;
use App\Entity\CmsText;
use App\Entity\CmsWidget;
use App\Entity\CmsWidgetItem;
use App\Repository\CmsImageRepository;
use App\Repository\CmsMenuRepository;
use App\Repository\CmsPageRepository;
use App\Repository\CmsWidgetRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CmsExtension extends AbstractExtension
{
    public function __construct(
        private CmsMenuRepository $menuRepository,
        private CmsWidgetRepository $widgetRepository,
        private CmsImageRepository $imageRepository,
        private CmsPageRepository $pageRepository,
        private Environment $twig,
        private EntityManagerInterface $em,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('cms_menu', [$this, 'getMenu']),
            new TwigFunction('cms_widget', [$this, 'renderWidget'], ['is_safe' => ['html']]),
            new TwigFunction('cms_image', [$this, 'getImage'], ['is_safe' => ['html']]),
            new TwigFunction('cms_page_content', [$this, 'getPageContent'], ['is_safe' => ['html'], 'needs_context' => true,]),
            new TwigFunction('cms_page_link', [$this, 'getPageLink'], ['is_safe' => ['html']]),

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

    public function getPageLink(int $pageId, ?string $label): string
    {
        $out = '';

        $page = $this->pageRepository->findOneBy(['id' => $pageId]);
        if ($page) {
            $out =  $this->parseDynamicContent('<a href="{{ path(\'cms_page\', {\'slug\': \'' . $page->getSlug() . '\'}) }}" >' . ($label ?? $page->getTitle()) . '</a>');
        }

        return $out;
    }


    public function getPageContent(array $context, string $content): string
    {
        $template = $this->twig->createTemplate($content);
        return $template->render($context);
    }



    public function renderWidget(string $name): string
    {
        $widget = $this->widgetRepository->findOneBy(['name' => $name]);
        if (!$widget) {
            $widget = new CmsWidget();
            $widget->setName($name);
            $widget->setTitle('Auto: change this');
            $this->em->persist($widget);
            $this->em->flush();

            return $this->parseDynamicContent('{{\'define_widget\'|trans}} \'' . $name . '\'');
        }

        $output = '<div>
        <h4>' . $widget->getTitle() . '</h4>';
        $items = $widget->getCmsWidgetItems();

        if ($items && count($items) > 0) {

            foreach ($items as $item) {
                $content = $this->resolveContent($item);
                $output .= $this->parseDynamicContent($content);
            }
        } else {
            $output .= $this->parseDynamicContent('{{ \'no_items\' | trans([], \'cms\')}}');
        }
        $output .= '</div>';
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
        $content = $item->getContent();

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
