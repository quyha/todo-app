import {
    FC,
    memo,
    useReducer,
    ChangeEventHandler,
    useRef,
    useMemo,
} from 'react';
import DatePicker from 'react-datepicker';
import Button from '../../components/button';
import Input, { FieldWrap } from '../../components/input';
import { genID } from '../../utils/string';
import DateInputCustom from '../date-input/custom';
import { taskFormReducer } from './form.reducer';
import { EFormTaskAction, EPriority, ITask } from './type';

interface IForm {
    initialTask: ITask,
    isUpdateForm?: boolean,
    onSubmit: (task: ITask, isUpdateForm: boolean) => void,
}

const TaskForm: FC<IForm> = (props) => {
    const { initialTask, onSubmit, isUpdateForm = false } = props;

    const initialState = useMemo(() => ({ ...initialTask, validForm: true }), [ initialTask ]);

    const [ state, dispatch ] = useReducer(taskFormReducer, initialState);
    const {
        id,
        title,
        description,
        dueDate,
        priority,
        completed,
        validForm,
    } = state;

    const focusTitleInputRef = useRef<boolean>(false);

    const isInValidTitle = useMemo(() => title.trim() === '', [ title ]);

    const isErrorInputTitle = useMemo(() => (
        (focusTitleInputRef.current && isInValidTitle) || (!validForm && isInValidTitle)
    ), [ isInValidTitle, validForm ]);

    const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        if (!focusTitleInputRef.current) {
            focusTitleInputRef.current = true;
        }
        dispatch({ type: EFormTaskAction.TASK_FORM_CHANGE_TITLE, payload: target.value });
    }

    const handleChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = ({ target }) => {
        dispatch({ type: EFormTaskAction.TASK_FORM_CHANGE_DESCRIPTION, payload: target.value });
    };
    
    const handleChangeDueDate = (date: Date) => {
        dispatch({ type: EFormTaskAction.TASK_FORM_CHANGE_DUE_DATE, payload: date });
    };

    const handleChangePriority: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        const value = target.value as EPriority;
        dispatch({ type: EFormTaskAction.TASK_FORM_CHANGE_PRIORITY, payload: value });
    };

    const handleSubmit = () => {
        if (isInValidTitle) {
            dispatch({ type: EFormTaskAction.TASK_FORM_CHANGE_IS_VALID, payload: false });
            return;
        }

        focusTitleInputRef.current = false;

        const submitTask = {
            id,
            title: title.trim(),
            description: description?.trim() ?? '',
            dueDate,
            priority,
            completed,
        };
        
        onSubmit(submitTask, isUpdateForm);

        if (!isUpdateForm) {
            const newTask = { ...initialState, id: genID() };
            dispatch({ type: EFormTaskAction.TASK_FORM_RESET, payload: newTask });
        }
    };
    
    return (
        <div className="task-form">
            <Input
                type="text"
                placeholder="Add new task..."
                appearance={ isErrorInputTitle ? 'danger' : undefined }
                value={ title }
                onChange={ handleChangeTitle }
                error={ isErrorInputTitle ? 'This field is required' : '' }
            />
            <Input
                type="textarea"
                label="Description"
                value={ description }
                onChange={ handleChangeDescription }
            />
            <div className="task-form-row">
                <FieldWrap label="Due Date">
                    <DatePicker
                        dateFormat="dd LLL yyyy"
                        selected={ dueDate }
                        onChange={ handleChangeDueDate }
                        minDate={ new Date() }
                        customInput={ <DateInputCustom /> }
                        wrapperClassName="date-due-custom"
                    />
                </FieldWrap>
                <FieldWrap
                    label="Priority"
                    iconRight= { (
                        <svg className="icon" viewBox="0 0 213.333 213.333">
                            <path d="M0 53.333L106.667 160 213.333 53.333z" />
                        </svg>
                    ) }
                >
                    <select
                        className="task-selection input"
                        value={ priority }
                        onChange={ handleChangePriority }
                    >
                        <option value={ EPriority.LOW }>Low</option>
                        <option value={ EPriority.NORMAL }>Normal</option>
                        <option value={ EPriority.HIGH }>High</option>
                    </select>
                </FieldWrap>
            </div>
            {
                !completed && (
                    <div className="task-form-submit">
                        <Button
                            appearance="success"
                            fullWidth
                            onClick={ handleSubmit }
                        >
                            { isUpdateForm ? 'Update' : 'Add' }
                        </Button>
                    </div>
                )
            }
        </div>
    )
};

export default memo<IForm>(TaskForm);
