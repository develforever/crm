<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class ImagePostDto
{
     #[Assert\Type('string')]
    public string $path;

    #[Assert\Type('string')]
    public string $alt;
}
