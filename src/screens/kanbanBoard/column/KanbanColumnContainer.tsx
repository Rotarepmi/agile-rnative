import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard } from "react-native";

import firebase, { db } from "../../../utils/firebase";
import { Column } from "../../../utils/Types";
import { updateTasksList, tasksFetchSuccess } from "../../../redux/actions";
import KanbanColumnView from "./KanbanColumnView";

interface Props {
    column: Column;
}

const KanbanColumnContainer: React.FC<Props> = ({ column }) => {
    const columns = useSelector(state => state.tasks.columns);
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const [addingTask, setAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    function _keyboardDidShow() {
        setKeyboardVisible(true);
    }

    function _keyboardDidHide() {
        setKeyboardVisible(false);
    }

    function handleAddTaskClick() {
        setAddingTask(true);
    }

    function handleNewTaskTitleChange(value: string) {
        setNewTaskTitle(value);
    }

    function handleSaveClick() {
        const updatedData = { ...column };
        const updatedColumns = { ...columns };
        const timestamp = Date.now();

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

    return (
        <KanbanColumnView
            data={column}
            addingTask={addingTask}
            newTaskTitle={newTaskTitle}
            keyboardVisible={keyboardVisible}
            handleNewTaskTitleChange={handleNewTaskTitleChange}
            handleAddTaskClick={handleAddTaskClick}
            handleSaveClick={handleSaveClick}
        />
    );
};

export default KanbanColumnContainer;
