<?php

namespace App\Controller\Intranet;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class IntranetController extends AbstractController
{
    #[Route('/{_locale}', name: 'index', requirements: ['_locale' => 'pl|en'])]
    public function index(Request $request): Response
    {
         return $this->forward('App\Controller\Intranet\CmsController::dispatch', [
            '_locale' => $request->getLocale(),
            'slug'  => 'index',
        ]);
    }
}
