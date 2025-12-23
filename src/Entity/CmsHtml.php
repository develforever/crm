<?php

namespace App\Entity;

use App\Repository\CmsHtmlRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CmsHtmlRepository::class)]
class CmsHtml extends CmsContent
{
    #[ORM\Column(type: 'text')]
    private ?string $content = null;

    public function getContent()
    {
        return $this->content;
    }

    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }
}
