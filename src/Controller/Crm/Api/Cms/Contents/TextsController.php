<?php

namespace App\Controller\Crm\Api\Cms\Contents;


use App\Entity\CmsText;
use App\Api\Crm\Cms\Dto\TextPostDto;
use App\Controller\Crm\Api\AbstractController;
use App\Repository\CmsTextRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[Route('/crm/api/cms/contents')]
final class TextsController extends AbstractController
{

    public function __construct(
        private CmsTextRepository $textRepo,
    ) {}

    #[Route('/texts', name: 'app_crm_api_cms_texts', methods: 'GET')]
    public function index(): JsonResponse
    {
        
        return $this->createDataResponse($this->textRepo->findAll());
    }

    #[Route('/texts', name: 'app_crm_api_cms_texts_post', methods: 'POST')]
    public function post(
        #[MapRequestPayload()] TextPostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $text = new CmsText();
        $text->setPlainText($dto->plainText);
        $em->persist($text);
        $em->flush();

        return $this->createDataResponse($text);
    }
}
