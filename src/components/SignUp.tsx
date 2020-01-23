import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

interface Props {
    navigation: any;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSignUp() {
        // TODO: Firebase stuff...
        console.log("handleSignUp");
    }

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Already have an account? Login" onPress={() => navigation.navigate("Login")} />
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

export default SignUp;