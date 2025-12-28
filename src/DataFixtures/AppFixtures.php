<?php

namespace App\DataFixtures;

use App\Entity\CmsMenu;
use App\Entity\CmsMenuItem;
use App\Entity\CmsPage;
use App\Entity\CmsPageTranslation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {


        $secondPage = new CmsPage();
        $secondPage->setTitle('Second page');
        $secondPage->setSlug('second_page');
        $secondPage->setContent('This is second page of CRM. Change this one in CMS module.');
        $secondPage->setIsActive(true);
        $secondPage->setTranslatableLocale('en');
        $secondPage->addTranslation(new CmsPageTranslation('pl', 'title', 'Strona druga CRM'));
        $secondPage->addTranslation(new CmsPageTranslation('pl', 'content', 'To jest strona druga. Zmień ją na swoją własną w CMS.'));
        $manager->persist($secondPage);

         $manager->flush();

        $homePage = new CmsPage();
        $homePage->setTitle('Home page of CRM');
        $homePage->setSlug('index');
        $homePage->setContent('This is home page of CRM. Change this one. {{ cms_page_link(' . $secondPage->getId() . ', \'second\'|trans ) }}');
        $homePage->setIsActive(true);
        $homePage->setTranslatableLocale('en');
        $homePage->addTranslation(new CmsPageTranslation('pl', 'title', 'Strona główna Intranet CRM'));
        $homePage->addTranslation(new CmsPageTranslation('pl', 'content', 'To jest strona głowna. Zmień ją na swoją własną. {{ cms_page_link(' . $secondPage->getId() . ', \'second\'|trans ) }}'));
        $manager->persist($homePage);


        $main_menu = new CmsMenu();
        $main_menu->setTitle('Main menu');
        $main_menu->setName('main_menu');

        $menuItemCrm = new CmsMenuItem();
        $menuItemCrm->setUrl('/crm');
        $menuItemCrm->setLabel('CRM');
        $menuItemCrm->setPosition(0);

        $main_menu->addCmsMenuItem($menuItemCrm);

        $manager->persist($main_menu);


        $manager->flush();
    }
}
