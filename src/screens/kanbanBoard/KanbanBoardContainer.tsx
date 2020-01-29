import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import KanbanBoardView from "./KanbanBoardView";

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);

    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const fetchProject = useCallback(() => {
        if (!!activeProject) {
            db.collection("projects")
                .doc(activeProject)
                .collection("tasksLists")
                .orderBy("place")
                .get()
                .then(querySnap => {
                    let cols = [];

                    querySnap.forEach(result => {
                        cols.push({ id: result.id, ...result.data() });
                    })
                    return cols;
                })
                .then(cols => dispatch(tasksFetchSuccess(cols)))
                .catch(e => console.log(e));
        }

        // db.collection("columns")
        //     .orderBy("place")
        //     .get()
        //     .then(qSnap => {
        //         let cols = [];

        //         qSnap.forEach(snap => {
        //             cols.push({ id: snap.id, ...snap.data() });
        //         });
        //         return cols;
        //     })
        //     .then(cols => dispatch(tasksFetchSuccess(cols)));
    }, []);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return <KanbanBoardView columns={columns} />;
};

export default KanbanBoardContainer;
