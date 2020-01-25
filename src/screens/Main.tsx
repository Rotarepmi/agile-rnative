import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase, { db } from "../utils/firebase";

const Main: React.FC = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setCurrentUser(currentUser);
        db.collection("users").doc(currentUser.uid).get().then(qSnap => console.log(qSnap.data()))
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hi {currentUser && currentUser.displayName}!</Text>
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

export default Main;
