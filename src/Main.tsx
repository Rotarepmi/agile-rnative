import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import { KanbanBoard } from "./components/kanbanBoard";

const Main: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
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
