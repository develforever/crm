<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Data;
use App\Entity\CmsMenu;
use App\Repository\CmsMenuRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/crm/api/cms')]
final class MenusController extends AbstractController
{

    public function __construct(
        private CmsMenuRepository $menuRepo,
    ) {}

    #[Route('/menus', name: 'app_crm_api_cms_menus', methods: 'GET')]
    public function index(): JsonResponse
    {
        $data = new Data();

        $data->data = $this->menuRepo->findAll();

        return $this->json($data, 200, [], ['groups' => 'cms_read']);
    }
}
