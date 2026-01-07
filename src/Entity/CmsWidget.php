<?php

namespace App\Entity;

use App\Repository\CmsWidgetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CmsWidgetRepository::class)]
class CmsWidget
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cms_read', 'cms_view'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $title = null;

    /**
     * @var Collection<int, CmsWidgetItem>
     */
    #[ORM\OneToMany(targetEntity: CmsWidgetItem::class, mappedBy: 'widget')]
    #[Groups(['cms_view'])]
    private Collection $cmsWidgetItems;

    public function __construct()
    {
        $this->cmsWidgetItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection<int, CmsWidgetItem>
     */
    public function getCmsWidgetItems(): Collection
    {
        return $this->cmsWidgetItems;
    }

    public function addCmsWidgetItem(CmsWidgetItem $cmsWidgetItem): static
    {
        if (!$this->cmsWidgetItems->contains($cmsWidgetItem)) {
            $this->cmsWidgetItems->add($cmsWidgetItem);
            $cmsWidgetItem->setWidget($this);
        }

        return $this;
    }

    public function removeCmsWidgetItem(CmsWidgetItem $cmsWidgetItem): static
    {
        if ($this->cmsWidgetItems->removeElement($cmsWidgetItem)) {
            // set the owning side to null (unless already changed)
            if ($cmsWidgetItem->getWidget() === $this) {
                $cmsWidgetItem->setWidget(null);
            }
        }

        return $this;
    }
}
