<?php

namespace App\Entity;

use App\Repository\CmsWidgetItemRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CmsWidgetItemRepository::class)]
class CmsWidgetItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $position = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'cmsWidgetItems')]
    private ?CmsWidget $widget = null;

    #[ORM\ManyToOne(targetEntity: CmsContent::class)]
    #[ORM\JoinColumn(nullable: false)]
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

    public function getCmsContent(): CmsContent
    {
        return $this->content;
    }

    public function setCmsContent(CmsContent $content)
    {
        $this->content = $content;
        return $this;
    }
}
