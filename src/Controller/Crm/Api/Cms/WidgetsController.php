<?php

namespace App\Controller\Crm\Api\Cms;

use App\Api\Crm\Cms\Dto\WidgetItemPatchDto;
use App\Api\Crm\Cms\Dto\WidgetItemPostDto;
use App\Entity\CmsWidget;
use App\Api\Crm\Cms\Dto\WidgetPostDto;
use App\Api\Crm\Cms\Dto\WidgetPutDto;
use App\Controller\Crm\Api\AbstractController;
use App\Entity\CmsHtml;
use App\Entity\CmsImage;
use App\Entity\CmsText;
use App\Entity\CmsWidgetItem;
use App\Repository\CmsWidgetItemRepository;
use App\Repository\CmsWidgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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


        return $this->createDataResponse([
            'data' => $widget,
            'meta' => [
                'items' => [
                    'types' => [
                        CmsWidgetItem::TYPE_TEXT,
                        CmsWidgetItem::TYPE_IMAGE,
                        CmsWidgetItem::TYPE_HTML,
                    ],
                ],
            ],
        ]);
    }

    #[Route('/widgets/{id}/items', name: 'app_crm_api_cms_widget_view_items', methods: 'GET')]
    public function viewItems(
        #[MapEntity()] CmsWidget $widget,
        CmsWidgetItemRepository $widgetItemRepo,
    ): JsonResponse {


        return $this->createDataResponse([
            'data' => $widgetItemRepo
                ->findBy(['widget' => $widget], ['position' => 'ASC']),
        ], 200,  [
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

        $content = match ($dto->type) {
            CmsWidgetItem::TYPE_TEXT => (function () use ($dto) {
                $out =  new CmsText();
                $out->setPlainText($dto->plainText);
                return $out;
            })(),
            CmsWidgetItem::TYPE_IMAGE => (function () use ($dto) {
                $out =  new CmsImage();
                $out->setAlt($dto->alt);
                $out->setPath($dto->path);
                return $out;
            })(),
            CmsWidgetItem::TYPE_HTML => (function () use ($dto) {
                $out =  new CmsHtml();
                $out->setContent($dto->content);
                return $out;
            })(),
            default => throw new BadRequestHttpException('Unsupported widget item type: ' . $dto->type),
        };

        $widgetItem->setContent($content);
        $widget->addCmsWidgetItem($widgetItem);

        $em->flush();

        return $this->createDataResponse(['data' => $widgetItem]);
    }

    #[Route('/widgets/{id}/item/{itemId}', name: 'app_crm_api_cms_widget_patch_item', methods: 'PATCH')]
    public function patchItem(
        #[MapEntity()] CmsWidget $widget,
        #[MapEntity(id: 'itemId')] CmsWidgetItem $widgetItem,
        #[MapRequestPayload()] WidgetItemPatchDto $dto,
        EntityManagerInterface $em,
    ): JsonResponse {

        if ($dto->position !== null) {
            $widgetItem->setPosition($dto->position);
        }

        if ($dto->plainText !== null) {
            $content = $widgetItem->getContent();
            if ($content instanceof CmsText) {
                $content->setPlainText($dto->plainText);
            }
        }

        if ($dto->content !== null) {
            $content = $widgetItem->getContent();
            if ($content instanceof CmsHtml) {
                $content->setContent($dto->content);
            }
        }

        if ($dto->alt !== null) {
            $content = $widgetItem->getContent();
            if ($content instanceof CmsImage) {
                $content->setAlt($dto->alt);
            }
        }

        if ($dto->path !== null) {
            $content = $widgetItem->getContent();
            if ($content instanceof CmsImage) {
                $content->setPath($dto->path);
            }
        }

        $em->flush();

        return $this->createDataResponse(['data' => $widgetItem]);
    }

    #[Route('/widgets/{id}/item/{itemId}', name: 'app_crm_api_cms_widget_delete_item', methods: 'DELETE')]
    public function deleteItem(
        #[MapEntity()] CmsWidget $widget,
        #[MapEntity(id: 'itemId')] CmsWidgetItem $widgetItem,
        EntityManagerInterface $em,
    ): JsonResponse {

        $widget->removeCmsWidgetItem($widgetItem);
        
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
