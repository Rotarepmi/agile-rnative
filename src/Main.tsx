import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { store } from "./redux/store";

import { KanbanBoard } from "./screens/kanbanBoard";
import MainScreen from "./screens/Main";
import { MenuBar, Loading, SignIn, SignUp } from "./components";
import { YellowBox } from "react-native";

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Loading,
            SignUp,
            SignIn,
            MainScreen
        },
        {
            initialRouteName: "Loading",
        },
    ),
);

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
                <AppContainer />
                {/* <KanbanBoard /> */}
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
