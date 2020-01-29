import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableHighlight } from "react-native";
import { NavigationSwitchProp } from "react-navigation";
import { useDispatch } from "react-redux";

import firebase, { db } from "../utils/firebase";
import { setActiveProject } from "../redux/actions";

interface Props {
    navigation: NavigationSwitchProp;
}

const NewProject: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleUpdate() {
        setLoading(true);
        const user = firebase.auth().currentUser;
        const newProjectRef = db.collection("projects").doc();

        const createProject = newProjectRef
            .set({
                name: projectName,
                users: [
                    {
                        id: user.uid,
                        name: user.displayName,
                    },
                ],
                owner: user.uid,
            })
            .then(value => {
                console.log("Added to projects");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });

        const createBacklog = newProjectRef
            .collection("tasksLists")
            .doc()
            .set({
                name: "Backlog",
                place: 0,
            })
            .then(value => {
                console.log("Added Backlog");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });

        const createInProgress = newProjectRef
            .collection("tasksLists")
            .doc()
            .set({
                name: "In progress",
                place: 1,
            })
            .then(value => {
                console.log("Added In progress");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });

        const createTesting = newProjectRef
            .collection("tasksLists")
            .doc()
            .set({
                name: "Testing",
                place: 2,
            })
            .then(value => {
                console.log("Added Testing");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });

        const createDone = newProjectRef
            .collection("tasksLists")
            .doc()
            .set({
                name: "Done",
                place: 3,
            })
            .then(value => {
                console.log("Added Done");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });

        const updateUsers = db
            .collection("users")
            .doc(user.uid)
            .set(
                {
                    projects: firebase.firestore.FieldValue.arrayUnion({
                        id: newProjectRef.id,
                        name: projectName,
                    }),
                },
                { merge: true },
            )
            .then(() => {
                console.log("Added to users");
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });

        Promise.all([createProject, createBacklog, createInProgress, createTesting, createDone, updateUsers])
            .then(() => {
                setLoading(false);
                dispatch(setActiveProject(newProjectRef.id));
                navigation.navigate("KanbanBoard");
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Create new project</Text>
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            {loading && <ActivityIndicator size="small" />}
            <TextInput
                placeholder="Project name"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={value => setProjectName(value)}
                value={projectName}
            />
            <View style={styles.signupBtnWrapper}>
                <Button title="Save" onPress={handleUpdate} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
    },
    signupBtnWrapper: {
        marginTop: 10,
    },
    signinWrapper: {
        marginTop: 10,
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signinBtn: {
        marginLeft: 5,
    },
    signinBtnTxt: {
        color: "#0990ff",
    },
});

export default NewProject;
