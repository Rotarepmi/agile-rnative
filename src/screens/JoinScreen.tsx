import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration, Dimensions, Alert, ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { NavigationSwitchProp } from "react-navigation";
import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const { width } = Dimensions.get("window");
const qrSize = width;

const JoinScreen: React.FC<Props> = ({ navigation }) => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        async function init() {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasCameraPermission(status === "granted");
        }

        init();
    }, []);

    function handleBarCodeScanned({ type, data }) {
        Vibration.vibrate(500);
        setScanned(true);

        const docRef = db.collection("projects").doc(data);
        docRef.get().then(doc => {
            if (doc.exists) {
                const projData = doc.data();

                Alert.alert("Join to project", `Do you want to join "${projData.name}" project?`, [
                    {
                        text: "Cancel",
                        onPress: () => setScanned(false),
                        style: "cancel",
                    },
                    { text: "Confirm", onPress: () => joinToProject(docRef) },
                ]);
            }
        });
    }

    function joinToProject(projDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) {
        const currentUser = firebase.auth().currentUser;
        const userDocRef = db.collection("users").doc(currentUser.uid);

        let projName = "";

        db.runTransaction(transaction => {
            return transaction.get(projDocRef).then(projDoc => {
                if (!projDoc.exists) {
                    throw "Join failed - project not found";
                    // ToastAndroid.show("Join failed", ToastAndroid.SHORT);
                }

                projName = projDoc.data().name;

                const newProjUsers = projDoc.data().users;
                newProjUsers.push({
                    id: currentUser.uid,
                    name: currentUser.displayName
                });

                transaction.update(projDocRef, { users: newProjUsers });
            });
        });

        db.runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    throw "Join failed - user not found";
                }

                const newUserProjects = userDoc.data().projects;
                newUserProjects.push({
                    id: projDocRef.id,
                    name: projName
                });

                transaction.update(userDocRef, { projects: newUserProjects });
            });
        });
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, styles.qrElement]}>
                <Text style={styles.description}>Scan the code</Text>
                {/* <Image style={styles.qr} source={require("../assets/qr.png")} /> */}
                <Text onPress={() => (scanned ? setScanned(false) : navigation.goBack())} style={styles.cancel}>
                    {!scanned ? "Cancel" : "Try again"}
                </Text>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
    },
    qrElement: {
        justifyContent: "space-between",
    },
    qr: {
        marginTop: "20%",
        marginBottom: "20%",
        width: qrSize,
        height: qrSize,
    },
    description: {
        fontSize: width * 0.09,
        marginTop: "10%",
        textAlign: "center",
        color: "white",
    },
    cancel: {
        fontSize: width * 0.05,
        marginBottom: 20,
        textAlign: "center",
        color: "white",
    },
});

export default JoinScreen;
