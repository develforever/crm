<?php

namespace App\Controller\Crm\Api\Cms;

use App\Entity\CmsWidget;
use App\Api\Crm\Cms\Dto\WidgetPostDto;
use App\Controller\Crm\Api\AbstractController;
use App\Repository\CmsWidgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[Route('/crm/api/cms')]
final class WidgetsController extends AbstractController
{

    public function __construct(
        private CmsWidgetRepository $widgetRepo,
    ) {}

    #[Route('/widgets', name: 'app_crm_api_cms_widgets', methods: 'GET')]
    public function index(): JsonResponse
    {

        return $this->createDataResponse(['data' => $this->widgetRepo->findAll()]);
    }

    #[Route('/widgets', name: 'app_crm_api_cms_widgets_post', methods: 'POST')]
    public function post(
        #[MapRequestPayload()] WidgetPostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $widget = new CmsWidget();
        $widget->setName($dto->name);
        $widget->setTitle($dto->title);
        $em->persist($widget);
        $em->flush();

        return $this->createDataResponse(['data' => $widget]);
    }
}
