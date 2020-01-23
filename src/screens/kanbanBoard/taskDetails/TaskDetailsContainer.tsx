import React, { useCallback, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TaskDetailsView from "./TaskDetailsView";

import { db } from "../../../utils/firebase";
import { Column } from "../../../utils/Types";

interface Props {
    data: {
        id: string;
        title: string;
    };
    columnId: Column["id"];
    detailsVisible: boolean;
    setDetailsVisible: () => void;
}

const TaskDetailsContainer: React.FC<Props> = ({ data, detailsVisible, columnId, setDetailsVisible }) => {
    const columns = useSelector(state => state.tasks.columns);

    const [task, setTask] = useState();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const getTask = useCallback((id: string) => {
        db.collection("tasks")
            .doc(id)
            .get()
            .then(qSnap => {
                const data = qSnap.data();

                setTask(data);
                setDescription(data.description);
                setTitle(data.title);
            })
            .catch(e => ToastAndroid.show("Error fetching task", ToastAndroid.SHORT));
    }, []);

    useEffect(() => {
        if (detailsVisible) {
            getTask(data.id);
        }
    }, [detailsVisible, getTask]);

    function handleSave() {
        db.collection("tasks")
            .doc(data.id)
            .update({
                title,
                description,
                modifyDate: Date.now(),
            })
            .then(() => ToastAndroid.show("Changes saved...", ToastAndroid.SHORT))
            .catch(e => ToastAndroid.show("Error saving description", ToastAndroid.SHORT));
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
        const sfDocRefOld = db.collection("columns").doc(columnId);
        const sfDocRefNew = db.collection("columns").doc(newColumnId);

        db.runTransaction(transaction =>
            transaction.get(sfDocRefNew).then(sfDoc => {
                if (!sfDoc.exists) {
                    ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                }

                const newTasks = sfDoc.data().tasks;
                newTasks.unshift(data);
                transaction.update(sfDocRefNew, { tasks: newTasks });
            }),
        );

        db.runTransaction(transaction =>
            transaction.get(sfDocRefOld).then(sfDoc => {
                if (!sfDoc.exists) {
                    ToastAndroid.show("Column does not exist..", ToastAndroid.SHORT);
                }

                const newTasks = sfDoc.data().tasks.filter(t => t.id !== data.id);
                transaction.update(sfDocRefOld, { tasks: newTasks });
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
