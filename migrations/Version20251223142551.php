<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251223142551 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cms_content (id SERIAL NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_html (id INT NOT NULL, content TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_image (id INT NOT NULL, path VARCHAR(255) NOT NULL, alt VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_text (id INT NOT NULL, plain_text TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE cms_html ADD CONSTRAINT FK_DFEF5598BF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_image ADD CONSTRAINT FK_EB4E9F73BF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_text ADD CONSTRAINT FK_FC1D0ABABF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_widget_item ADD content_id INT NOT NULL');
        $this->addSql('ALTER TABLE cms_widget_item ADD CONSTRAINT FK_1A0D997584A0A3ED FOREIGN KEY (content_id) REFERENCES cms_content (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1A0D997584A0A3ED ON cms_widget_item (content_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cms_widget_item DROP CONSTRAINT FK_1A0D997584A0A3ED');
        $this->addSql('ALTER TABLE cms_html DROP CONSTRAINT FK_DFEF5598BF396750');
        $this->addSql('ALTER TABLE cms_image DROP CONSTRAINT FK_EB4E9F73BF396750');
        $this->addSql('ALTER TABLE cms_text DROP CONSTRAINT FK_FC1D0ABABF396750');
        $this->addSql('DROP TABLE cms_content');
        $this->addSql('DROP TABLE cms_html');
        $this->addSql('DROP TABLE cms_image');
        $this->addSql('DROP TABLE cms_text');
        $this->addSql('DROP INDEX IDX_1A0D997584A0A3ED');
        $this->addSql('ALTER TABLE cms_widget_item DROP content_id');
    }
}
