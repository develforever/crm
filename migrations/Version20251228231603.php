<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251228231603 extends AbstractMigration
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
        $this->addSql('CREATE TABLE cms_menu (id SERIAL NOT NULL, title VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_menu_item (id SERIAL NOT NULL, menu_id INT DEFAULT NULL, label VARCHAR(255) NOT NULL, url VARCHAR(255) DEFAULT NULL, target VARCHAR(255) DEFAULT NULL, position INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1432B53DCCD7E912 ON cms_menu_item (menu_id)');
        $this->addSql('CREATE TABLE cms_page (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, content TEXT DEFAULT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D39C1B5D989D9B62 ON cms_page (slug)');
        $this->addSql('COMMENT ON COLUMN cms_page.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN cms_page.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN cms_page.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE cms_page_translations (id SERIAL NOT NULL, object_id INT DEFAULT NULL, locale VARCHAR(8) NOT NULL, field VARCHAR(32) NOT NULL, content TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C8EBF10A232D562B ON cms_page_translations (object_id)');
        $this->addSql('CREATE INDEX cms_page_translation_idx ON cms_page_translations (locale, object_id, field)');
        $this->addSql('CREATE TABLE cms_text (id INT NOT NULL, plain_text TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_widget (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cms_widget_item (id SERIAL NOT NULL, widget_id INT DEFAULT NULL, content_id INT NOT NULL, position INT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1A0D9975FBE885E2 ON cms_widget_item (widget_id)');
        $this->addSql('CREATE INDEX IDX_1A0D997584A0A3ED ON cms_widget_item (content_id)');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE cms_html ADD CONSTRAINT FK_DFEF5598BF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_image ADD CONSTRAINT FK_EB4E9F73BF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_menu_item ADD CONSTRAINT FK_1432B53DCCD7E912 FOREIGN KEY (menu_id) REFERENCES cms_menu (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_page_translations ADD CONSTRAINT FK_C8EBF10A232D562B FOREIGN KEY (object_id) REFERENCES cms_page (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_text ADD CONSTRAINT FK_FC1D0ABABF396750 FOREIGN KEY (id) REFERENCES cms_content (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_widget_item ADD CONSTRAINT FK_1A0D9975FBE885E2 FOREIGN KEY (widget_id) REFERENCES cms_widget (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cms_widget_item ADD CONSTRAINT FK_1A0D997584A0A3ED FOREIGN KEY (content_id) REFERENCES cms_content (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cms_html DROP CONSTRAINT FK_DFEF5598BF396750');
        $this->addSql('ALTER TABLE cms_image DROP CONSTRAINT FK_EB4E9F73BF396750');
        $this->addSql('ALTER TABLE cms_menu_item DROP CONSTRAINT FK_1432B53DCCD7E912');
        $this->addSql('ALTER TABLE cms_page_translations DROP CONSTRAINT FK_C8EBF10A232D562B');
        $this->addSql('ALTER TABLE cms_text DROP CONSTRAINT FK_FC1D0ABABF396750');
        $this->addSql('ALTER TABLE cms_widget_item DROP CONSTRAINT FK_1A0D9975FBE885E2');
        $this->addSql('ALTER TABLE cms_widget_item DROP CONSTRAINT FK_1A0D997584A0A3ED');
        $this->addSql('DROP TABLE cms_content');
        $this->addSql('DROP TABLE cms_html');
        $this->addSql('DROP TABLE cms_image');
        $this->addSql('DROP TABLE cms_menu');
        $this->addSql('DROP TABLE cms_menu_item');
        $this->addSql('DROP TABLE cms_page');
        $this->addSql('DROP TABLE cms_page_translations');
        $this->addSql('DROP TABLE cms_text');
        $this->addSql('DROP TABLE cms_widget');
        $this->addSql('DROP TABLE cms_widget_item');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
