<?php

namespace App\Tests\Unit\Entity\Trait\UpdateFromDto;

use App\Api\Crm\Cms\Dto\PagePutDto;
use App\Api\Crm\Data;
use App\Entity\Trait\UpdateFromDtoTrait;
use PHPUnit\Framework\TestCase;


class DataTest extends TestCase
{

    public function testCheck(): void
    {

        $data = new Data();
        $data->message = 'test';

        $this->assertIsArray($data->getData());
        $this->assertEquals([
            'error' => null,
            'data' => null,
            'meta' => null,
            'message' => 'test',
        ], $data->getData());
    }
}
