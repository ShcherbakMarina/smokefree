import React from 'react';
import {Link} from 'react-router-dom';
import {LockIcon} from '../../icons/LockIcon';

import './BlockedContent.css';

interface BlockedContentProps {
    text: string;
}

export function BlockedContent(props: BlockedContentProps) {
    return (
        <Link to='/paid-programs' className={'blocked-content'}>
            {/*<div className={'blocked-content'}>*/}
                <div className={'blocked-content__icon'}><LockIcon fill={'#ee6f37'}/></div>
                <p>{props.text}</p>
            {/*</div>*/}
        </Link>
    );
}
