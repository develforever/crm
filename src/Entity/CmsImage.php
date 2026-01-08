<?php

namespace App\Entity;

use App\Entity\Trait\UpdateFromDtoTrait;
use App\Repository\CmsImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CmsImageRepository::class)]
class CmsImage extends CmsContent
{
    use UpdateFromDtoTrait;
    
    #[ORM\Column(length: 255)]
    private ?string $path = null;

    #[ORM\Column(length: 255)]
    private ?string $alt = null;

    public function getPath()
    {
        return $this->path;
    }

    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    public function getAlt()
    {
        return $this->alt;
    }

    public function setAlt($alt)
    {
        $this->alt = $alt;
        return $this;
    }
}
