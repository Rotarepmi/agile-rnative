import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "../utils/firebase";
interface Props {
    navigation: any;
}

const Loading: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? "MainScreen" : "SignUp");
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Loading </Text>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Loading;
