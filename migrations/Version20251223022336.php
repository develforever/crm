<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251223022336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cms_menu (id SERIAL NOT NULL, title VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_menu_item (id SERIAL NOT NULL, menu_id INT DEFAULT NULL, label VARCHAR(255) NOT NULL, url VARCHAR(255) DEFAULT NULL, target VARCHAR(255) DEFAULT NULL, position INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1432B53DCCD7E912 ON cms_menu_item (menu_id)');
        $this->addSql('ALTER TABLE cms_menu_item ADD CONSTRAINT FK_1432B53DCCD7E912 FOREIGN KEY (menu_id) REFERENCES cms_menu (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cms_menu_item DROP CONSTRAINT FK_1432B53DCCD7E912');
        $this->addSql('DROP TABLE cms_menu');
        $this->addSql('DROP TABLE cms_menu_item');
    }
}
