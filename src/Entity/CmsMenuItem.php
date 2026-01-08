<?php

namespace App\Entity;

use App\Entity\Trait\UpdateFromDtoTrait;
use App\Repository\CmsMenuItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CmsMenuItemRepository::class)]
class CmsMenuItem
{
    use UpdateFromDtoTrait;
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $label = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $url = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $target = null;

    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $position = null;

    #[ORM\ManyToOne(inversedBy: 'cmsMenuItems')]
    private ?CmsMenu $menu = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getTarget(): ?string
    {
        return $this->target;
    }

    public function setTarget(?string $target): static
    {
        $this->target = $target;

        return $this;
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

    public function getMenu(): ?CmsMenu
    {
        return $this->menu;
    }

    public function setMenu(?CmsMenu $menu): static
    {
        $this->menu = $menu;

        return $this;
    }
}
