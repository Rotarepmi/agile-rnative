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
            .doc(activeProject)
            .collection("tasks")
            .doc(data.id),
    );

    const [task, setTask] = useState();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

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
            .then(() => console.log("Added task to tasks"))
            .catch(e => console.log(e));

        const updateInTasksLists = db
            .collection("projects")
            .doc(activeProject)
            .collection("tasksLists")
            .doc(columnId)
            .set(
                {
                    tasks: firebase.firestore.FieldValue.arrayUnion({
                        id: data.id,
                        name: title,
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

        Promise.all([updateInTasks, updateInTasksLists])
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
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    // db.runTransaction(function(transaction) {
    //     return transaction.get(sfDocRef).then(function(sfDoc) {
    //         if (!sfDoc.exists) {
    //             throw "Document does not exist!";
    //         }

    //         var newPopulation = sfDoc.data().population + 1;
    //         if (newPopulation <= 1000000) {
    //             transaction.update(sfDocRef, { population: newPopulation });
    //             return newPopulation;
    //         } else {
    //             return Promise.reject("Sorry! Population is too big.");
    //         }
    //     });
    // })

    function handleColumnChange(newColumnId: Column["id"]) {
        const oldColDocRef = db.collection("projects").doc(activeProject).collection("tasksLists").doc(columnId);
        const newColDocRef =  db.collection("projects").doc(activeProject).collection("tasksLists").doc(newColumnId);

        db.runTransaction(transaction =>
            transaction.get(newColDocRef).then(sfDoc => {
                if (!sfDoc.exists) {
                    ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                }

                const newTasks = sfDoc.data().tasks;
                newTasks.unshift(data);
                transaction.update(newColDocRef, { tasks: newTasks });
            }),
        );

        db.runTransaction(transaction =>
            transaction.get(oldColDocRef).then(sfDoc => {
                if (!sfDoc.exists) {
                    ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                }

                const newTasks = sfDoc.data().tasks.filter(t => t.id !== data.id);
                transaction.update(oldColDocRef, { tasks: newTasks });
            }),
        );
    }

    return (
        <TaskDetailsView
            task={task}
            description={description}
            setDescription={setDescription}
            title={title}
            columns={columns}
            columnId={columnId}
            handleColumnChange={handleColumnChange}
            setTitle={setTitle}
            detailsVisible={detailsVisible}
            handleSave={handleSave}
            setDetailsVisible={setDetailsVisible}
        />
    );
};

export default TaskDetailsContainer;
