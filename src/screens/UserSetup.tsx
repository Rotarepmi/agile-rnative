import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, Image } from "react-native";
import { NavigationSwitchProp } from "react-navigation";

import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const UserSetup: React.FC<Props> = ({ navigation }) => {
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
                        navigation.navigate("Welcome");
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
            <View style={styles.form}>
                <Text>Update user setting</Text>
                {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                {loading && <ActivityIndicator size="small" />}
                <Image source={require("../assets/user.png")} style={styles.image} />
                <TextInput
                    placeholder="User name"
                    autoCapitalize="none"
                    autoFocus
                    style={styles.textInput}
                    onChangeText={displayName => setDisplayName(displayName)}
                    value={displayName}
                />
            </View>

            <View style={styles.signupBtnWrapper}>
                <Button title="Continue" onPress={handleUpdate} />
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
        width: "80%"
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
        resizeMode: "contain"
    },
    signupBtnWrapper: {
        marginTop: 10,
        marginBottom: 20,
        flex: 0
    },
});

export default UserSetup;
