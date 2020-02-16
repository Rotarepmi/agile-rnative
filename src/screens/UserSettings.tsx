import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, Image, ToastAndroid } from "react-native";

import firebase from "../utils/firebase";

const UserSettings: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleUpdate() {
        setLoading(true);
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName,
        })
            .then(() => {
                ToastAndroid.show("Updated data", ToastAndroid.SHORT)
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        setUserEmail(currentUser.email);
        setDisplayName(currentUser.displayName);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                {loading && <ActivityIndicator size="small" />}
                <Image source={require("../assets/user.png")} style={styles.image} />
                <TextInput
                    placeholder="User name"
                    autoCapitalize="words"
                    style={styles.textInput}
                    onChangeText={displayName => setDisplayName(displayName)}
                    value={displayName}
                    onSubmitEditing={handleUpdate}
                />
                <TextInput
                    placeholder="User email"
                    autoCapitalize="none"
                    editable={false}
                    style={styles.textInput}
                    onChangeText={email => setUserEmail(email)}
                    value={userEmail}
                />
            </View>

            <View style={styles.buttonWrapper1}>
                <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
            </View>
            {/* <View style={styles.buttonWrapper2}>
                <Button title="Save changes" onPress={handleUpdate} />
            </View> */}
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
        marginTop: 20,
        padding: 5,
        borderRadius: 5,
    },
    image: {
        height: 200,
        width: "100%",
        // borderColor: "gray",
        // borderWidth: 1,
        marginTop: 10,
        // borderRadius: 5,
        resizeMode: "contain",
    },
    buttonWrapper1: {
        marginTop: 10,
        marginBottom: 20,
        flex: 0,
    },
    buttonWrapper2: {
        marginTop: 10,
        marginBottom: 20,
        flex: 0,
    },
});

export default UserSettings;
