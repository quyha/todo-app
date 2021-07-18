import React from 'react';
import './delete.scss';

interface Props {
    onClick: () => void;
    title?: string;
    /**
     * One of 'small' | 'medium' | 'large'
     */
    size?: 'small' | 'medium' | 'large';
}

const RDelete: React.FC<Props> = (props: Props) => {
    const { onClick, title, size } = props;
    
    const cn = [
        'delete',
        size && `is-${ size }`,
    ].filter(Boolean).join(' ');
    
    return (
        <button
            type="button"
            className={ cn }
            aria-label="Delete"
            onClick={ onClick }
            title={ title }
        />
    )
};

RDelete.defaultProps = {
    title: 'Delete',
};

export default RDelete;
