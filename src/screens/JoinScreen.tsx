import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration, Dimensions, Alert, ToastAndroid, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { NavigationSwitchProp } from "react-navigation";
import { useDispatch } from "react-redux";

import { setActiveProject } from "../redux/actions";
import firebase, { db } from "../utils/firebase";

interface Props {
    navigation: NavigationSwitchProp;
}

const { width } = Dimensions.get("window");
const qrSize = width;

const JoinScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);

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

        if (data.startsWith("joinToProject:")) {
            const projKey = data.substring(14);
            const docRef = db.collection("projects").doc(projKey);

            docRef.get().then(doc => {
                if (doc.exists) {
                    const projData = doc.data();

                    Alert.alert("Join to project", `Do you want to join "${projData.name}" project?`, [
                        {
                            text: "Cancel",
                            onPress: () => setScanned(false),
                            style: "cancel",
                        },
                        { text: "Confirm", onPress: () => joinToProject(docRef, projData.name, docRef.id) },
                    ]);
                }
            });
        } else {
            Alert.alert("Join to project", "That data has no sense.");
        }
    }

    function joinToProject(projDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, projName: string, projId: string) {
        setLoading(true);

        const currentUser = firebase.auth().currentUser;
        const userDocRef = db.collection("users").doc(currentUser.uid);

        const joinToProj = projDocRef.set(
            {
                users: firebase.firestore.FieldValue.arrayUnion({
                    id: currentUser.uid,
                    name: currentUser.displayName,
                }),
            },
            { merge: true },
        );

        const joinToUsers = userDocRef.set(
            {
                projects: firebase.firestore.FieldValue.arrayUnion({
                    id: projId,
                    name: projName,
                }),
            },
            { merge: true },
        );

        Promise.all([joinToProj, joinToUsers])
            .then(() => {
                setLoading(false);
                dispatch(setActiveProject(projDocRef.id));
                navigation.navigate("ProjectStack", { projectId: projId, routeName: projName });
            })
            .catch(e => ToastAndroid.show(e.message, ToastAndroid.SHORT));
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, styles.qrElement]}>
                <Text style={styles.description}>Scan the code</Text>
                {/* <Image style={styles.qr} source={require("../assets/qr.png")} /> */}
                {
                    loading && <ActivityIndicator size="large" />
                }
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
