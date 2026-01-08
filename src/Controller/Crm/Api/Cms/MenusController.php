<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\MenuPostDto;
use App\Api\Crm\Data;
use App\Controller\Crm\Api\AbstractController;
use App\Entity\CmsMenu;
use App\Repository\CmsMenuRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
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

        return $this->createDataResponse(['data' => $this->menuRepo->findAll()]);
    }

    #[Route('/menus', name: 'app_crm_api_cms_menus_post', methods: 'POST')]
    public function post(
        #[MapRequestPayload()] MenuPostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $menu = new CmsMenu();
        $menu->setName($dto->name);
        $menu->setTitle($dto->title);

        $em->persist($menu);
        $em->flush();

        return $this->createDataResponse(['data' => $menu]);
    }
}
