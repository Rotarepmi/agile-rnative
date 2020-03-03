import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import QRCode from "react-native-qrcode";
import { theme } from "../utils/theme";

const dim = Dimensions.get("screen");

const ShareScreen: React.FC = () => {
    const activeProject = useSelector(state => state.projects.activeProject);

    if (dim) {
        return (
            <View style={styles.qrScreenWrapper}>
                <Text style={styles.desc}>Let the teammate to scan this code:</Text>
                <View style={styles.qrWrapper}>
                    <QRCode
                        value={`joinToProject:${activeProject}`}
                        size={dim.width*1.5}
                        bgColor="rgb(0,0,0)"
                        fgColor="white"
                        style={styles.qrCode}
                    />
                </View>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    desc: {
        marginBottom: 20,
    },
    qrScreenWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    qrWrapper: {
        position: "relative",
        flex: 0,
        backgroundColor: theme.white,
        width: dim.width - 40,
        height: dim.width - 40,
        overflow: "hidden"
    },
    qrCode: {
        flex: 0,
        position: "absolute",
        top: 50,
        left: 50
    }
});

export default ShareScreen;
