<?php

namespace App\Service\Cms;

use Twig\Environment;

class TemplateResolver
{
    private const TEMPLATE_DIRECTORY = 'intranet/cms/pages';
    private const DEFAULT_TEMPLATE = 'intranet/cms/pages/default.html.twig';
    private const TEMPLATE_EXTENSION = '.html.twig';

    private array $templateCache = [];

    public function __construct(
        private Environment $twig,
        private string $cmsTemplateDirectory,
        private string $cmsTemplateDefault,
    ) {}

    /**
     * Resolves template path for CMS page based on slug.
     * Falls back to default template if custom template doesn't exist.
     */
    public function resolveForPage(string $slug): string
    {
        if (isset($this->templateCache[$slug])) {
            return $this->templateCache[$slug];
        }

        $templatePath = $this->buildTemplatePath($slug);
        $resolved = $this->twig->getLoader()->exists($templatePath)
            ? $templatePath
            : ($this->cmsTemplateDefault ?? self::DEFAULT_TEMPLATE);

        $this->templateCache[$slug] = $resolved;

        return $resolved;
    }

    /**
     * Converts slug to template-safe filename.
     * Example: "about/contact" -> "about_contact"
     */
    private function buildTemplatePath(string $slug): string
    {
        $templateSafeSlug = str_replace('/', '_', $slug);

        return sprintf(
            '%s/%s%s',
            ($this->cmsTemplateDirectory ?? self::TEMPLATE_DIRECTORY),
            $templateSafeSlug,
            self::TEMPLATE_EXTENSION
        );
    }
}
