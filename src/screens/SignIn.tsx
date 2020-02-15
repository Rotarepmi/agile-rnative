import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from "react-native";
import firebase from "../utils/firebase";
import { TouchableHighlight } from "react-native-gesture-handler";
import { NavigationSwitchProp } from "react-navigation";

interface Props {
    navigation: NavigationSwitchProp;
}

const SignIn: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSignIn() {
        setLoading(true);

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false);
                navigation.navigate("Welcome");
            })
            .catch(e => {
                setLoading(false);
                setErrorMessage(e.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text>Sign in</Text>
                {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                {loading && <ActivityIndicator size="small" />}
                <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Email" onChangeText={email => setEmail(email)} value={email} />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => setPassword(password)}
                    value={password}
                />
            </View>
            <View style={styles.btnsWrapper}>
                <View style={styles.confirmBtnWrapper}>
                    <Button title="Sign in" onPress={handleSignIn} />
                </View>
                <View style={styles.signWrapper}>
                    <TouchableHighlight style={styles.signBtn} onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.signBtnTxt}>Don't have an account? Sign up</Text>
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
        justifyContent: "center",
        alignItems: "center",
        width: "80%"
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
    btnsWrapper: {
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
    },
    confirmBtnWrapper: {
        marginTop: 10,
    },
    signWrapper: {
        marginTop: 20,
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signBtn: {
        marginLeft: 5,
    },
    signBtnTxt: {
        color: "#0990ff",
    },
});

export default SignIn;
