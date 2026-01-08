<?php

namespace App\Controller\Crm\Api\Cms\Contents;

use App\Entity\CmsImage;
use App\Api\Crm\Cms\Dto\ImagePostDto;
use App\Controller\Crm\Api\AbstractController;
use App\Repository\CmsImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[Route('/crm/api/cms/contents')]
final class ImagesController extends AbstractController
{

    public function __construct(
        private CmsImageRepository $imageRepo,
    ) {}

    #[Route('/images', name: 'app_crm_api_cms_images', methods: 'GET')]
    public function index(): JsonResponse
    {
        
        return $this->createDataResponse($this->imageRepo->findAll());
    }

    #[Route('/texts', name: 'app_crm_api_cms_images_post', methods: 'POST')]
    public function post(
        #[MapRequestPayload()] ImagePostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $image = new CmsImage();
        $image->setAlt($dto->alt);
        $image->setPath($dto->path);
        $em->persist($image);
        $em->flush();

        return $this->createDataResponse($image);
    }
}
