import React, { useEffect, useState, FunctionComponent } from "react";
import { NavigationActions, NavigationSwitchProp } from "react-navigation";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import firebase, { db } from "../utils/firebase";
import { setActiveProject } from "../redux/actions";
import { TouchableHighlight } from "react-native-gesture-handler";
import { DrawerContentComponentProps } from "react-navigation-drawer";

interface Props {
    navigation: NavigationSwitchProp;
}

const SideMenu: FunctionComponent<DrawerContentComponentProps>= ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = firebase.auth().currentUser;

    const [userProjects, setUserProjects] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        db.collection("users")
            .doc(currentUser.uid)
            .get()
            .then(qSnap => {
                const projects = qSnap.data().projects;
                projects && setUserProjects(projects);
            })
            .catch(e => console.log(e));
    }, []);

    function navigateToScreen(route) {
        // const navigateAction = NavigationActions.navigate({
        //     routeName: route,
        // });
        navigation.navigate(route);
    }

    function handleProjectPress(id: any) {
        dispatch(setActiveProject(id));
        navigation.navigate("KanbanBoard", { projectId: id });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.navSectionStyle}>
                        <TouchableHighlight onPress={() => navigateToScreen("MainScreen")}>
                            <Text style={styles.navItemStyle}>Home screen</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <Text style={styles.sectionHeadingStyle}>Projects</Text>
                    <View style={styles.navSectionStyle}>
                        {userProjects && userProjects.map(pr => (
                            <TouchableHighlight key={pr.id} onPress={() => handleProjectPress(pr.id)}>
                                <Text style={styles.navItemStyle}>{pr.name}</Text>
                            </TouchableHighlight>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <Text>|| {currentUser.displayName}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    },
    navItemStyle: {
        padding: 10,
    },
    navSectionStyle: {
        backgroundColor: "lightgrey",
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    footerContainer: {
        padding: 20,
        backgroundColor: "lightgrey",
    },
});

export default SideMenu;
