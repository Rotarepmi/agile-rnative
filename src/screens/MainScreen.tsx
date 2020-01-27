import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: any;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setCurrentUser(currentUser);
        db.collection("users")
            .doc(currentUser.uid)
            .get()
            .then(qSnap => console.log(qSnap.data()));
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hi {currentUser && currentUser.displayName}!</Text>
            <Button onPress={() => navigation.navigate("DrawerNavigator")} title="Open Drawer" />
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

export default MainScreen;
