import React, {useCallback, useState} from 'react';
import styles from "./TaskBoard.module.css";

interface TaskProps {
    task: Task,
}

const Task = ({task}: TaskProps) => {
    const [done, setDone] = useState(task.done);
    const [loading, setLoading] = useState(false);

    const toggleTask = useCallback((task: Task) => {
        setLoading(true);

        fetch(`/api/done?taskId=${task.id}&done=${!done}`, {
            method: 'PUT',
        })
            .then(() => setDone(prev => !prev))
            .catch(console.log)
            .finally(() => setLoading(false));
    }, [task, done]);


    return (
        <li className={styles.task}>
            <input type={"checkbox"} checked={done} onChange={() => toggleTask(task)} disabled={loading}/>
            {task.title}
        </li>
    )
}

export default Task;
