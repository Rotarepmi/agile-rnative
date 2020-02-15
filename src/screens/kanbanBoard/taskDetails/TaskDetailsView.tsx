import React from "react";
import { Modal, View, Text, TouchableHighlight, TextInput, StyleSheet, Picker } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Column } from "../../../utils/Types";
import { firestore } from "firebase";

interface Props {
    task:
        | {
              id: string;
              name: string;
              description: string;
              creationDate: firestore.Timestamp;
              modifyDate: firestore.Timestamp;
          }
        | undefined;
    description: string;
    title: string;
    detailsVisible: boolean;
    columns: Column[];
    columnId: Column["id"];
    newColumnId: Column["id"];
    handleColumnChange: (value: Column["id"]) => void;
    setDescription: (value: string) => void;
    setTitle: (value: string) => void;
    handleSave: () => void;
    setDetailsVisible: () => void;
}

const TaskDetailsView: React.FC<Props> = ({
    task,
    detailsVisible,
    title,
    description,
    columns,
    columnId,
    newColumnId,
    handleColumnChange,
    setDescription,
    setTitle,
    handleSave,
    setDetailsVisible,
}) => {

    if (!task) return null;
    
    return (
        <Modal animationType="fade" transparent={false} visible={detailsVisible}>
            <View>
                <View style={styles.header}>
                    <TouchableHighlight style={styles.closeBtn} onPress={setDetailsVisible}>
                        <View style={styles.closeBtn}>
                            <FontAwesome name="chevron-left" size={15} />
                            <Text style={styles.closeBtnTxt} numberOfLines={1} ellipsizeMode="tail">
                                {title}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.contentWrapper}>
                    <TextInput
                        style={styles.title}
                        multiline
                        value={title}
                        onChangeText={(value: string) => setTitle(value)}
                        onEndEditing={handleSave}
                    />
                    <Text>Created: {formatDistanceToNow(task.creationDate.toDate())} ago</Text>
                    {task.modifyDate && <Text>Modified: {formatDistanceToNow(task.modifyDate.toDate())} ago</Text>}
                    <Picker selectedValue={newColumnId} onValueChange={value => handleColumnChange(value)}>
                        {columns.map(c => (
                            <Picker.Item label={c.name} value={c.id} key={c.id} />
                        ))}
                    </Picker>
                    <TextInput
                        style={styles.description}
                        multiline
                        value={description}
                        placeholder="Start writing your ideas here..."
                        onChangeText={(value: string) => setDescription(value)}
                        onEndEditing={handleSave}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        flexDirection: "row",
        alignItems: "center",
    },
    closeBtn: {
        // maxWidth: "30%",
        height: "100%",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    closeBtnTxt: {
        width: 100,
        marginLeft: 5,
        overflow: "hidden",
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
        paddingBottom: 20,
    },
});

export default TaskDetailsView;
