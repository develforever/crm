<?php

namespace App\Controller\Intranet;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class IntranetController extends AbstractController
{
    #[Route('/', name: 'intranet')]
    public function index(): Response
    {
        return $this->render('intranet/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }
}
