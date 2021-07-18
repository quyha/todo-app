import TaskForm from './container/task/form';
import Input from './components/input';
import './styles/app.scss';
import TaskItem from './container/task/item';
import { EPriority, ITask } from './container/task/type';
import { genID } from './utils/string';
import TaskEmptyList from './container/task/empty-list';
import TaskBulkAction from './container/task/bulk-action';
import useTasks from './container/task/use-tasks';

const initialNewTask: ITask = {
    id: genID(),
    title: '',
    description: '',
    dueDate: new Date(),
    priority: EPriority.NORMAL,
    completed: false,
}

function App() {
    const {
        search,
        searchTasks,
        selectedTaskIds,
        handleCreateTask,
        handleSearch,
        handleRemoveTask,
        handleUpdateForm,
        handleSelectTask,
        handleRemoveBulkTasks,
        handleCompleteTasks,
    } = useTasks();
    
    return (
        <div className="app">
            <section className="task-creation task-box">
                <h2 className="task-title">New Task</h2>
                <TaskForm initialTask={ initialNewTask } onSubmit={ handleCreateTask } />
            </section>
            <section className="task-list">
                <div className="task-box">
                    <h2 className="task-title">To Do List</h2>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={ search }
                        onChange={ handleSearch }
                    />
                    {
                        searchTasks.length === 0
                            ? <TaskEmptyList />
                            : (
                                searchTasks.map((task) => (
                                    <TaskItem
                                        key={ task.id }
                                        task={ task }
                                        onRemove={ handleRemoveTask }
                                        onUpdateForm={ handleUpdateForm }
                                        isSelected={ selectedTaskIds.includes(task.id)  }
                                        onSelected={ handleSelectTask }
                                    />
                                ))
                            )
                    }
                </div>
                { 
                    searchTasks.length > 0  && (
                        <TaskBulkAction
                            selectedTaskIds={ selectedTaskIds }
                            onRemove={ handleRemoveBulkTasks }
                            onComplete={ handleCompleteTasks }
                        />
                    )
                }
            </section>
        </div>
    );
}

export default App;
