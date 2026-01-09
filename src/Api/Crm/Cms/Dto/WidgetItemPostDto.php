<?php

namespace App\Api\Crm\Cms\Dto;

use App\Api\IDto;
use Symfony\Component\Validator\Constraints as Assert;

class WidgetItemPostDto implements IDto
{
    #[Assert\Type('int')]
    public int $position;

     #[Assert\Type('string')]
    public string $type;

    #[Assert\Type('string')]
    public ?string $plainText;

    #[Assert\Type('string')]
    public ?string $contnet;

    #[Assert\Type('string')]
    public ?string $alt;

    #[Assert\Type('string')]
    public ?string $path;
}
