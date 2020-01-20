import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard } from "react-native";

import { db } from "../../../utils/firebase";
import { Column } from "../../../utils/Types";
import { updateTasksList, tasksFetchSuccess } from "../../../redux/actions";
import KanbanColumnView from "./KanbanColumnView";

interface Props {
    data: Column;
}

const KanbanColumnContainer: React.FC<Props> = ({ data }) => {
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();

    const [column, setColumn] = useState(data);
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
        const updatedData = { ...data };
        const updatedColumns = { ...columns };
        const timestamp = Date.now();

        updatedData.tasks.push({
            id: `${timestamp}`,
            title: newTaskTitle,
        });

        updatedColumns[data.id] = updatedData;

        db.collection("tasks")
            .doc(`${timestamp}`)
            .set({ title: newTaskTitle, description: "", createDate: timestamp, modDate: timestamp })
            .catch(e => console.log(e));

        db.collection("columns")
            .doc(data.id)
            .update(updatedData)
            .then(() => dispatch(updateTasksList(updatedColumns)))
            .catch(e => console.log(e));

        setAddingTask(false);
        Keyboard.dismiss();
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
