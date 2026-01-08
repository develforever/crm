<?php

namespace App\Controller\Intranet;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CmsPageRepository;
use App\Service\Cms\TemplateResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

final class CmsController extends AbstractController
{

    public function __construct(
        private TranslatorInterface $translator,
        private TemplateResolver $templateResolver,
    ) {}

    #[Route(
        '/{_locale}/{slug}',
        name: 'cms_page',
        requirements: [
            'slug' => '.*',
            '_locale' => 'pl|en'
        ],
        defaults: [
            '_locale' => 'en',
            'slug' => 'index'
        ],
        priority: -10
    )]
    public function dispatch(string $_locale, string $slug, CmsPageRepository $pageRepo): Response
    {

        $page = $pageRepo->findActiveBySlugAndLocale($slug);

        if (!$page) {
            throw $this->createNotFoundException($this->translator->trans('page_not_found', [
                '{slug}' => $slug,
            ]));
        }

        $template = $this->templateResolver->resolveForPage($slug);

        return $this->render($template, [
            'page' => $page
        ]);
    }
}
