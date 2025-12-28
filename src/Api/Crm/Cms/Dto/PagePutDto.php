<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class PagePutDto
{
    #[Assert\Type('string')]
    public string $htmlContnet;
}
