<?php

namespace App\Controller\Intranet;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class IntranetController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
         return $this->forward('App\Controller\Intranet\CmsController::dispatch', [
            'slug'  => 'index',
        ]);
    }
}
