import React from "react";
import { StyleSheet, Dimensions, View, Platform, FlatList, KeyboardAvoidingView, ScrollView } from "react-native";

import { Column } from "../../../utils/Types";
import { KanbanColumnItem } from "../columnItem";
import { NewTask } from "../newTask";
import { AddNewTask, ColumnHeader } from "./components";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

interface Props {
    column: Column;
    addingTask: boolean;
    setAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const KanbanColumnView: React.FC<Props> = ({ column, addingTask, setAddingTask }) => {
    return (
        <View style={styles.container}>
            <ColumnHeader name={column.name} id={column.id} />

            <KeyboardAvoidingView style={styles.flatListContainer} behavior={Platform.OS === "ios" ? "position" : null}>
                <ScrollView>
                    <View style={styles.list}>
                        {column.tasks && column.tasks.map(item => <KanbanColumnItem key={item.id} column={item} columnId={column.id} />)}
                        <NewTask column={column} setAddingTask={setAddingTask} addingTask={addingTask} />
                        <AddNewTask handleAddTaskClick={setAddingTask} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* {!keyboardVisible && <AddNewTask handleAddTaskClick={setAddingTask} />} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    list: {
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight: 30,
    },
    flatListContainer: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 10,
    },
});

export default KanbanColumnView;
