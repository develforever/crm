<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\PagePatchDto;
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

    #[Route(
        '/crm/api/cms/pages/page',
        name: 'app_crm_api_cms_page_put',
        methods: 'PUT',
    )]
    public function put(
        #[MapRequestPayload()] PagePutDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $page = new CmsPage();
        $page->setContent($dto->htmlContnet);
        $page->setTitle($dto->title);
        $page->setSlug($dto->slug);
        $page->setIsActive($dto->isActive);
        $page->setTranslatableLocale($dto->locale);

        $em->persist($page);
        $em->flush();

        $data = new Data();
        $data->data = $page;

        return $this->json($data, 200, [], ['groups' => 'cms_view']);
    }

    #[Route('/crm/api/cms/pages/page/{id}', name: 'app_crm_api_cms_page_patch', methods: 'PATCH')]
    public function patch(
        #[MapEntity()] CmsPage $page,
        #[MapRequestPayload()] PagePatchDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        if ($dto->title !== null) {
            $page->setTitle($dto->title);
        }

        if ($dto->slug !== null) {
            $page->setSlug($dto->slug);
        }

        if ($dto->htmlContnet !== null) {
            $page->setContent($dto->htmlContnet);
        }

        if ($dto->isActive !== null) {
            $page->setIsActive($dto->isActive);
        }

        if ($dto->locale !== null) {
            $page->setTranslatableLocale($dto->locale);
        }

        $em->flush();
        $data = new Data();

        $data->data = $page;

        return $this->json($data, 200, [], ['groups' => 'cms_view']);
    }

    #[Route('/crm/api/cms/pages/page/{id}', name: 'app_crm_api_cms_page_delete', methods: 'DELETE')]
    public function delete(
        #[MapEntity()] CmsPage $page,
        EntityManagerInterface $em,
    ): JsonResponse {


        $em->remove($page);
        $em->flush();
        $data = new Data();

        $data->data = $page;

        return $this->json($data, 200, [], ['groups' => 'cms_view']);
    }
}
