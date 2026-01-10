<?php

namespace App\Entity;

use App\Repository\CmsWidgetItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Attribute\SerializedName;

#[ORM\Entity(repositoryClass: CmsWidgetItemRepository::class)]
class CmsWidgetItem
{

    public const TYPE_TEXT = 'text';
    public const TYPE_IMAGE = 'image';
    public const TYPE_HTML = 'html';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $position = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'cmsWidgetItems')]
    private ?CmsWidget $widget = null;

    #[ORM\ManyToOne(targetEntity: CmsContent::class, cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?CmsContent $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getWidget(): ?CmsWidget
    {
        return $this->widget;
    }

    public function setWidget(?CmsWidget $widget): static
    {
        $this->widget = $widget;

        return $this;
    }

    public function getContent(): CmsContent
    {
        return $this->content;
    }

    public function setContent(CmsContent $content)
    {
        $this->content = $content;
        return $this;
    }
}
