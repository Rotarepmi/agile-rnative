import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import { columns as data } from "../../utils/data";
import KanbanBoardView from "./KanbanBoardView";

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);
    const dispatch = useDispatch();

    const fetchColumns = useCallback(() => {
        let cols = [];
        db.collection("columns")
            .get()
            .then(qSnap =>
                qSnap.forEach(snap => {
                    console.log("SNAP ID", snap.id);
                    cols.push({ id: snap.id, ...snap.data() });
                }),
            )
            .then(s => dispatch(tasksFetchSuccess(cols)));

            console.log("COLS", cols)
        // db.collection(`columns`).get().then(snap => {
        //     snap.forEach(childSnap => {
        //         const val = childSnap.data();
        //         const id = childSnap.id;

        //         console.log("KEY", id, "VAL", val)
        //     })

        // console.log(cols.tasks)
        // const colVals = cols.forEach()
        // console.log(vals)
        // dispatch(tasksFetchSuccess());
        // });
        // db.ref("/columns/-LyVVXlmHTHJPH41ud_p/tasks").push({
        //     title: "Item seven"
        // })
    }, []);

    useEffect(() => {
        fetchColumns();
    }, [fetchColumns]);

    return <KanbanBoardView columns={columns} />;
};

export default KanbanBoardContainer;
