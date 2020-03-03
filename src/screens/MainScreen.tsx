import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationSwitchProp, FlatList } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { theme } from "../utils/theme";
import firebase, { db } from "../utils/firebase";
import { TouchableHighlight } from "react-native-gesture-handler";
import { setActiveProject } from "../redux/actions";

interface Props {
    navigation: NavigationSwitchProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
    const activeProject = useSelector(state => state.projects.activeProject);
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(null);
    const [isMounted, setIsMounted] = useState(true);
    const [userProjects, setUserProjects] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        isMounted && setCurrentUser(currentUser);

        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = db
                .collection("users")
                .doc(currentUser.uid)
                .onSnapshot(qSnap => {
                    const projects = qSnap.data().projects;
                    projects.length && setUserProjects(projects);
                });

            return () => unsubscribe();
        }
    }, [currentUser]);

    const handleProjectPress = useCallback((id: string, name: string) => {
        db.collection("projects")
            .doc(id)
            .onSnapshot(qSnap => {
                const projData = qSnap.data();
                const { description, name, owner, users } = projData;

                dispatch(setActiveProject({ id, description, name, owner, users }));
            });

        navigation.navigate("ProjectStack", { projectId: id, routeName: name });
    }, []);

    return (
        <View style={styles.container}>
            {userProjects.length ? (
                <FlatList
                    contentContainerStyle={styles.listStyle}
                    data={userProjects}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            style={styles.touchableListItem}
                            underlayColor="lightgrey"
                            onPress={() => handleProjectPress(item.id, item.name)}
                        >
                            <Text style={styles.listItemText}>{item.name}</Text>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => item.id}
                />
            ) : (
                <View style={styles.centeredContent}>
                    <Text>Hi {currentUser && currentUser.displayName}!</Text>
                </View>
            )}

            <View style={styles.bottomButtons}>
                <TouchableHighlight style={{ ...styles.button, ...styles.userButton }} onPress={() => navigation.navigate("UserSettings")}>
                    <FontAwesome style={styles.buttonContent} name="user" size={25} />
                </TouchableHighlight>
                <TouchableHighlight style={{ ...styles.button, ...styles.projectButton }} onPress={() => navigation.navigate("CreateJoinProject")}>
                    <FontAwesome style={styles.buttonContent} name="plus" size={25} />
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
    },
    listStyle: {
        flex: 0,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: "10%",
        paddingRight: "10%",
        alignItems: "stretch",
        justifyContent: "center",
    },
    centeredContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    touchableListItem: {
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
    },
    listItemText: {
        textAlign: "center",
        padding: 10,
    },
    bottomButtons: {
        flex: 0,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        borderRadius: 300,
        width: 45,
        height: 45,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        shadowColor: "rgb(0,0,0)",
        shadowOffset: { width: 45, height: 45 },
        shadowOpacity: 0.23,
        elevation: 5,
        // boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    },
    buttonContent: {
        color: theme.white,
    },
    userButton: {
        backgroundColor: theme.secondary,
    },
    projectButton: {
        backgroundColor: theme.primary,
    },
    buttonWelcome: {
        marginTop: 20,
    },
});

export default MainScreen;
