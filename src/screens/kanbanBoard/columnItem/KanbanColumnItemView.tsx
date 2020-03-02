import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { theme } from "../../../utils/theme";

interface Props {
    taskName: string;
    assignedUserName: string;
    assignedUserAvatar: string;
    setDetailsVisible: () => void;
}

const KanbanColumnItemView: React.FC<Props> = ({ taskName, assignedUserName, assignedUserAvatar, setDetailsVisible }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={setDetailsVisible}>
            <View style={styles.taskName}>
                <Text>{taskName}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{assignedUserName}</Text>
                {!!assignedUserName && <Image source={require("../../../assets/user.png")} style={styles.image} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 10,
        padding: 10,
        paddingBottom: 5,
        borderRadius: 3,
    },
    image: {
        height: 17,
        width: 17,
        marginLeft: 5,
        resizeMode: "contain",
    },
    userInfo: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 7,
    },
    userName: {
        fontSize: 11,
        color: theme.shadowDark
    },
    taskName: {
        flex: 1,
    },
});

export default KanbanColumnItemView;
