export enum EPriority {
    LOW = 'Low',
    NORMAL = 'Normal',
    HIGH = 'High',
}

export enum EFormTaskAction {
    TASK_FORM_CHANGE_TITLE = 'task_form_change_title',
    TASK_FORM_CHANGE_DESCRIPTION = 'task_form_change_description',
    TASK_FORM_CHANGE_DUE_DATE = 'task_form_change_due_date',
    TASK_FORM_CHANGE_PRIORITY = 'task_form_change_priority',
    TASK_FORM_RESET = 'task_form_rest',
    TASK_FORM_CHANGE_IS_VALID = 'task_form_change_is_valid',
};

export interface ITask {
    id: string,
    title: string,
    description?: string,
    dueDate: Date,
    priority: EPriority,
    completed: boolean,
}

export interface ITaskForm extends ITask {
    validForm: boolean,
}

export type TTaskFormAction = 
    | { type: EFormTaskAction.TASK_FORM_CHANGE_TITLE, payload: ITask['title'] }
    | { type: EFormTaskAction.TASK_FORM_CHANGE_DESCRIPTION, payload: ITask['description'] }
    | { type: EFormTaskAction.TASK_FORM_CHANGE_DUE_DATE, payload: ITask['dueDate'] }
    | { type: EFormTaskAction.TASK_FORM_CHANGE_PRIORITY, payload: ITask['priority'] }
    | { type: EFormTaskAction.TASK_FORM_RESET, payload: ITaskForm }
    | { type: EFormTaskAction.TASK_FORM_CHANGE_IS_VALID, payload: ITaskForm['validForm'] };