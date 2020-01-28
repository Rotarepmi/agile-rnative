import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from "../utils/firebase";

interface Props {
    navigation: any;
}

const SignIn: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSignIn() {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate("Dashboard"))
            .catch(e => setErrorMessage(e.errorMessage));
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Email" onChangeText={email => setEmail(email)} value={email} />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button title="Login" onPress={handleSignIn} />
            <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate("SignUp")} />
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
});

export default SignIn;
