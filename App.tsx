import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { SafeAreaProvider, SafeAreaConsumer } from "react-native-safe-area-context";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "@expo/vector-icons/Ionicons";

import { store } from "./src/redux/store";

import MainScreen from "./src/screens/MainScreen";
import { KanbanBoard } from "./src/screens/kanbanBoard";
import { Initialize, SignIn, SignUp, UserSettings, NewProject } from "./src/components";
import SideMenu from "./src/components/SideMenu";

const MainScreenStackNavigator = createStackNavigator({
    MainScreen: {
        screen: MainScreen,
        navigationOptions: ({ navigation }) => {
            return {
                title: "Agiler",
                headerLeft: () => <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />,
                gestureEnabled: false,
            };
        },
    },
    NewProject: {
        screen: NewProject,
        navigationOptions: {
            title: "New Project",
            headerBackTitleVisible: false,
            gestureEnabled: false,
        },
    },
});

const KanbanStackNavigator = createStackNavigator({
    KanbanBoard: {
        screen: KanbanBoard,
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.params || navigation.state;
            
            return {
                title: routeName,
                headerLeft: () => <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />,
                gestureEnabled: false,
            };
        },
    },
});

const DashboardStackNavigator = createStackNavigator(
    {
        Welcome: {
            screen: MainScreenStackNavigator,
        },
        KanbanBoard: {
            screen: KanbanStackNavigator,
        },
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        },
    },
);

const AppDrawer = createDrawerNavigator(
    {
        Dashboard: {
            screen: DashboardStackNavigator,
        },
    },
    {
        contentComponent: SideMenu,
    },
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Dashboard: {
                screen: AppDrawer,
            },
            Initialize,
            SignUp,
            SignIn,
            UserSettings,
        },
        {
            initialRouteName: "Initialize",
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
