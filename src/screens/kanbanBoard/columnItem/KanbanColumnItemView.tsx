import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    data: {
        id: string;
        name: string;
    };
    setDetailsVisible: () => void;
}

const KanbanColumnItemView: React.FC<Props> = ({ data, setDetailsVisible }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={setDetailsVisible}>
            <Text>{data.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 10,
        padding: 20,
    },
});

export default KanbanColumnItemView;
