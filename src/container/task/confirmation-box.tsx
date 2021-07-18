import { FC } from 'react';
import Button, { ButtonGroup } from '../../components/button';

interface IProps {
    title: string,
    content: string,
    onCancel: () => void,
    onSubmit: () => void,
}

const TaskConfirmationBox: FC<IProps> = (props) => {
    const { title, content, onCancel, onSubmit } = props;
    
    return (
        <div className="task-confirmation">
            <h3>{ title }</h3>
            <p>{ content }</p>
            <ButtonGroup align="right">
                <Button appearance="white" size="small" onClick={ onCancel }>Cancel</Button>
                <Button appearance="danger" size="small" onClick={ onSubmit }>Remove</Button>
            </ButtonGroup>
        </div>
    )
};

export default TaskConfirmationBox;
