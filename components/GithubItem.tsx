import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import css from '~/components/GithubList.module.css';
import { GithubItem as IGithubItem } from '~/types';

import Button from './Button';
import Card from './Card';

type Props = {
    item: IGithubItem;
    gist: boolean;
    hidden: boolean;
    linkText: string;
};

const GithubItem: React.FunctionComponent<Props> = ({ gist, item, linkText, hidden }) => {
    const [visible, setVisible] = useState(false);
    const handleEnter = () => {
        setVisible(true);
    };

    return (
        <Waypoint onEnter={handleEnter}>
            <li
                className={[
                    css.githubItem,
                    hidden ? css.githubItemHidden : '',
                    visible ? css.isVisible : css.notVisible,
                ].join(' ')}
                aria-hidden={hidden}>
                <Card>
                    <div>
                        <h4>{gist ? item.description : item.full_name}</h4>
                        {gist && <p className={css.githubItemDescription}>{item.description}</p>}
                    </div>
                    <Button href={item.html_url} rel='noreferrer' target='_blank' secondary={gist}>
                        {linkText}
                        <img
                            src='/static/icons/external-link-duotone.svg'
                            width='15'
                            height='15'
                            alt='external link icon'
                            style={{
                                marginLeft: '5px',
                                marginBottom: '2px',
                            }}
                        />
                    </Button>
                </Card>
            </li>
        </Waypoint>
    );
};

export default GithubItem;
