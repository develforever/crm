<?php

namespace App\Controller\Intranet;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CmsPageRepository;

final class CmsController extends AbstractController
{
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
        $page = $pageRepo->findOneBy(['slug' => $slug, 'isActive' => true]);

        if (!$page) {
            throw $this->createNotFoundException('Strona nie istnieje w CMS.');
        }

        // 1. Czyścimy slug do nazwy pliku (zamiana / na _ )
        $templateSafeSlug = str_replace('/', '_', $slug);

        // 2. Definiujemy ścieżkę dedykowaną i domyślną
        $customTemplate = sprintf('intranet/cms/pages/%s.html.twig', $templateSafeSlug);
        $defaultTemplate = 'intranet/cms/pages/default.html.twig';

        // 3. Sprawdzamy, czy deweloper stworzył dedykowany plik
        $template = $this->container->get('twig')->getLoader()->exists($customTemplate)
            ? $customTemplate
            : $defaultTemplate;

        return $this->render($template, [
            'page' => $page
        ]);
    }
}
