import { ChangeEventHandler, FC, memo } from 'react';
import Button, { ButtonGroup } from '../../components/button';
import Checkbox from '../../components/checkbox';
import Modal from '../../components/modal';
import useToggle from '../../hooks/use-toggle';
import TaskConfirmationBox from './confirmation-box';
import { ITask } from './type';
import TaskForm from './form';

interface ITaskItem {
    task: ITask,
    onRemove: (id: string) => void,
    onUpdateForm : (task: ITask) => void,
    isSelected: boolean,
    onSelected: (id: string, isSelected: boolean) => void,
}

const TaskItem: FC<ITaskItem> = (props) => {
    const {
        task,
        onRemove,
        onUpdateForm,
        isSelected,
        onSelected,
    } = props;
    
    const {
        id,
        title,
        completed,
    } = task;

    const [ isShowModal, toggleModal ] = useToggle(false);
    const [ isShowDetail, toggleDetail ] = useToggle(false);

    const handleShowConfirmation = () => {
        toggleModal();
    };

    const handleCancel = () => {
        toggleModal();
    };

    const handleRemove = () => {
        onRemove(id);
        toggleModal();
    };

    const handleShowDetail = () => {
        toggleDetail();
    };

    const handleSelect: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        onSelected(id, target.checked);
    };

    const classnames = [
        'task-item',
        isSelected && 'is-selected',
        completed && 'is-completed',
    ].filter(Boolean).join(' ');

    return (
        <div className="task-item-wrapper">
            <div className={ classnames }>
                <Checkbox
                    id={ id }
                    label={ title }
                    checked={ isSelected }
                    onChange={ handleSelect }
                />
                <div className="task-item-action">
                    <ButtonGroup>
                        <Button
                            appearance="info"
                            size="small"
                            onClick={ handleShowDetail }
                        >
                            Detail
                        </Button>
                        <Button
                            appearance="danger"
                            size="small"
                            onClick={ handleShowConfirmation }
                        >
                            Remove
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            {
                isShowDetail && (
                    <div className="task-item-detail">
                        <TaskForm
                            initialTask={ task }
                            isUpdateForm
                            onSubmit={ onUpdateForm }
                        />
                    </div>
                )
            }
            {
                isShowModal && (
                    <Modal
                        open={ isShowModal }
                        hideModal={ toggleModal }
                        hasCloseButton={ false }
                    >
                        <TaskConfirmationBox
                            title="Remove"
                            content="Are you sure you want to remove this task?"
                            onCancel={ handleCancel }
                            onSubmit={ handleRemove }
                        />
                    </Modal>
                )
            }
        </div>
    )
};

export default memo<ITaskItem>(TaskItem);
