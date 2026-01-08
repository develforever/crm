<?php

namespace App\Controller\Crm\Api\Cms\Contents;

use App\Entity\CmsHtml;
use App\Api\Crm\Cms\Dto\HtmlPostDto;
use App\Controller\Crm\Api\AbstractController;
use App\Repository\CmsHtmlRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[Route('/crm/api/cms/contents')]
final class HtmlsController extends AbstractController
{

    public function __construct(
        private CmsHtmlRepository $htmlRepo
    ) {}

    #[Route('/htmls', name: 'app_crm_api_cms_htmls', methods: 'GET')]
    public function index(): JsonResponse
    {

        return $this->createDataResponse($this->htmlRepo->findAll());
    }

    #[Route('/htmls', name: 'app_crm_api_cms_htmls_post', methods: 'POST')]
    public function post(
        #[MapRequestPayload()] HtmlPostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $html = new CmsHtml();
        $html->setContent($dto->content);
        $em->persist($html);
        $em->flush();


        return $this->createDataResponse($html);
    }
}
