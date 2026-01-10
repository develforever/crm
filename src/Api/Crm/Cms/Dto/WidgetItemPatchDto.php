<?php

namespace App\Api\Crm\Cms\Dto;

use App\Api\IDto;
use Symfony\Component\Validator\Constraints as Assert;

class WidgetItemPatchDto implements IDto
{
    #[Assert\Type('int')]
    public ?int $position = null;

     #[Assert\Type('string')]
    public ?string $type = null;

    #[Assert\Type('string')]
    public ?string $plainText = null;

    #[Assert\Type('string')]
    public ?string $content = null;

    #[Assert\Type('string')]
    public ?string $alt = null;

    #[Assert\Type('string')]
    public ?string $path = null;
}
