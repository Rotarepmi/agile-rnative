import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import KanbanBoardView from "./KanbanBoardView";

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();

    const fetchColumns = useCallback(() => {
        db.collection("columns")
            .orderBy("place")
            .get()
            .then(qSnap => {
                let cols = [];

                qSnap.forEach(snap => {
                    cols.push({ id: snap.id, ...snap.data() });
                });
                return cols;
            })
            .then(cols => dispatch(tasksFetchSuccess(cols)));
    }, []);

    useEffect(() => {
        fetchColumns();
    }, [fetchColumns]);

    return <KanbanBoardView columns={columns} />;
};

export default KanbanBoardContainer;
