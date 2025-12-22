const path = require('path'); 
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

// === Konfiguracja dla FRONT (Intranet) ===
Encore
    .setOutputPath('public/build/front/')
    .setPublicPath('/build/front')
    .addEntry('front-app', './assets/front/app.js')
    .enableSassLoader()
    .disableSingleRuntimeChunk()
    .enableSingleRuntimeChunk() 
    .addAliases({
        '@symfony/stimulus-bridge/controllers.json': path.resolve(__dirname, 'assets/front/controllers.json')
    })
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction());

const frontConfig = Encore.getWebpackConfig();
frontConfig.name = 'front';

Encore.reset();

// === Konfiguracja dla CRM (React) ===
Encore
    .setOutputPath('public/build/crm/')
    .setPublicPath('/build/crm')
    .addEntry('crm-app', './assets/crm/app.jsx')
    .enableReactPreset()
    .enableSassLoader()
    .enableSingleRuntimeChunk() 
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction());

const crmConfig = Encore.getWebpackConfig();
crmConfig.name = 'crm';

module.exports = [frontConfig, crmConfig];