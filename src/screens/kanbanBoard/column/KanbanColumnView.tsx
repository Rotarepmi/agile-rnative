import React from "react";
import { StyleSheet, Dimensions, View, Text, FlatList, KeyboardAvoidingView, ScrollView } from "react-native";

import { Column } from "../../../utils/Types";
import { KanbanColumnItem } from "../columnItem";
import { KanbanNewColumnItem } from "../newColumnItem";
import { AddNewTask, ColumnHeader } from "./components";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

interface Props {
    data: Column;
    addingTask: boolean;
    newTaskTitle: string;
    keyboardVisible: boolean;
    handleNewTaskTitleChange: (value: string) => void;
    handleAddTaskClick: () => void;
    handleSaveClick: () => void;
}

const KanbanColumnView: React.FC<Props> = ({
    data,
    addingTask,
    newTaskTitle,
    keyboardVisible,
    handleNewTaskTitleChange,
    handleAddTaskClick,
    handleSaveClick,
    children,
}) => {
    return (
        <View style={styles.container}>
            <ColumnHeader name={data.name} id={data.id} />

            <KeyboardAvoidingView style={styles.flatListContainer}>
                {/* <FlatList
                    // contentContainerStyle={styles.flatList}
                    data={data.tasks}
                    renderItem={({ item }) => <KanbanColumnItem key={item.id} data={item} />}
                    // ListFooterComponent={() =>
                    //     addingTask ? <KanbanNewColumnItem newTaskTitle={newTaskTitle} handleNewTaskTitleChange={handleNewTaskTitleChange} /> : null
                    // }
                /> */}
                <ScrollView>
                    {data.tasks && data.tasks.map(item => (
                        <KanbanColumnItem key={item.id} data={item} columnId={data.id} />
                    ))}
                    {addingTask && (
                        <KanbanNewColumnItem
                            newTaskTitle={newTaskTitle}
                            handleNewTaskTitleChange={handleNewTaskTitleChange}
                            handleSaveClick={handleSaveClick}
                        />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
            {!keyboardVisible && <AddNewTask handleAddTaskClick={handleAddTaskClick} />}
            {/* <AddNewTask handleAddTaskClick={handleAddTaskClick} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
    },
    flatList: {
        flex: 1,
    },
    flatListContainer: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
    },
});

export default KanbanColumnView;
