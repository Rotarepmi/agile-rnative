import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";

interface Props {
    handleAddTaskClick: () => void;
}

const AddNewTask: React.FC<Props> = ({ handleAddTaskClick }) => {
    return (
        <TouchableHighlight onPress={handleAddTaskClick} style={styles.addButton}>
            <Text>+</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    addButton: {
        borderRadius: 100,
        borderStyle: "solid",
        borderWidth: 1,
        width: 45,
        height: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AddNewTask;
