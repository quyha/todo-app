import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { ITask } from './type';
import Toast from '../../components/toast';
import { getTasksFromStorage, sortTasks, storeTasks } from '../../services/task';

const initialTasks: ITask[] = getTasksFromStorage();

function useTasks() {
    const [ tasks, setTasks ] = useState<ITask[]>(initialTasks);
    const [ search, setSearch ] = useState<string>('');
    const [ selectedTaskIds, setSelectedTaskIds ] = useState<string[]>([]);

    const searchTasks = useMemo(() => (
        tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    ), [ search, tasks ]);
    
    const handleCreateTask = useCallback((task: ITask) => {
        setTasks((prevTasks) => {
            const newTasks = [ ...prevTasks, ...[ task ] ]; 
            const sortedTasks = sortTasks(newTasks);
            storeTasks(sortedTasks);
            return sortedTasks;
        });
        
        Toast.success({ content: 'Created successfully!' });
    }, []);

    const handleUpdateForm = (updatedTask: ITask) => {
        const updatedTasks = tasks.map((oldTask) => ( oldTask.id === updatedTask.id ? updatedTask : oldTask ));
        const sortedTasks = sortTasks(updatedTasks);
        
        setTasks(sortedTasks);
        storeTasks(sortedTasks);
        
        Toast.success({ content: 'Updated successfully!' });
    };

    const handleRemoveTask = (id: string) => {
        const restTasks = tasks.filter((task) => id !== task.id);
        
        setTasks(restTasks);
        storeTasks(restTasks);
        
        Toast.success({ content: 'Deleted successfully!' });
    };

    const handleSelectTask = (id: string, isSelected: boolean) => {
        const newSelectedIds = isSelected
            ? [ ...selectedTaskIds, ...[ id ] ]
            : selectedTaskIds.filter((taskId) => taskId !== id);
        
        setSelectedTaskIds(newSelectedIds);
    };

    const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { value } = target;
        setSearch(value);
    };

    const handleRemoveBulkTasks = (): void => {
        const restTasks = tasks.filter((task) => !selectedTaskIds.includes(task.id));
        
        setTasks(restTasks);
        storeTasks(restTasks);
        setSelectedTaskIds([]);
        
        Toast.success({ content: 'Removed successfully!' });
    };

    const handleCompleteTasks = (): void => {
        const newTasks = tasks.map((task) => {
            if (selectedTaskIds.includes(task.id)) {
                return { ...task, completed: true };
            }
            return task;
        });
        
        setTasks(newTasks);
        storeTasks(newTasks);
        setSelectedTaskIds([]);

        Toast.success({ content: 'Completed successfully!' });
    };

    return {
        tasks,
        search,
        searchTasks,
        selectedTaskIds,
        handleCreateTask,
        handleUpdateForm,
        handleRemoveTask,
        handleSelectTask,
        handleSearch,
        handleRemoveBulkTasks,
        handleCompleteTasks,
    }
}

export default useTasks;
