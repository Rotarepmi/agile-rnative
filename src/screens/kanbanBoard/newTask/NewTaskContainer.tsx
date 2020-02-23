import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ToastAndroid } from "react-native";

import firebase, { db } from "../../../utils/firebase";
import NewTaskView from "./NewTaskView";
import { Column } from "../../../utils/Types";

interface Props {
    column: Column;
    addingTask: boolean;
    setAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTaskContainer: React.FC<Props> = ({ column, addingTask, setAddingTask }) => {
    const activeProject = useSelector(state => state.projects.activeProject);
    const currentUser = firebase.auth().currentUser;
    const projectRef = useRef(db.collection("projects").doc(activeProject));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedUser, setAssignedUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const getProject = useCallback(() => {
        projectRef.current
            .get()
            .then(qSnap => {
                const data = qSnap.data();

                setUsers(data.users);
            })
            .catch(e => ToastAndroid.show(e.message, ToastAndroid.SHORT));
    }, []);

    useEffect(() => {
        getProject();
    }, []);

    const closeTaskAdding = useCallback(() => {
        setLoading(false);
        setTitle("");
        setDescription("");
        setAssignedUser("");
        setAddingTask(false);
    }, []);

    function handleSaveClick() {
        if (!title) return;

        setLoading(true);

        const newTaskRef = projectRef.current.collection("tasks").doc();

        newTaskRef
            .set({
                name: title,
                description,
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                modifyDate: firebase.firestore.Timestamp.fromDate(new Date()),
                creator: currentUser.uid,
                assignedUser,
            })
            .then(() => {
                db.collection("projects")
                    .doc(activeProject)
                    .collection("tasksLists")
                    .doc(column.id)
                    .set(
                        {
                            tasks: firebase.firestore.FieldValue.arrayUnion({
                                id: newTaskRef.id,
                                name: title,
                                creator: currentUser.uid,
                                assignedUser,
                            }),
                        },
                        { merge: true },
                    )
                    .then(() => {
                        closeTaskAdding();

                        ToastAndroid.show("Task added", ToastAndroid.SHORT);
                    })
                    .catch(e => {
                        closeTaskAdding();

                        ToastAndroid.show(e.message, ToastAndroid.SHORT);
                    });
            })
            .catch(e => {
                closeTaskAdding();

                ToastAndroid.show(e.message, ToastAndroid.SHORT);
            });
    };

    return (
        <NewTaskView
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            assignedUser={assignedUser}
            setAssignedUser={setAssignedUser}
            users={users}
            loading={loading}
            handleSaveClick={handleSaveClick}
            addingTask={addingTask}
            closeTaskAdding={closeTaskAdding}
        />
    );
};

export default NewTaskContainer;
