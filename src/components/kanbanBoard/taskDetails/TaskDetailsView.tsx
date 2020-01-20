import React from "react";
import { Modal, View, Text, TouchableHighlight, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    task:
        | {
              id: string;
              title: string;
              description: string;
              createDate: string;
              modifyDate: string;
          }
        | undefined;
    description: string;
    title: string;
    detailsVisible: boolean;
    setDescription: (value: string) => void;
    setTitle: (value: string) => void;
    handleSave: () => void;
    setDetailsVisible: () => void;
}

const TaskDetailsView: React.FC<Props> = ({ task, detailsVisible, title, description, setDescription, setTitle, handleSave, setDetailsVisible }) => {
    if (!task) return null;
    return (
        <Modal animationType="slide" transparent={false} visible={detailsVisible}>
            <View>
                <View style={styles.header}>
                    <TouchableHighlight onPress={setDetailsVisible}>
                        <FontAwesome name="chevron-left" size={15} />
                    </TouchableHighlight>
                    <Text style={{ marginLeft: 5 }}>{title}</Text>
                </View>

                <View style={styles.contentWrapper}>
                    <TextInput style={styles.title} multiline value={title} onChangeText={(value: string) => setTitle(value)} />
                    <Text>Created: {`${new Date(task.createDate)}`}</Text>
                    <TextInput
                        style={styles.description}
                        multiline
                        value={description}
                        placeholder="Start writing your ideas here..."
                        onChangeText={(value: string) => setDescription(value)}
                    />

                    <TouchableHighlight onPress={handleSave}>
                        <Text>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        flexDirection: "row",
        alignItems: "center",
    },
    contentWrapper: {
        padding: 25,
    },
    title: {
        fontSize: 25,
        fontWeight: "700",
    },
    description: {
        paddingTop: 20,
        paddingBottom: 20
    },
});

export default TaskDetailsView;
