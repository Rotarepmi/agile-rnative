import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string;
    id: string;
}

const ColumnHeader: React.FC<Props> = ({ title, id }) => {
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
    }
})

export default ColumnHeader;
