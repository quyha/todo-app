import React from 'react';
import './checkbox.scss';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    /**
     * Label of checkbox
     */
    label?: string;
    /**
     * Id of checkbox input
     */
    id: string;
    /**
     * Class of checkbox outer
     */
    className?: string;
    circle?: boolean;
    disabled?: boolean;
    /**
     * One of 'small' | 'large'
     */
    sizes?: 'small' | 'large';
}

const Checkbox: React.FC<Props> = (props: Props) => {
    const {
        label,
        id,
        className,
        circle,
        disabled,
        sizes,
        ...restProps
    } = props;

    const cnOuter = [
        'checkbox-outer',
        sizes && `is-${ sizes }`,
        className && className,
    ].filter(Boolean).join(' ');

    const cn = [
        'checkbox',
        circle && 'is-circle',
    ].filter(Boolean).join(' ');
    
    return (
        <div className={ cnOuter }>
            <span className={ cn }>
                <input
                    type="checkbox"
                    className="checkbox-input"
                    id={ id }
                    disabled={ disabled }
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    { ...restProps }
                />
                <span className="checkbox-inner" />
                <svg
                    viewBox="0 0 24 24"
                    width="1.5em"
                    height="1.5em"
                    className="icon checkbox-check"
                >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M5 12l5 5l10 -10" />
                </svg>
            </span>
            { label && <label className="checkbox-label" htmlFor={ id }>{ label }</label> }
        </div>
    )
};

export default Checkbox;
