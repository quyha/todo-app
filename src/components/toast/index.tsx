import React, { ReactNode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import RDelete from '../r-delete';
import './toast.scss';

interface ContentProps {
    content: ReactNode;
}

interface CloseableProps {
    /**
     * Whether show close button
     */
    closeable?: boolean;
    /**
     * Call when notice close
     */
    onClose?: () => void;
}

interface DurationProps {
    /**
     * After duration of time, notice will disappear (seconds), default 3000ms
     */
    duration?: number;
}

type ToastProps = ContentProps & DurationProps & CloseableProps;
type MessageProps = ContentProps & CloseableProps;

const Message: React.FC<MessageProps> = ({ content, closeable, onClose }) => {
    const close = (): void => {
        if (onClose) {
            onClose();
        }
    };
    
    return (
        <div className="toast-content">
            { content }
            { closeable && <RDelete onClick={ close } size="small" /> }
        </div>
    );
}

export default class Toast {
    static success(props: ToastProps): void {
        this.message('success', props);
    }

    static warning(props: ToastProps): void {
        this.message('warning', props);
    }

    static danger(props: ToastProps): void {
        this.message('danger', props);
    }

    static message(type: string, props: ToastProps): void {
        const { content, closeable, duration = 3000, onClose } = props;

        const className = [
            'toast',
            `is-${ type }`,
            closeable && 'is-closeable',
        ].filter(Boolean).join(' ');
        
        const container = document.createElement('div');
        container.setAttribute('class', className);

        if (!closeable) {
            container.setAttribute('style', `-webkit-animation-duration: ${ duration }ms`);
            container.setAttribute('style', `animation-duration: ${ duration }ms`);
        }

        if (document.body) {
            document.body.appendChild(container);
        }

        const doClose = (): void => {
            if (container && container.parentNode) {
                const { parentNode } = container;
                unmountComponentAtNode(container);
                parentNode.removeChild(container);
            }

            if (onClose) {
                onClose();
            }
        };

        render(<Message onClose={ doClose } closeable={ closeable } content={ content } />, container);

        if (container && container.parentNode && !closeable) {
            const { parentNode } = container;
            setTimeout(() => {
                unmountComponentAtNode(container);
                parentNode.removeChild(container);
            }, duration);
        }
    }
}
