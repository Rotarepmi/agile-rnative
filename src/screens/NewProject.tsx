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
    const [projectDesc, setProjectDesc] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSave() {
        if (!projectName.length) {
            setErrorMessage("Provide project name");
            return;
        }

        setLoading(true);
        const user = firebase.auth().currentUser;
        const newProjectRef = db.collection("projects").doc();

        const createProject = newProjectRef
            .set({
                name: projectName,
                description: projectDesc,
                users: [
                    {
                        id: user.uid,
                        name: user.displayName,
                    },
                ],
                owner: user.uid,
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
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });

        Promise.all([createProject, createBacklog, createInProgress, createTesting, createDone, updateUsers])
            .then(() => {
                setLoading(false);
                dispatch(setActiveProject(newProjectRef.id));
                navigation.navigate("Tasks", { projectId: newProjectRef.id, routeName: projectName });
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
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
                <TextInput
                    placeholder="Project description"
                    autoCapitalize="none"
                    style={styles.textInputDesc}
                    numberOfLines={8}
                    multiline
                    onChangeText={value => setProjectDesc(value)}
                    value={projectDesc}
                />
            </View>
            <View style={styles.btnWrapper}>
                <Button title="Create project" onPress={handleSave} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
    },
    textInput: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
        padding: 5,
        borderRadius: 5,
    },
    textInputDesc: {
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
        padding: 5,
        borderRadius: 5,
        textAlignVertical: "top"
    },
    btnWrapper: {
        marginTop: 10,
        marginBottom: 20,
    },
});

export default NewProject;
