<?php

namespace App\Entity;

use App\Repository\CmsMenuRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CmsMenuRepository::class)]
class CmsMenu
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, CmsMenuItem>
     */
    #[ORM\OneToMany(targetEntity: CmsMenuItem::class, mappedBy: 'menu')]
    private Collection $cmsMenuItems;

    public function __construct()
    {
        $this->cmsMenuItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, CmsMenuItem>
     */
    public function getCmsMenuItems(): Collection
    {
        return $this->cmsMenuItems;
    }

    public function addCmsMenuItem(CmsMenuItem $cmsMenuItem): static
    {
        if (!$this->cmsMenuItems->contains($cmsMenuItem)) {
            $this->cmsMenuItems->add($cmsMenuItem);
            $cmsMenuItem->setMenu($this);
        }

        return $this;
    }

    public function removeCmsMenuItem(CmsMenuItem $cmsMenuItem): static
    {
        if ($this->cmsMenuItems->removeElement($cmsMenuItem)) {
            // set the owning side to null (unless already changed)
            if ($cmsMenuItem->getMenu() === $this) {
                $cmsMenuItem->setMenu(null);
            }
        }

        return $this;
    }
}
