import { ITask } from '../container/task/type';
import { getLocalStorage, setLocalStorage } from './storage';

const keyStorageTasks = 'tasks';

function storeTasks(tasks: ITask[]): void {
    setLocalStorage<ITask[]>(keyStorageTasks, tasks);
}

function getTasksFromStorage(): ITask[] {
    const tasks = getLocalStorage<ITask[]>(keyStorageTasks);
    return tasks ? tasks.map(({ dueDate, ...rest }) => ({ ...rest, dueDate: new Date(dueDate) })) : [];
}

function sortTasks(tasks: ITask[]): ITask[] {
    if (tasks.length === 0) {
        return [];
    }
    return tasks.sort((first, second) => (
        new Date(first.dueDate).getTime() - new Date(second.dueDate).getTime()
    ));
}

export { storeTasks, getTasksFromStorage, sortTasks };
