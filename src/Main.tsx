import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";

import { store } from "./redux/store";

import { KanbanBoard } from "./screens/kanbanBoard";
import { MenuBar } from "./components/menuBar";
import { YellowBox } from "react-native";

const Main: React.FC = () => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = { ...console };
    console.warn = message => {
        if (message.indexOf("Setting a timer") <= -1) {
            _console.warn(message);
        }
    };

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
