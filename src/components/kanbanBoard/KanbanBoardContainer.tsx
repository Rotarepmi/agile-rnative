import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { tasksFetchSuccess } from "../../redux/actions";
import { columns as data } from "../../utils/data";
import KanbanBoardView from "./KanbanBoardView";

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();

    const fetchColumns = useCallback(() => {
        dispatch(tasksFetchSuccess(data));
    }, []);

    useEffect(() => {
        fetchColumns();
    }, [fetchColumns]);

    return <KanbanBoardView columns={columns} />;
};

export default KanbanBoardContainer;
