import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import QRCode from "react-native-qrcode";


const ShareScreen: React.FC = () => {
    const activeProject = useSelector(state => state.projects.activeProject);
    const dim = Dimensions.get("screen");

    if(dim) {
        return (
            <View style={styles.qrWrapper}>
                <Text style={styles.desc}>Let the teammate to scan above code:</Text>
                <QRCode value={activeProject} size={dim.width - 40} bgColor="rgb(0,0,0)" fgColor="white" />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    desc: {
        marginBottom: 20
    },
    qrWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ShareScreen;
