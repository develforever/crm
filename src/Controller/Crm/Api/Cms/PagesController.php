<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\PagePatchDto;
use App\Api\Crm\Cms\Dto\PagePutDto;
use App\Controller\Crm\Api\AbstractController;
use App\Controller\UsePaginatorTrait;
use App\Entity\CmsPage;
use App\Repository\CmsPageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/crm/api/cms')]
final class PagesController extends AbstractController
{
    use UsePaginatorTrait;

    public function __construct(
        private CmsPageRepository $pageRepo,
    ) {}

    #[Route('/pages', name: 'app_crm_api_cms_pages', methods: 'GET')]
    public function index(
        Request $request,
    ): JsonResponse {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = min(100, max(1, (int) $request->query->get('limit', 10)));

        $items = $this->pageRepo->findPaginated($page, $limit);
        $total = $this->pageRepo->countAll();

        return $this->createDataResponse([
            'data' => $items,
            'meta' => [
                'pagination' => $this->buildPaginationMeta($total, $page, $limit),
            ],
        ]);
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_view', methods: 'GET')]
    public function view(
        #[MapEntity()] CmsPage $page
    ): JsonResponse {


        return $this->createDataResponse(['data' => $page]);
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

        $page->updateFromDto($dto);

        $em->persist($page);
        $em->flush();


        return $this->createDataResponse(['data' => $page]);
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


        $page->setTranslatableLocale($dto->locale ?? $page->getTranslatableLocale());
        $page->updateFromDto($dto);

        $em->flush();

        return $this->createDataResponse(['data' => $page]);
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_patch', methods: 'PATCH')]
    public function patch(
        #[MapEntity()] CmsPage $page,
        #[MapRequestPayload()] PagePatchDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        if ($dto->locale !== null) {
            $page->setTranslatableLocale($dto->locale);
        }

        $page->updateFromDto($dto);

        $em->flush();

        return $this->createDataResponse(['data' => $page]);
    }

    #[Route('/pages/page/{id}', name: 'app_crm_api_cms_page_delete', methods: 'DELETE')]
    public function delete(
        #[MapEntity()] CmsPage $page,
        EntityManagerInterface $em,
    ): JsonResponse {


        $em->remove($page);
        $em->flush();

        return $this->createDataResponse(['data' => $page]);
    }
}
