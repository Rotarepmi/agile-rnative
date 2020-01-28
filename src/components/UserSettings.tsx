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

        user.updateProfile({
            displayName,
        })
            .then(() => {
                db.collection("users")
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        name: displayName,
                    })
                    .then(() => {
                        setLoading(false);
                        navigation.navigate("Dashboard");
                    })
                    .catch(e => {
                        setLoading(false);
                        setErrorMessage(e.message);
                    });
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Update user name</Text>
            {/* <Button title="Sign Up by Google" onPress={handleSignUpByGoogle} /> */}
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            {loading && <ActivityIndicator size="small" />}
            {/* <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} onChangeText={email => setEmail(email)} value={email} /> */}
            <TextInput
                placeholder="User name"
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
