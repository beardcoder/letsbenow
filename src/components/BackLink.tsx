import Link from 'next/link';
import React from 'react';

import styles from './BackLink.module.css';
import classNames from 'classnames';

interface Props {
    footer?: boolean;
}

const BackLink: React.FC<Props> = ({ footer }) => {
    return (
        <Link href='/#blog'>
            <a className={classNames(styles.backLink, footer ? styles.backLinkFooter : null)}>
                <span className={styles.backLinkText}>Zurück</span>
            </a>
        </Link>
    );
};

BackLink.defaultProps = {
    footer: false,
};

export default BackLink;
