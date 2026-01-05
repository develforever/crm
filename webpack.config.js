const path = require('path');
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

// === Konfiguracja dla FRONT (Intranet) ===
Encore
    .configureFilenames({
        js: Encore.isProduction()
            ? '[name].[contenthash:8].js'
            : '[name].js?[contenthash:8]',
        css: Encore.isProduction()
            ? '[name].[contenthash:8].css'
            : '[name].css?[contenthash:8]',
    })
    .setOutputPath('public/build/front/')
    .setPublicPath('/build/front')
    .addEntry('front-app', './assets/front/app.js')
    .enableSassLoader()
    .enablePostCssLoader()
    .disableSingleRuntimeChunk()
    .enableSingleRuntimeChunk()
    .addAliases({
        '@symfony/stimulus-bridge/controllers.json': path.resolve(__dirname, 'assets/front/controllers.json')
    })
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning();

const frontConfig = Encore.getWebpackConfig();
frontConfig.name = 'front';
frontConfig.watchOptions = {
    ignored: /node_modules|public/,
};

Encore.reset();

// === Konfiguracja dla CRM (React) ===
Encore
    .configureFilenames({
        js: Encore.isProduction()
            ? '[name].[contenthash:8].js'
            : '[name].js?[contenthash:8]',
        css: Encore.isProduction()
            ? '[name].[contenthash:8].css'
            : '[name].css?[contenthash:8]',
    })
    .setOutputPath('public/build/crm/')
    .setPublicPath('/build/crm')
    .addEntry('crm-app', './assets/crm/app.tsx')
    .enableReactPreset()
    .enableTypeScriptLoader()
    .enableSassLoader()
    .enablePostCssLoader()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning();

const crmConfig = Encore.getWebpackConfig();
crmConfig.name = 'crm';
crmConfig.watchOptions = {
    ignored: /node_modules|public/,
};

module.exports = [frontConfig, crmConfig];