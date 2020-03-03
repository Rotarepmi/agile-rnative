import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import KanbanBoardView from "./KanbanBoardView";

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log(activeProject)
        if (activeProject) {
            const unsubscribe = db
                .collection("projects")
                .doc(activeProject.id)
                .collection("tasksLists")
                .orderBy("place")
                .onSnapshot(querySnapshot => {
                    // var source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";

                    let cols = [];

                    querySnapshot.forEach(result => {
                        cols.push({ id: result.id, ...result.data() });
                    });

                    dispatch(tasksFetchSuccess(cols));
                    setLoading(false);
                });

            return () => unsubscribe();
        }
    }, [activeProject]);

    return <KanbanBoardView columns={columns} loading={loading} />;
};

export default KanbanBoardContainer;
