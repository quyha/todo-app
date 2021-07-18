import React, { ReactNode, useMemo, InputHTMLAttributes } from 'react';
import './input.scss';
import '../../styles/elements.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    type: string;
    className?: string;
    placeholder?: string;
    /**
     * One of 'primary' | 'info' | 'success' | 'warning' | 'danger'
     */
    appearance?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
    rounded?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    label?: string;
    error?: string;
    /**
     * If you want a horizontal form control
     */
    horizontal?: boolean;
    /**
     * One of small | medium | large
     */
    sizes?: string | number;
}

export const FieldWrap: React.FC<Partial<InputProps>> = (props) => {
    const {
        loading,
        iconLeft,
        iconRight,
        label,
        error,
        children,
        horizontal,
        value = '',
        sizes,
    } = props;

    const cnControl = [
        'control',
        loading && 'is-loading',
        iconLeft && 'has-icon-left',
        iconRight && 'has-icon-right',
    ].filter(Boolean).join(' ');

    const render = useMemo(() => (
        <div className={ `field${ sizes ? ` is-${ sizes }` : '' }` }>
            { label && <label className="label">{ label }</label> }
            <div className={ cnControl }>
                { children }
                { iconLeft && <span className="icon-ip is-left">{ iconLeft }</span> }
                { iconRight && <span className="icon-ip is-right">{ iconRight }</span> }
            </div>
            { error && <p className="help is-danger">{ error }</p> }
        </div>
    ), [ value, error, cnControl, children ]);

    const renderHorizontal = useMemo(() => (
        <div className={ `field is-horizontal${ sizes ? ` is-${ sizes }` : '' }` }>
            <div className="field-label">
                { label && <label className="label">{ label }</label> }
            </div>
            <div className="field-body">
                <div className="field">
                    <div className={ cnControl }>
                        { children }
                        { iconLeft && <span className="icon-ip is-left">{ iconLeft }</span> }
                        { iconRight && <span className="icon-ip is-right">{ iconRight }</span> }
                    </div>
                    { error && <p className="help is-danger">{ error }</p> }
                </div>
            </div>
        </div>
    ), [ value, error, cnControl, children ]);
    
    return horizontal ? renderHorizontal : render;
};

/**
 * Use React.memo in the production. Edit source file directly
 */
const Input: React.FC<InputProps> = (props: InputProps) => {
    const {
        type,
        className,
        placeholder = '',
        appearance,
        rounded,
        disabled = false,
        readonly = false,
        error,
        iconLeft,
        iconRight,
        loading,
        horizontal,
        label,
        ...restProps
    } = props;

    const cnInput = [
        'input',
        className,
        appearance && `is-${ appearance }`,
        rounded && 'is-rounded',
        error && 'is-danger',
    ].filter(Boolean).join(' ');
    
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FieldWrap { ...props }>
            {
                type !== 'textarea' ? (
                    <input
                        type={ type }
                        className={ cnInput }
                        placeholder={ placeholder }
                        disabled={ disabled }
                        readOnly={ readonly }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        { ...restProps }
                    />
                ) : (
                    <textarea
                        className={ `${ className !== undefined ? className : '' }${ error ? ' is-danger' : '' }` }
                        placeholder={ placeholder }
                        disabled={ disabled }
                        readOnly={ readonly }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        { ...restProps }
                    />
                )
            }
        </FieldWrap>
    )
}

export default React.memo<InputProps>(Input, (prevProps, nextProps) => (
    prevProps.value === nextProps.value
    && prevProps?.loading === nextProps?.loading
    && prevProps.error === nextProps?.error
));
