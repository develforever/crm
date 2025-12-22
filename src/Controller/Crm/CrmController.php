<?php

namespace App\Controller\Crm;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CrmController extends AbstractController
{
    #[Route('/crm/{reactRouting}', name: 'crm_index', requirements: ['reactRouting' => '.*'])]
    public function index(): Response
    {
        return $this->render('crm/index.html.twig', [
            'controller_name' => 'CrmController',
        ]);
    }
}
