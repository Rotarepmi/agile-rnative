import React, { useCallback, useState, useEffect } from "react";

import TaskDetailsView from "./TaskDetailsView";

import { db } from "../../../utils/firebase";

interface Props {
    data: {
        id: string;
        title: string;
    };
    detailsVisible: boolean;
    setDetailsVisible: () => void;
}

const TaskDetailsContainer: React.FC<Props> = ({ data, detailsVisible, setDetailsVisible }) => {
    const [task, setTask] = useState();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const getTask = useCallback((id: string) => {
        db.collection("tasks")
            .doc(id)
            .get()
            .then(qSnap => {
                setTask(qSnap.data());
                setDescription(qSnap.data().description);
                setTitle(qSnap.data().title);
            })
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        getTask(data.id);
    }, [getTask]);

    function handleSave() {
        db.collection("tasks")
            .doc(data.id)
            .update({
                description,
            })
            .catch(e => console.log(e));
    }

    return (
        <TaskDetailsView
            task={task}
            description={description}
            setDescription={setDescription}
            title={title}
            setTitle={setTitle}
            detailsVisible={detailsVisible}
            handleSave={handleSave}
            setDetailsVisible={setDetailsVisible}
        />
    );
};

export default TaskDetailsContainer;
