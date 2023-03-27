import React from 'react';
import styles from "./TaskBoard.module.css";
import Task from "./Task";

interface TaskListProps {
    tasks: Task[],
}

const TaskList = ({tasks}: TaskListProps) => (
    <ul className={styles.tasks}>
        {tasks.map(task => <Task task={task} key={`task-${task.id}`}/>)}
    </ul>
)

export default TaskList;
