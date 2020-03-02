import React, { useState, useEffect } from "react";

import KanbanColumnItemView from "./KanbanColumnItemView";
import { TaskDetails } from "../taskDetails";
import { Column } from "../../../utils/Types";
import { useUsersRef } from "../../../utils/customHooks";

interface Props {
    task: {
        id: string;
        name: string;
        creator: string;
        assignedUser: string;
    };
    columnId: Column["id"];
}

const KanbanColumnItemContainer: React.FC<Props> = ({ task, columnId }) => {
    const { getUser } = useUsersRef();

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [user, setUser] = useState();

    function changeDetailsVisible() {
        setDetailsVisible(!detailsVisible);
    }

    useEffect(() => {
        task.assignedUser &&
            getUser(task.assignedUser)
                .then(userSnap => {
                    const user = userSnap.data();

                    setUser(user);
                })
                .catch(e => {
                    console.log(e);
                });
    }, []);

    return (
        <React.Fragment>
            <TaskDetails
                data={task}
                setDetailsVisible={() => setDetailsVisible(!detailsVisible)}
                detailsVisible={detailsVisible}
                columnId={columnId}
            />
            <KanbanColumnItemView
                taskName={task.name}
                assignedUserName={user ? user.name : ""}
                assignedUserAvatar="../assets/user.png"
                setDetailsVisible={changeDetailsVisible}
            />
        </React.Fragment>
    );
};
export default KanbanColumnItemContainer;
