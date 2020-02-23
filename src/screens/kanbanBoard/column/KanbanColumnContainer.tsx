import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { useSelector } from "react-redux";

import { Column } from "../../../utils/Types";
import KanbanColumnView from "./KanbanColumnView";

interface Props {
    column: Column;
}

const KanbanColumnContainer: React.FC<Props> = ({ column }) => {
    const [addingTask, setAddingTask] = useState(false);
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

    return <KanbanColumnView column={column} addingTask={addingTask} setAddingTask={setAddingTask} keyboardVisible={keyboardVisible} />;
};

export default KanbanColumnContainer;
