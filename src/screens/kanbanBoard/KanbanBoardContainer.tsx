import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { tasksFetchSuccess } from "../../redux/actions";
import KanbanBoardView from "./KanbanBoardView";
import { NavigationSwitchProp, NavigationScreenComponent, NavigationSwitchScreenProps } from "react-navigation";

interface Props {
    navigation: NavigationSwitchProp;
}

const KanbanBoardContainer: React.FC<Props> = ({ navigation }) => {
    const { projectId } = navigation.state.params;
    const columns = useSelector(state => state.tasks.columns);
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    
    const fetchProject = useCallback(() => {
        if (!!activeProject || projectId) {
            console.log("PROJECTID", projectId);
            db.collection("projects")
                .doc(projectId)
                .collection("tasksLists")
                .orderBy("place")
                .get()
                .then(querySnap => {
                    let cols = [];

                    querySnap.forEach(result => {
                        cols.push({ id: result.id, ...result.data() });
                    });
                    console.log("COLSSSSSS", cols);
                    return cols;
                })
                .then(cols => {
                    console.log("DISPACTH", cols);
                    dispatch(tasksFetchSuccess(cols));
                })
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
    }, [projectId]);

    return <KanbanBoardView columns={columns} />;
};

// KanbanBoardContainer.navigationOptions = ({ navigation }) => ({
//     title: "Woof",
// });

export default KanbanBoardContainer;
