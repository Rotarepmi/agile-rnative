import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    name: string;
    id: string;
}

const ColumnHeader: React.FC<Props> = ({ name, id }) => {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
        zIndex: 10
        // color: "#000"
    }
})

export default ColumnHeader;
