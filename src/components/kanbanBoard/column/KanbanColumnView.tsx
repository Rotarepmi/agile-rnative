import React from "react";
import { StyleSheet, Dimensions, View, Text, FlatList } from "react-native";

import { Column } from "../../../utils/Types";
import { KanbanColumnItem } from "../columnItem";
import { AddNewTask, ColumnHeader } from "./components";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

interface Props {
    data: Column;
    handleAddTaskClick: () => void;
}

const KanbanColumnView: React.FC<Props> = ({ data, handleAddTaskClick, children }) => {
    return (
        <View style={styles.container}>
            <ColumnHeader title={data.title} id={data.id} />

            <FlatList
                contentContainerStyle={styles.flatList}
                ListFooterComponent={() => <AddNewTask handleAddTaskClick={handleAddTaskClick}/>}
                data={data.tasks}
                renderItem={({ item }) => <KanbanColumnItem key={item.id} data={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
    },
    flatList: {
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
    },
});

export default KanbanColumnView;
