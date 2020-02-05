import React, { useState } from "react";

import KanbanColumnItemView from "./KanbanColumnItemView";
import { TaskDetails } from "../taskDetails";
import { Column } from "../../../utils/Types";

interface Props {
    column: {
        id: string;
        name: string;
    };
    columnId: Column["id"];
}

const KanbanColumnItemContainer: React.FC<Props> = ({ column, columnId }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    function changeDetailsVisible() {
        setDetailsVisible(!detailsVisible);
    }

    return (
        <React.Fragment>
            <TaskDetails
                data={column}
                setDetailsVisible={() => setDetailsVisible(!detailsVisible)}
                detailsVisible={detailsVisible}
                columnId={columnId}
            />
            <KanbanColumnItemView data={column} setDetailsVisible={changeDetailsVisible} />
        </React.Fragment>
    );
};
export default KanbanColumnItemContainer;
