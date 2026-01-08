<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;

trait UsePaginatorTrait
{
    private function getPageNumber(Request $request): int
    {
        return max(1, (int) $request->query->get('page', 1));
    }

    private function getLimit(Request $request, int $default = 10, int $max = 100): int
    {
        return min($max, max(1, (int) $request->query->get('limit', $default)));
    }

    private function buildPaginationMeta(int $total, int $currentPage, int $limit): array
    {
        $totalPages = (int) ceil($total / $limit);

        return [
            'total' => $total,
            'current_page' => $currentPage,
            'limit' => $limit,
            'pages' => $totalPages,
            'next_page' => $currentPage < $totalPages ? $currentPage + 1 : null,
            'prev_page' => $currentPage > 1 ? $currentPage - 1 : null,
        ];
    }
}
