<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class MenuPostDto
{
     #[Assert\Type('string')]
    public string $title;

    #[Assert\Type('string')]
    public string $name;
}
