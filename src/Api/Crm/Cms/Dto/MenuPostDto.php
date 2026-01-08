<?php

namespace App\Api\Crm\Cms\Dto;

use App\Api\IDto;
use Symfony\Component\Validator\Constraints as Assert;

class MenuPostDto implements IDto
{
     #[Assert\Type('string')]
    public string $title;

    #[Assert\Type('string')]
    public string $name;
}
