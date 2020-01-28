import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationSwitchProp } from "react-navigation";

import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        setCurrentUser(currentUser);

        db.collection("users")
            .doc(currentUser.uid)
            .get()
            .then(qSnap => console.log("QSNAP", qSnap.data()));
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hi {currentUser && currentUser.displayName}!</Text>
            <View style={styles.createBtnWrapper}>
                <Button title="Create new project" onPress={() => navigation.navigate("NewProject")} />
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
    createBtnWrapper: {
        marginTop: 20
    }
});

export default MainScreen;