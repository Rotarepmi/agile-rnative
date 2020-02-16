import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "../utils/firebase";
import { NavigationSwitchProp } from "react-navigation";
interface Props {
    navigation: NavigationSwitchProp;
}

const Initialize: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            const route = user ? (user.displayName ? "MainScreen" : "UserSetup") : "SignIn";
            navigation.navigate(route);
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

export default Initialize;
