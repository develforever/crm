<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class PagePatchDto
{
    #[Assert\Type('string')]
    public string $htmlContnet;

    #[Assert\Type('string')]
    public string $title;

    #[Assert\Type('string')]
    public string $slug;

    #[Assert\Type('bool')]
    public bool $isActive;

    #[Assert\Type('string')]
    public string $locale;
}
