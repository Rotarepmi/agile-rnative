import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableHighlight } from "react-native";
import { NavigationSwitchProp } from "react-navigation";

import firebase from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSignUp() {
        setLoading(true);

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                setLoading(false);
                navigation.navigate("UserSettings");
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Sign up</Text>
            {/* <Button title="Sign Up by Google" onPress={handleSignUpByGoogle} /> */}
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            {loading && <ActivityIndicator size="small" />}
            <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} onChangeText={email => setEmail(email)} value={email} />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <View style={styles.signupBtnWrapper}>
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
            <View style={styles.signinWrapper}>
                <Text>Already have an account?</Text>
                <TouchableHighlight style={styles.signinBtn} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.signinBtnTxt}>Sign in</Text>
                </TouchableHighlight>
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

export default SignUp;