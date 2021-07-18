/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';
import './button.scss';

interface IButton {
    children: ReactNode;
    /**
        Buttons have type 'button' | 'submit' | 'reset'
    */
    type?: 'button' | 'submit' | 'reset';
    titleAnchor?: string;
    className?: string;
    /**
     *  Appearance is one of 'white' | 'light' | 'black' | 'dark' | 'primary'
     * | 'info' | 'success' | 'warning' | 'danger'
     */
    appearance?: 'white' | 'light' | 'black' | 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
    inverter?: boolean;
    /**
     * Size is one of 'small' | 'medium' | 'large'
     */
    size?: 'small' | 'medium' | 'large';
    outlined?: boolean;
    rounded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    selected?: boolean;
    fullWidth?: boolean;
    /**
     * Click handler (event) => void
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

type Ref = HTMLButtonElement;

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<Ref, IButton>((props, ref) => {
    const {
        children,
        type = 'button',
        onClick,
        appearance,
        inverter,
        size,
        outlined,
        rounded,
        loading,
        disabled,
        selected,
        fullWidth,
        className,
    } = props;

    const cn = [
        'button',
        appearance && `is-${ appearance }`,
        inverter && 'is-inverter',
        size && `is-${ size }`,
        outlined && 'is-outlined',
        rounded && 'is-rounded',
        loading && 'is-loading',
        disabled && 'is-disabled',
        selected && 'is-selected',
        className && className,
        fullWidth && 'is-fullwidth',
    ].filter(Boolean).join(' ');

    const doClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (onClick) {
            onClick(e);
        }
    }
    
    return (
        <button
            ref={ ref }
            type={ type }
            className={ cn }
            onClick={ doClick }
            disabled={ disabled }
        >
            { children }
        </button>
    )
})

Button.defaultProps = {
    type: 'button',
}

export default Button;

interface IButtonGroup {
    children: ReactNode;
    className?: string;
    hasAddons?: boolean;
    align?: 'left' | 'centered' | 'right';
}

export const ButtonGroup: React.FC<IButtonGroup> = (props) => {
    const {
        children,
        className,
        hasAddons,
        align,
    } = props;
    
    const cn = [
        'buttons',
        hasAddons && 'has-addons',
        align && `is-${ align }`,
        className,
    ].filter(Boolean).join(' ');
    
    return (
        <div className={ cn }>
            { children }
        </div>
    )
};
