import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";

interface Props {
    handleAddTaskClick: () => void;
}

const AddNewTask: React.FC<Props> = ({ handleAddTaskClick }) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={handleAddTaskClick} style={styles.addButton}>
                <Text>+</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
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
