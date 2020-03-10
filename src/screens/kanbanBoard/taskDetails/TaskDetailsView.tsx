import React from "react";
import { Modal, View, Text, TouchableHighlight, TextInput, StyleSheet, Picker } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Column } from "../../../utils/Types";
import { firestore } from "firebase";
import { theme } from "../../../utils/theme";

interface Props {
    task:
        | {
              id: string;
              name: string;
              description: string;
              creationDate: firestore.Timestamp;
              modifyDate: firestore.Timestamp;
              assignedUser: string;
          }
        | undefined;
    description: string;
    title: string;
    detailsVisible: boolean;
    columns: Column[];
    columnId: Column["id"];
    newColumnId: Column["id"];
    users: { id: string; name: string }[];
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
    users,
    handleColumnChange,
    setDescription,
    setTitle,
    handleSave,
    setDetailsVisible,
}) => {
    if (!task) return null;

    return (
        <Modal animationType="fade" transparent={false} visible={detailsVisible}>
            <View style={styles.container}>
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
                        maxLength={54}
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
            <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Assign teammate:</Text>
                <Picker selectedValue={task.assignedUser}>
                    <Picker.Item label="unassigned" value={null} />
                    {users.map(u => (
                        <Picker.Item label={u.name} value={u.id} key={u.id} />
                    ))}
                </Picker>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 170,
        position: "relative",
    },
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
        paddingTop: 0,
        paddingBottom: 20,
    },
    pickerWrapper: {
        flex: 0,
        paddingTop: 10,
        paddingBottom: 10,
    },
    label: {
        paddingLeft: 8,
        color: theme.shadowDark,
    },
});

export default TaskDetailsView;
