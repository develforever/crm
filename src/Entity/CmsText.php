<?php

namespace App\Entity;

use App\Entity\Trait\UpdateFromDtoTrait;
use App\Repository\CmsTextRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CmsTextRepository::class)]
class CmsText extends CmsContent
{

    use UpdateFromDtoTrait;
    
    #[ORM\Column(type: 'text')]
    #[Groups(['cms_read', 'cms_view'])]
    private ?string $plainText = null;

    public function getPlainText()
    {
        return $this->plainText;
    }

    public function setPlainText($plainText)
    {
        $this->plainText = $plainText;
        return $this;
    }
}
