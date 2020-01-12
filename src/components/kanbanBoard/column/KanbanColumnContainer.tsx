import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Column } from "../../../utils/Types";
import { updateTasksList } from "../../../redux/actions";
import KanbanColumnView from "./KanbanColumnView";

interface Props {
    data: Column;
}

const KanbanColumnContainer: React.FC<Props> = ({ data }) => {
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();

    const [column, setColumn] = useState(data);

    function handleAddTaskClick() {
        const newColumn = { ...column };

        newColumn.tasks.push({
            title: "",
            temporary: true,
            id: `${Date.now()}`,
        });

        setColumn(newColumn);
    }

    // function submitNewTask() {
    //     const newColumns = [...columns];
    //     const ind = newColumns.findIndex(c => data.id === c.id);

    //     newColumns[ind].tasks.push({
    //         title: "",
    //         id: "new_task",
    //     });

    //     dispatch(updateTasksList(newColumns));
    // }

    return <KanbanColumnView data={column} handleAddTaskClick={handleAddTaskClick} />;
};

export default KanbanColumnContainer;
