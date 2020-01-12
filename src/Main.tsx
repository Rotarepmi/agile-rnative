import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";

import { store } from "./redux/store";

import { KanbanBoard } from "./components/kanbanBoard";
import { MenuBar } from "./components/menuBar";

const Main: React.FC = () => {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <MenuBar />
                <KanbanBoard />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Main;
