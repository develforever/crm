<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\PagePatchDto;
use App\Api\Crm\Cms\Dto\PagePutDto;
use App\Controller\Crm\Api\AbstractController;
use App\Entity\CmsPage;
use App\Repository\CmsPageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/crm/api/cms')]
final class PagesController extends AbstractController
{
    public function __construct(
        private CmsPageRepository $pageRepo,
    ) {}

    #[Route('/pages', name: 'app_crm_api_cms_pages', methods: 'GET')]
    public function index(): JsonResponse
    {

        return $this->createDataResponse($this->pageRepo->findAll());
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_view', methods: 'GET')]
    public function view(
        #[MapEntity()] CmsPage $page
    ): JsonResponse {
       

        return $this->createDataResponse($page);
    }

    #[Route(
        '/pages/page',
        name: 'app_crm_api_cms_page_post',
        methods: 'POST',
    )]
    public function post(
        #[MapRequestPayload()] PagePutDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $page = new CmsPage();
        $page->setContent($dto->content);
        $page->setTitle($dto->title);
        $page->setSlug($dto->slug);
        $page->setIsActive($dto->isActive);
        $page->setTranslatableLocale($dto->locale ?? 'en');

        $em->persist($page);
        $em->flush();


        return $this->createDataResponse($page);
    }

    #[Route(
        '/pages/page/{id}',
        name: 'app_crm_api_cms_page_put',
        methods: 'PUT',
    )]
    public function put(
        #[MapEntity()] CmsPage $page,
        #[MapRequestPayload()] PagePutDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {


        $page->setContent($dto->content);
        $page->setTitle($dto->title);
        $page->setSlug($dto->slug);
        $page->setIsActive($dto->isActive);
        $page->setTranslatableLocale($dto->locale ?? $page->getTranslatableLocale());

        $em->flush();

        return $this->createDataResponse($page);
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_patch', methods: 'PATCH')]
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

        if ($dto->content !== null) {
            $page->setContent($dto->content);
        }

        if ($dto->isActive !== null) {
            $page->setIsActive($dto->isActive);
        }

        if ($dto->locale !== null) {
            $page->setTranslatableLocale($dto->locale);
        }

        $em->flush();
     
        return $this->createDataResponse($page);
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_delete', methods: 'DELETE')]
    public function delete(
        #[MapEntity()] CmsPage $page,
        EntityManagerInterface $em,
    ): JsonResponse {


        $em->remove($page);
        $em->flush();

        return $this->createDataResponse($page);
    }
}
