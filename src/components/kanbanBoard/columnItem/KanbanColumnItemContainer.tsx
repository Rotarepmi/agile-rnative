import React, { useState } from "react";
import KanbanColumnItemView from "./KanbanColumnItemView";
import { TaskDetails } from "../taskDetails";

interface Props {
    data: {
        id: string;
        title: string;
    };
}

const KanbanColumnItemContainer: React.FC<Props> = ({ data }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    function changeDetailsVisible() {
        setDetailsVisible(!detailsVisible);
    }

    return (
        <React.Fragment>
            <TaskDetails data={data} setDetailsVisible={() => setDetailsVisible(!detailsVisible)} detailsVisible={detailsVisible} />
            <KanbanColumnItemView data={data} setDetailsVisible={changeDetailsVisible} />
        </React.Fragment>
    );
};
export default KanbanColumnItemContainer;
