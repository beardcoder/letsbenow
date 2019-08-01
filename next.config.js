const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('next-typed-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withProgressBar = require('next-progressbar');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
    throw dotEnvResult.error;
}

const parsedVariables = dotEnvResult.parsed || {};
const dotEnvVariables = {};
// We always want to use the values from process.env, since dotenv
// has already resolved these correctly in case of overrides
for (const key of Object.keys(parsedVariables)) {
    dotEnvVariables[key] = process.env[key];
}

module.exports = withPlugins(
    [
        [
            optimizedImages,
            {
                /* config for next-optimized-images */
            },
        ],
        [
            withCSS,
            {
                tsCssModules: true,
                cssModules: true,
                cssLoaderOptions: {
                    namedExport: true,
                    camelCase: true,
                    importLoaders: 1,
                    localIdentName: '[local]___[hash:base64:5]',
                },
            },
        ],
        [
            withBundleAnalyzer,
            {
                analyzeServer: ['server', 'both'].includes(
                    process.env.BUNDLE_ANALYZE,
                ),
                analyzeBrowser: ['browser', 'both'].includes(
                    process.env.BUNDLE_ANALYZE,
                ),
                bundleAnalyzerConfig: {
                    server: {
                        analyzerMode: 'static',
                        reportFilename: './tmp/server.html',
                    },
                    browser: {
                        analyzerMode: 'static',
                        reportFilename: './tmp/bundles/client.html',
                    },
                },
            },
        ],
        [
            withProgressBar,
            {
                progressBar: {
                    profile: true,
                },
            },
        ],
    ],
    {
        env: {
            ...dotEnvResult,
        },
    },
);
