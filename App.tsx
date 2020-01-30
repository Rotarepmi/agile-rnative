import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { SafeAreaProvider, SafeAreaConsumer } from "react-native-safe-area-context";
import { createStackNavigator } from "react-navigation-stack";

import { store } from "./src/redux/store";

import MainScreen from "./src/screens/MainScreen";
import { KanbanBoard } from "./src/screens/kanbanBoard";
import { Loading, SignIn, SignUp, UserSettings, NewProject } from "./src/components";
import SideMenu from "./src/components/SideMenu";

const Dashboard = createDrawerNavigator(
    {
        SideMenu,
        MainScreen
    },
    {
        initialRouteName: "SideMenu",
        contentComponent: SideMenu,
        // defaultNavigationOptions: {
        //     title: "Dupa",
        // }
    },
);

const StackNav = createStackNavigator(
    {
        Dashboard,
        MainScreen,
        KanbanBoard,
        NewProject,
    },
    {
        initialRouteName: "Dashboard",
        defaultNavigationOptions: {
            title: "Agiler",
            headerBackTitleVisible: false,
            // headerBackImage: () =>  <FontAwesome name="bars" />
        }
    },
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            StackNav,
            Loading,
            SignUp,
            SignIn,
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
                        <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
                            <StatusBar backgroundColor="white" barStyle="dark-content" />
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
