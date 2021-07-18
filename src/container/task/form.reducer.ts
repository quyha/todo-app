import { EFormTaskAction, ITaskForm, TTaskFormAction } from "./type";

function taskFormReducer(state: ITaskForm, action: TTaskFormAction): ITaskForm {
    switch (action.type) {
        case EFormTaskAction.TASK_FORM_CHANGE_TITLE:
            return { ...state, title: action.payload };
        case EFormTaskAction.TASK_FORM_CHANGE_DESCRIPTION:
            return { ...state, description: action.payload };
        case EFormTaskAction.TASK_FORM_CHANGE_DUE_DATE:
            return { ...state, dueDate: action.payload };
        case EFormTaskAction.TASK_FORM_CHANGE_PRIORITY:
            return { ...state, priority: action.payload };
        case EFormTaskAction.TASK_FORM_CHANGE_IS_VALID:
            return { ...state, validForm: action.payload };
        case EFormTaskAction.TASK_FORM_RESET:
            return action.payload;
        default:
            return state;
    }
}

export { taskFormReducer };
