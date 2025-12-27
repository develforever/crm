<?php

namespace App\Entity;

use App\Repository\CmsPageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\Collection;
use Gedmo\Translatable\Translatable;

#[ORM\Entity(repositoryClass: CmsPageRepository::class)]
#[Gedmo\TranslationEntity(class: CmsPageTranslation::class)]
class CmsPage implements Translatable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Gedmo\Translatable]
    private ?string $title = null;

    #[Gedmo\Locale]
    private $locale;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Gedmo\Translatable]
    private ?string $content = null;

    #[ORM\Column]
    private ?bool $isActive = null;

    #[ORM\OneToMany(mappedBy: 'object', targetEntity: CmsPageTranslation::class, cascade: ['persist', 'remove'])]
    private $translations;

    public function __construct()
    {
        $this->translations = new \Doctrine\Common\Collections\ArrayCollection();
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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function setTranslatableLocale($locale): void
    {
        $this->locale = $locale;
    }

    public function getTranslatableLocale(): ?string
    {
        return $this->locale;
    }

    public function getTranslations(): Collection
    {
        return $this->translations;
    }

    public function addTranslation(CmsPageTranslation $t)
    {
        if (!$this->translations->contains($t)) {            
            $t->setObject($this);
            $this->translations[] = $t;
        }
    }
}
