import { FC, memo } from 'react';
import Button, { ButtonGroup } from '../../components/button';
import Modal from '../../components/modal';
import useToggle from '../../hooks/use-toggle';
import TaskConfirmationBox from './confirmation-box';

interface ITaskBulkAction {
    selectedTaskIds: string[],
    onRemove: () => void,
    onComplete: () => void,
}

const TaskBulkAction: FC<ITaskBulkAction> = (props) => {
    const { selectedTaskIds, onRemove, onComplete } = props;
    
    const [ isShowConfirmation, toggleShowConfirmation ] = useToggle();
    
    const handleShowConfirmation = () => {
        toggleShowConfirmation();
    };

    const handleCancel = () => {
        toggleShowConfirmation();
    }

    const handleRemove = () => {
        onRemove();
        toggleShowConfirmation();
    };
    
    return (
        <>
            <div className="task-bulk-action">
                <p>Bulk action</p>
                <ButtonGroup>
                    <Button
                        appearance="success"
                        onClick={ onComplete }
                        disabled={ selectedTaskIds.length === 0 }
                    >
                        Done
                    </Button>
                    <Button
                        appearance="danger"
                        onClick={ handleShowConfirmation }
                        disabled={ selectedTaskIds.length === 0 }
                    >
                        Remove
                    </Button>
                </ButtonGroup>
            </div>
            {
                isShowConfirmation && (
                    <Modal
                        open={ isShowConfirmation }
                        hideModal={ toggleShowConfirmation }
                        hasCloseButton={ false }
                    >
                        <TaskConfirmationBox
                            title="Remove"
                            content="Are you sure you want to remove selected tasks?"
                            onCancel={ handleCancel }
                            onSubmit={ handleRemove }
                        />
                    </Modal>
                )
            }
        </>
    )
};

export default memo<ITaskBulkAction>(TaskBulkAction);
