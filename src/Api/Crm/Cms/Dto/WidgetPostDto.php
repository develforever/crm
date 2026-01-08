<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class WidgetPostDto implements IDto
{
     #[Assert\Type('string')]
    public string $name;

    #[Assert\Type('string')]
    public string $title;
}
