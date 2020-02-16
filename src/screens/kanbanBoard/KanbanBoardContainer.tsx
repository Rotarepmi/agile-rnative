import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import KanbanBoardView from "./KanbanBoardView";
import { NavigationSwitchProp, NavigationScreenComponent, NavigationSwitchScreenProps } from "react-navigation";

interface Props {
    navigation: NavigationSwitchProp;
}

const KanbanBoardContainer: React.FC = () => {
    const columns = useSelector(state => state.tasks.columns);
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const fetchProject = useCallback(projectId => {
        setLoading(true);

        // if (!!projectId) {
        //     db.collection("projects")
        //         .doc(projectId)
        //         .collection("tasksLists")
        //         .orderBy("place")
        //         .get()
        //         .then(querySnap => {
        //             let cols = [];

        //             querySnap.forEach(result => {
        //                 cols.push({ id: result.id, ...result.data() });
        //             });
        //             return cols;
        //         })
        //         .then(cols => {
        //             dispatch(tasksFetchSuccess(cols));
        //             setLoading(false);
        //         })
        //         .catch(e => console.log(e));
        // }

        if (!!projectId) {
            db.collection("projects")
                .doc(projectId)
                .collection("tasksLists")
                .orderBy("place")
                .onSnapshot(querySnapshot => {
                    let cols = [];

                    querySnapshot.forEach(result => {
                        cols.push({ id: result.id, ...result.data() });
                    });

                    dispatch(tasksFetchSuccess(cols));
                    setLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        fetchProject(activeProject);
    }, [activeProject]);

    return <KanbanBoardView columns={columns} loading={loading} />;
};

// KanbanBoardContainer.navigationOptions = ({ navigation }) => ({
//     title: "Woof",
// });

export default KanbanBoardContainer;
