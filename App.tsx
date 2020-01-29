import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { SafeAreaProvider, SafeAreaConsumer } from "react-native-safe-area-context";
// import { createStackNavigator } from "react-navigation-stack";

import { store } from "./src/redux/store";

import MainScreen from "./src/screens/MainScreen";
import { KanbanBoard } from "./src/screens/kanbanBoard";
import { Loading, SignIn, SignUp, UserSettings, NewProject } from "./src/components";
import SideMenu from "./src/components/SideMenu";

// const Stack = createStackNavigator(
//     {
//         NewProject
//     }
// )

const Dashboard = createDrawerNavigator(
    {
        MainScreen,
        KanbanBoard,
    },
    {
        initialRouteName: "MainScreen",
        contentComponent: SideMenu,
        // drawerWidth: Dimensions.get("window").width - 120,
    },
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Dashboard,
            Loading,
            SignUp,
            SignIn,
            NewProject,
            UserSettings,
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
            <SafeAreaProvider>
                <SafeAreaConsumer>
                    {insets => (
                        <View style={{ ...styles.container, paddingTop: insets.top, paddingBottom: insets.bottom }}>
                            {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
                            {/* <MenuBar /> */}
                            {/* <SideMenu /> */}
                            <AppContainer />
                            {/* <KanbanBoard /> */}
                        </View>
                    )}
                </SafeAreaConsumer>
            </SafeAreaProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
