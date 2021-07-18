import { createPortal } from 'react-dom';
import usePortal from '../../hooks/use-portal';

interface Props {
    id: string;
    children: React.ReactNode;
}

const Portal: React.FC<Props> = ({ id, children }) => {
    const target = usePortal(id);
    
    if (target) {
        return createPortal(
            children,
            target,
        );
    }
    return createPortal(
        children,
        document.createElement('div'),
    );
};

export default Portal;
