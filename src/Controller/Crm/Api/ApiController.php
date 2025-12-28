<?php

namespace App\Controller\Crm\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiController extends AbstractController
{
    #[Route('/crm/api', name: 'app_crm_api_index')]
    public function index(): Response
    {

        $data = [];

        return new JsonResponse($data);
    }
}
