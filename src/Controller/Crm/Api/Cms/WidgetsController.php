<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Data;
use App\Entity\CmsMenu;
use App\Repository\CmsMenuRepository;
use App\Repository\CmsWidgetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/crm/api/cms')]
final class WidgetsController extends AbstractController
{

    public function __construct(
        private CmsWidgetRepository $widgetRepo,
    ) {}

    #[Route('/widgets', name: 'app_crm_api_cms_widgets', methods: 'GET')]
    public function index(): JsonResponse
    {
        $data = new Data();

        $data->data = $this->widgetRepo->findAll();

        return $this->json($data, 200, [], ['groups' => 'cms_read']);
    }
}
