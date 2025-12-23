<?php

namespace App\Entity;

use App\Repository\CmsTextRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CmsTextRepository::class)]
class CmsText extends CmsContent
{
    #[ORM\Column(type: 'text')]
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
