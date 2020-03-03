import React, { useCallback, useState, useEffect, useRef } from "react";
import { ToastAndroid } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";

import TaskDetailsView from "./TaskDetailsView";

import { db } from "../../../utils/firebase";
import { Column } from "../../../utils/Types";
import { tasksFetchSuccess } from "../../../redux/actions";

interface Props {
    data: {
        id: string;
        name: string;
        creator: string;
        assignedUser: string;
    };
    columnId: Column["id"];
    detailsVisible: boolean;
    setDetailsVisible: () => void;
}

const TaskDetailsContainer: React.FC<Props> = ({ data, detailsVisible, columnId, setDetailsVisible }) => {
    const activeProject = useSelector(state => state.projects.activeProject);
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();
    const taskRef = useRef(
        db
            .collection("projects")
            .doc(activeProject.id)
            .collection("tasks")
            .doc(data.id),
    );

    const [task, setTask] = useState();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [newColumnId, setNewColumnId] = useState<Column["id"]>(columnId);

    const getTask = useCallback(() => {
        taskRef.current
            .get()
            .then(qSnap => {
                const data = qSnap.data();

                setTask(data);
                setDescription(data.description);
                setTitle(data.name);
            })
            .catch(e => ToastAndroid.show(e.message, ToastAndroid.SHORT));
    }, []);

    useEffect(() => {
        if (detailsVisible) {
            getTask();
        }
    }, [detailsVisible, getTask]);

    function updateTasks() {
        db.collection("projects")
            .doc(activeProject.id)
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
            })
            .catch(e => console.log(e));
    }

    function handleSave() {
        const updateInTasks = taskRef.current
            .set(
                {
                    name: title,
                    description,
                    modifyDate: firebase.firestore.Timestamp.fromDate(new Date()),
                },
                { merge: true },
            )
            .then(() => console.log("Updated task in tasks"))
            .catch(e => console.log(e));

        const updateInTasksLists = db.runTransaction(transaction => {
            const colRef = db
                .collection("projects")
                .doc(activeProject.id)
                .collection("tasksLists")
                .doc(columnId);

            return transaction
                .get(colRef)
                .then(colDoc => {
                    if (!colDoc.exists) {
                        ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                    }

                    const tasks = colDoc.data().tasks;

                    const index = tasks.findIndex(t => t.id === data.id);

                    tasks.splice(index, 1, {
                        id: data.id,
                        name: title,
                    });

                    transaction.update(colRef, { tasks });
                })
                .catch(e => console.log(e));
        });

        Promise.all([updateInTasks, updateInTasksLists])
            .then(() => updateTasks())
            .catch(e => console.log(e));
    }

    function handleColumnChange(colId: Column["id"]) {
        setNewColumnId(colId);

        const oldColDocRef = db
            .collection("projects")
            .doc(activeProject.id)
            .collection("tasksLists")
            .doc(columnId);
        const newColDocRef = db
            .collection("projects")
            .doc(activeProject.id)
            .collection("tasksLists")
            .doc(colId);

        const remove = db.runTransaction(transaction =>
            transaction
                .get(oldColDocRef)
                .then(sfDoc => {
                    if (!sfDoc.exists) {
                        ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                    }

                    const newTasks = sfDoc.data().tasks.filter(t => t.id !== data.id);
                    transaction.update(oldColDocRef, { tasks: newTasks });
                })
                .catch(e => console.log(e)),
        );

        const write = db.runTransaction(transaction =>
            transaction
                .get(newColDocRef)
                .then(newColDoc => {
                    if (!newColDoc.exists) {
                        ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                    }

                    const newColDocDataRef = newColDoc.data();
                    let newTasks = newColDocDataRef.tasks;
                    if (newColDocDataRef.tasks) {
                        newTasks.unshift(data);
                    } else {
                        newTasks = [data];
                    }

                    transaction.update(newColDocRef, { tasks: newTasks });
                })
                .catch(e => console.log(e)),
        );

        Promise.all([remove, write])
            .then(() => updateTasks())
            .catch(e => console.log(e));
    }

    return (
        <TaskDetailsView
            task={task}
            description={description}
            setDescription={setDescription}
            title={title}
            columns={columns}
            columnId={columnId}
            newColumnId={newColumnId}
            handleColumnChange={handleColumnChange}
            setTitle={setTitle}
            detailsVisible={detailsVisible}
            handleSave={handleSave}
            setDetailsVisible={setDetailsVisible}
        />
    );
};

export default TaskDetailsContainer;
