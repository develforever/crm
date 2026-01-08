<?php


namespace App\Controller\Crm\Api;

use App\Api\Crm\Data;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as BaaseController;

abstract class AbstractController extends BaaseController
{


    protected function createDataResponse($data, int $status = 200, array $ctx = ['groups' => 'cms_read'], array $headers = [])
    {

        $output = new Data();
        $output->data = $data;
        return $this->json($output, $status, $headers, $ctx);
    }
}
