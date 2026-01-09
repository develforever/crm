<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\WidgetItemPostDto;
use App\Entity\CmsWidget;
use App\Api\Crm\Cms\Dto\WidgetPostDto;
use App\Api\Crm\Cms\Dto\WidgetPutDto;
use App\Controller\Crm\Api\AbstractController;
use App\Entity\CmsText;
use App\Entity\CmsWidgetItem;
use App\Repository\CmsWidgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
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

    #[Route('/widgets/{id}', name: 'app_crm_api_cms_widget_view', methods: 'GET')]
    public function view(
        #[MapEntity()] CmsWidget $widget
    ): JsonResponse {


        return $this->createDataResponse(['data' => $widget]);
    }

    #[Route('/widgets/{id}/items', name: 'app_crm_api_cms_widget_view_items', methods: 'GET')]
    public function viewItems(
        #[MapEntity()] CmsWidget $widget
    ): JsonResponse {


        return $this->createDataResponse(['data' => $widget->getCmsWidgetItems()], 200,  [
            'groups' => 'cms_view',
            'max_depth' => 3,
        ]);
    }

    #[Route('/widgets/{id}/item', name: 'app_crm_api_cms_widget_post_item', methods: 'POST')]
    public function postItem(
        #[MapEntity()] CmsWidget $widget,
        #[MapRequestPayload()] WidgetItemPostDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {


        $widgetItem = new CmsWidgetItem();
        $widgetItem->setType($dto->type);
        $widgetItem->setPosition($dto->position);

        $content = new CmsText();
        $content->setPlainText($dto->plainText);

        $widgetItem->setContent($content);
        $widget->addCmsWidgetItem($widgetItem);

        $em->flush();

        return $this->createDataResponse(['data' => $widgetItem]);
    }



    #[Route(
        '/widgets/{id}',
        name: 'app_crm_api_cms_widget_put',
        methods: 'PUT',
    )]
    public function put(
        #[MapEntity()] CmsWidget $widget,
        #[MapRequestPayload()] WidgetPutDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        $widget->updateFromDto($dto);

        $em->flush();

        return $this->createDataResponse(['data' => $widget]);
    }
}
