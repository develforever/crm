<?php

namespace App\Twig;

use App\Repository\CmsMenuRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CmsExtension extends AbstractExtension
{
    public function __construct(
        private CmsMenuRepository $menuRepository
    ) {}

    public function getFunctions(): array
    {
        return [
            // Rejestrujemy funkcję dostępną w Twig
            new TwigFunction('cms_menu', [$this, 'getMenu']),
        ];
    }

    public function getMenu(string $identifier): array
    {
        $menu = $this->menuRepository->findOneBy(['name' => $identifier]);

        if (!$menu) {
            return [];
        }

        // Zwracamy posortowane elementy menu
        $items = $menu->getCmsMenuItems()->toArray();
        usort($items, fn($a, $b) => $a->getPosition() <=> $b->getPosition());

        return $items;
    }
}
