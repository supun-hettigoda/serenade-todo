import React, {useCallback, useEffect, useState} from 'react';
import styles from './TaskBoard.module.css';
import Task from "./Task";
import TaskList from "./TaskList";

const TaskBoard = () => {
    const [response, setResponse] = useState<TasksResponse | null>(null);
    const [error, setError] = useState<any>(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        let aborted = false;

        fetch(`/api/tasks?filter=${encodeURIComponent(filter)}`, {signal})
            .then(r => r.json())
            .then(r => {
                if (!aborted)
                    setResponse(r);
            })
            .catch(e => {
                if (!aborted)
                    setError(e);
            })

        return () => {
            controller.abort()
            aborted = true
        }
    }, [filter]);

    return (
        <div>
            {error && (<div>Error: {error.message}</div>)}
            <div>
                <input type="text" placeholder="Filter" value={filter} className={styles.filter}
                       onChange={e => setFilter(e.target.value)}/>
            </div>
            {response && <TaskList tasks={response?.items}/>}
        </div>
    )
}

export default TaskBoard;
