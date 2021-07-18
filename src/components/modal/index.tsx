import { ReactNode } from 'react';
import Portal from '../portal';
import useLockBodyScroll from '../../hooks/use-lock-body-scroll';
import './modal.scss';

interface Props {
    /**
     * Content modal
     */
    children: ReactNode;
    open: boolean;
    hideModal: () => void;
    /**
     * Click outside content modal to close modal
     */
    hasClickOutside?: boolean;
    /**
     * Expand width content modal
     */
    large?: boolean;
    /**
     * Class modal
     */
    className?: string;
    /**
     * Don't show button close when value is false
     */
    hasCloseButton?: boolean;
}

interface Card {
    hasCard?: boolean;
    cardTitle?: string;
    cardFooter?: ReactNode;
}

const Modal: React.FC<Props & Card> = (props: Props & Card) => {
    const {
        children,
        open,
        hideModal,
        hasClickOutside,
        large,
        hasCard,
        className,
        hasCloseButton,
    } = props;

    const cnBackground = [
        'modal-background',
        !hasClickOutside && 'no-cursor',
    ].filter(Boolean).join(' ');

    const cnContent = [
        hasCard ? 'modal-card' : 'modal-content',
        large && 'is-large',
        className && className,
    ].filter(Boolean).join(' ');

    const doClickOutside: React.MouseEventHandler<HTMLDivElement> = () => {
        if (hasClickOutside) {
            hideModal();
        }
    }

    useLockBodyScroll();

    return !open ? null : (
        <Portal id="modal">
            <div className={ cnBackground } onClick={ doClickOutside } />
            <div className={ cnContent }>
                { children }
            </div>
            {
                (!hasCard && hasCloseButton) && (
                    <button
                        type="button"
                        className="modal-close"
                        aria-label="close"
                        onClick={ hideModal }
                    />
                )
            }
        </Portal>
    )
};

Modal.defaultProps = {
    hasClickOutside: false,
    hasCloseButton: true,
};

export default Modal;
