import { FC } from 'react';

const TaskEmptyList: FC<{}> = () => (
    <div className="task-empty">
        <img width={ 50 } src="./empty.svg" alt="Empty list" />
        <h3>Empty List</h3>
    </div>
);

export default TaskEmptyList;
