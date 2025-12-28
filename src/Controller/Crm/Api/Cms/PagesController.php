<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\PagePutDto;
use App\Api\Crm\Data;
use App\Entity\CmsPage;
use App\Repository\CmsPageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;


final class PagesController extends AbstractController
{
    public function __construct(
        private CmsPageRepository $pageRepo,
    ) {}

    #[Route('/crm/api/cms/pages', name: 'app_crm_api_cms_pages', methods: 'GET')]
    public function index(): JsonResponse
    {
        $data = new Data();

        $data->data = $this->pageRepo->findAll();

        return $this->json($data, 200, [], ['groups' => 'cms_read']);
    }

    #[Route('/crm/api/cms/pages/page/{id}', name: 'app_crm_api_cms_page_view', methods: 'GET')]
    public function view(
        #[MapEntity()] CmsPage $page
    ): JsonResponse {
        $data = new Data();

        $data->data = $page;

        return $this->json($data, 200, [], ['groups' => 'cms_view']);
    }

    #[Route('/crm/api/cms/pages/page/{id}', name: 'app_crm_api_cms_page_put', methods: 'PUT')]
    public function put(
        #[MapEntity()] CmsPage $page,
        #[MapRequestPayload()] PagePutDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {


        $page->setContent($dto->htmlContnet);
        $em->flush();
        $data = new Data();

        $data->data = $page;

        return $this->json($data, 200, [], ['groups' => 'cms_view']);
    }
}
