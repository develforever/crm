<?php

namespace App\Entity;

use App\Repository\CmsContentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CmsContentRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'type', type: 'string')] 
#[ORM\DiscriminatorMap([
    'text' => CmsText::class, 
    'html' => CmsHtml::class, 
    'image' => CmsImage::class
])]
class CmsContent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $id = null;

    public function getId(): ?int
    {
        return $this->id;
    }
}
