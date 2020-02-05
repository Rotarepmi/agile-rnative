import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from "react-native";

interface Props {
    newTaskTitle: string;
    handleNewTaskTitleChange: (value: string) => void;
    handleSaveClick: () => void;
}

const NewTaskView: React.FC<Props> = ({ newTaskTitle, handleNewTaskTitleChange, handleSaveClick }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={text => handleNewTaskTitleChange(text)} value={newTaskTitle} autoFocus />
            <TouchableOpacity style={styles.button} onPress={handleSaveClick}>
                <Text style={styles.buttonTxt}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 10,
        padding: 10,
        paddingBottom: 30,
        position: "relative",
    },
    input: {
        padding: 1,
    },
    button: {
        backgroundColor: "green",
        position: "absolute",
        bottom: 5,
        right: 5,
        paddingHorizontal: 10,
        paddingVertical: 1,
    },
    buttonTxt: {
        color: "#fff",
    },
});

export default NewTaskView;
