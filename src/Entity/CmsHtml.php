<?php

namespace App\Entity;

use App\Repository\CmsHtmlRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CmsHtmlRepository::class)]
class CmsHtml extends CmsContent
{
    #[ORM\Column(type: 'text')]
    #[Groups(['cms_read', 'cms_view'])]
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
