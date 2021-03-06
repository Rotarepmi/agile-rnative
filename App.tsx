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
import { Initialize, SignIn, SignUp, UserSetup, NewProject, CreateJoinProject, UserSettings, ShareScreen, JoinScreen } from "./src/screens";
import SideMenu from "./src/components/SideMenu";


const ProjectStack = createDrawerNavigator({
    Tasks: {
        screen: KanbanBoard,
    },
    // Chat,
    Share: {
        screen: ShareScreen
    }
}, {
    contentComponent: SideMenu,
});

const MainStack = createStackNavigator({
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            title: "Agiler",
        },
    },
    CreateJoinProject: {
        screen: CreateJoinProject,
        navigationOptions: {
            title: "Project setup",
        },
    },
    CreateProject: {
        screen: NewProject,
        navigationOptions: {
            title: "Create new project",
        },
    },
    JoinProject: {
        screen: JoinScreen,
        navigationOptions: {
            title: "Join to project"
        }
    },
    UserSettings: {
        screen: UserSettings,
        navigationOptions: {
            title: "User settings",
        },
    },
    // ChangePassword,
    ProjectStack: {
        screen: ProjectStack,
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

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            MainStack,
            Initialize,
            SignUp,
            SignIn,
            UserSetup,
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
                            <AppContainer />
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
