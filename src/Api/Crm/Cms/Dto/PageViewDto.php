<?php

namespace App\Api\Crm\Cms\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class PageViewDto
{
    #[Assert\Type('integer')]
    public int $pageId;
}
