<?php

namespace App\Api\Crm\Cms\Dto;

use App\Api\IDto;
use Symfony\Component\Validator\Constraints as Assert;

class ImagePostDto implements IDto
{
     #[Assert\Type('string')]
    public string $path;

    #[Assert\Type('string')]
    public string $alt;
}
