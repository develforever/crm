<?php


namespace App\Controller\Crm\Api;

use App\Api\Crm\Data;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as BaseController;

abstract class AbstractController extends BaseController
{


    protected function createDataResponse(array $data, int $status = 200, array $ctx = ['groups' => 'cms_read'], array $headers = [])
    {

        $output = new Data();
        foreach ($data as $key => $value) {
            $output->$key = $value;
        }

        return $this->json($output, $status, $headers, $ctx);
    }

    
}
