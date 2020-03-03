import { SocialProfileJsonLd } from 'next-seo';
import App from 'next/app';
import React from 'react';
import TagManager from 'react-gtm-module';
import 'sanitize.css';
import '../assets/css/global.css';

const tagManagerArgs = {
    gtmId: 'GTM-NT4CRWW',
};

export default class MyApp extends App {
    componentDidMount() {
        TagManager.initialize(tagManagerArgs);

        import('webfontloader').then(WebFont => {
            WebFont.load({
                google: {
                    families: ['Maven+Pro:400,700', 'Roboto+Slab:400,700&display=swap'],
                },
            });
        });
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Component {...pageProps} />
                <SocialProfileJsonLd
                    type='Person'
                    name='Markus Sommer'
                    url='https://www.creativeworkspace.de'
                    sameAs={[
                        'https://github.com/beardcoder',
                        'https://twitter.com/beardcoder',
                        'https://forge.typo3.org/users/41461',
                        'https://www.xing.com/profile/Markus_Sommer30',
                        'https://www.linkedin.com/in/markus-sommer-9040649b/',
                    ]}
                />
            </>
        );
    }
}