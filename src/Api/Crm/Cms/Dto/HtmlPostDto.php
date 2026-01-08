<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class HtmlPostDto
{
     #[Assert\Type('string')]
    public string $content;
}
