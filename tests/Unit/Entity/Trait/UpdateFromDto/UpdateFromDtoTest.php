<?php

namespace App\Tests\Unit\Entity\Trait\UpdateFromDto;

use App\Api\Crm\Cms\Dto\PagePutDto;
use App\Entity\Trait\UpdateFromDtoTrait;
use PHPUnit\Framework\TestCase;

/**
 * Testowa klasa entity używająca traita
 */
class TestEntity
{
    use UpdateFromDtoTrait;

    private ?string $title = null;
    private ?string $slug = null;
    private ?string $content = null;
    private ?bool $isActive = null;
    private ?string $locale = null;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;
        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function setTranslatableLocale(string $locale): void
    {
        $this->locale = $locale;
    }

    public function getTranslatableLocale(): ?string
    {
        return $this->locale;
    }
}

class UpdateFromDtoTest extends TestCase
{

    public function testCheck(): void {

        $entity = new TestEntity();

        $dto = new PagePutDto();
        $dto->title = 'New Title';
        $dto->slug = 'new-slug';
        $dto->content = 'New content';
        $dto->isActive = false;
        $dto->locale = 'en';

        $entity->updateFromDto($dto);

        $this->assertEquals('New Title', $entity->getTitle());
        $this->assertEquals('new-slug', $entity->getSlug());
        $this->assertEquals('New content', $entity->getContent());
        $this->assertEquals(false, $entity->isActive());
        $this->assertEquals('en', $entity->getTranslatableLocale());


    }

}
