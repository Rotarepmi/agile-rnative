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
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSignUp() {
        setLoading(true);

        if (password1 === password2) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password1)
                .then(value => {
                    setLoading(false);
                    navigation.navigate("UserSettings");
                })
                .catch(e => {
                    setLoading(false);
                    setErrorMessage(e.message);
                });
        } else {
            setLoading(false);
            setErrorMessage("Passwords do not match");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
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
                    onChangeText={password => setPassword1(password)}
                    value={password1}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Repeat password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => setPassword2(password)}
                    value={password2}
                />
            </View>
            <View style={styles.btnsWrapper}>
                <View style={styles.signupBtnWrapper}>
                    <Button title="Sign Up" onPress={handleSignUp} />
                </View>
                <View style={styles.signinWrapper}>
                    <TouchableHighlight style={styles.signinBtn} onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.signinBtnTxt}>Already have an account? Sign in</Text>
                    </TouchableHighlight>
                </View>
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
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
        padding: 8,
        borderRadius: 5,
    },
    btnsWrapper: {
        // position: "absolute",
        // bottom: 0,
        marginBottom: 20,
    },
    signupBtnWrapper: {
        marginTop: 10,
    },
    signinWrapper: {
        marginTop: 20,
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
