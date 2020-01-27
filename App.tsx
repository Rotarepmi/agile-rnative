import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { YellowBox, Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";

import { store } from "./src/redux/store";

import MainScreen from "./src/screens/MainScreen";
import { KanbanBoard } from "./src/screens/kanbanBoard";
import { MenuBar, Loading, SignIn, SignUp } from "./src/components";
// import SideMenu from "./src/components/SideMenu";

const DrawerNavigator = createDrawerNavigator(
    {
        MainScreen,
        KanbanBoard
    },
    // {
    //     contentComponent: SideMenu,
    //     drawerWidth: Dimensions.get("window").width - 120,
    // },
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Loading,
            SignUp,
            SignIn,
            DrawerNavigator,
        },
        {
            initialRouteName: "Loading",
        },
    ),
);

const App: React.FC = () => {
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
                {/* <MenuBar /> */}
                {/* <SideMenu /> */}
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

export default App;
