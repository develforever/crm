<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TextPostDto implements IDto
{
     #[Assert\Type('string')]
    public string $plainText;
}
