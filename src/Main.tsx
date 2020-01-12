import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import { KanbanBoard } from "./components/kanbanBoard";
import { MenuBar } from "./components/menuBar";

const Main: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <MenuBar />
            <KanbanBoard />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Main;
