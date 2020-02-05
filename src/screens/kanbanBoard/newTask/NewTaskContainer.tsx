import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Keyboard } from "react-native";

import firebase, { db } from "../../../utils/firebase";
import NewTaskView from "./NewTaskView";
import { updateTasksList, tasksFetchSuccess } from "../../../redux/actions";
import { Column } from "../../../utils/Types";

interface Props {
    column: Column;
    setAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
    keyboardVisible: boolean;
}

const NewTaskContainer: React.FC<Props> = ({ column, setAddingTask, keyboardVisible }) => {
    const columns = useSelector(state => state.tasks.columns);
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const [newTaskTitle, setNewTaskTitle] = useState("");

    function handleSaveClick() {
        const newTaskRef = db
            .collection("projects")
            .doc(activeProject)
            .collection("tasks")
            .doc();

        const addToTasks = newTaskRef
            .set({
                name: newTaskTitle,
                description: "",
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                modifyDate: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => console.log("Added task to tasks"))
            .catch(e => console.log(e));

        const addToProject = db
            .collection("projects")
            .doc(activeProject)
            .collection("tasksLists")
            .doc(column.id)
            .set(
                {
                    tasks: firebase.firestore.FieldValue.arrayUnion({
                        id: newTaskRef.id,
                        name: newTaskTitle,
                    }),
                },
                { merge: true },
            )
            .then(() => {
                console.log("Added task to project");
            })
            .catch(e => {
                console.log(e);
            });

        Promise.all([addToTasks, addToProject])
            .then(() => {
                db.collection("projects")
                    .doc(activeProject)
                    .collection("tasksLists")
                    .orderBy("place")
                    .get()
                    .then(querySnap => {
                        let cols = [];

                        querySnap.forEach(result => {
                            cols.push({ id: result.id, ...result.data() });
                        });
                        return cols;
                    })
                    .then(cols => {
                        dispatch(tasksFetchSuccess(cols));
                        setAddingTask(false);
                        keyboardVisible && Keyboard.dismiss();
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    function handleNewTaskTitleChange(value: string) {
        setNewTaskTitle(value);
    }

    return <NewTaskView newTaskTitle={newTaskTitle} handleNewTaskTitleChange={handleNewTaskTitleChange} handleSaveClick={handleSaveClick} />;
};

export default NewTaskContainer;
