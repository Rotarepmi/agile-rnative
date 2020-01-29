import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableHighlight } from "react-native";
import { NavigationSwitchProp } from "react-navigation";

import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const UserSettings: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleUpdate() {
        setLoading(true);
        const user = firebase.auth().currentUser;
        const newProjectRef = db.collection("projects").doc();

        newProjectRef
            .set({
                name: displayName,
                users: [
                    {
                        id: user.uid,
                        name: user.displayName,
                    },
                ],
                owner: user.uid
            })
            .then(value => {
                console.log("Added to projects");
            })
            .catch(e => {
                setErrorMessage(e.message);
            });
        
        newProjectRef.collection("tasksLists").doc().set({
            name: "Backlog",
            place: 0
        }).then(value => {
            console.log("Added Backlog");
        })
        .catch(e => {
            setErrorMessage(e.message);
        });

        newProjectRef.collection("tasksLists").doc().set({
            name: "In progress",
            place: 1
        }).then(value => {
            console.log("Added In progress");
        })
        .catch(e => {
            setErrorMessage(e.message);
        });

        newProjectRef.collection("tasksLists").doc().set({
            name: "Testing",
            place: 2
        }).then(value => {
            console.log("Added Testing");
        })
        .catch(e => {
            setErrorMessage(e.message);
        });

        newProjectRef.collection("tasksLists").doc().set({
            name: "Done",
            place: 3
        }).then(value => {
            console.log("Added Done");
        })
        .catch(e => {
            setErrorMessage(e.message);
        });

        db.collection("users")
            .doc(user.uid)
            .update({
                projects: [
                    {
                        id: newProjectRef.id,
                        name: displayName,
                    },
                ],
            })
            .then(() => {
                console.log("Added to users");
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Create new project</Text>
            {/* <Button title="Sign Up by Google" onPress={handleSignUpByGoogle} /> */}
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            {loading && <ActivityIndicator size="small" />}
            {/* <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} onChangeText={email => setEmail(email)} value={email} /> */}
            <TextInput
                placeholder="New project name"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={displayName => setDisplayName(displayName)}
                value={displayName}
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

export default UserSettings;