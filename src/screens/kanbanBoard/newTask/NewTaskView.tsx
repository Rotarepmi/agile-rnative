import React from "react";
import { View, StyleSheet, Modal, TextInput, Text, ActivityIndicator, TouchableHighlight, Button, Picker } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../utils/theme";

interface Props {
    title: string;
    description: string;
    assignedUser: string;
    loading: boolean;
    addingTask: boolean;
    users: { id: string; name: string }[];
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setAssignedUser: React.Dispatch<React.SetStateAction<string>>;
    handleSaveClick: () => void;
    closeTaskAdding: () => void;
}

const NewTaskView: React.FC<Props> = ({
    title,
    description,
    assignedUser,
    loading,
    addingTask,
    users,
    setTitle,
    setDescription,
    setAssignedUser,
    handleSaveClick,
    closeTaskAdding,
}) => {
    return (
        <Modal animationType="fade" transparent={false} visible={addingTask}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableHighlight style={styles.closeBtn} onPress={closeTaskAdding} underlayColor={theme.shadow}>
                        <View style={styles.closeBtn}>
                            <FontAwesome name="chevron-left" size={15} />
                            <Text style={styles.closeBtnTxt} numberOfLines={1}>
                                Cancel
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.contentWrapper}>
                    <TextInput
                        style={styles.title}
                        multiline
                        value={title}
                        placeholder="Type in task title here"
                        onChangeText={(value: string) => setTitle(value)}
                    />
                    <TextInput
                        style={styles.description}
                        multiline
                        value={description}
                        placeholder="Type in your ideas here..."
                        onChangeText={(value: string) => setDescription(value)}
                    />
                </View>
            </View>
            <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Assign teammate:</Text>
                <Picker selectedValue={assignedUser} onValueChange={(value: string) => setAssignedUser(value)}>
                    <Picker.Item label="unassigned" value={null} />
                    {users.map(u => (
                        <Picker.Item label={u.name} value={u.id} key={u.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.buttonWrapper}>
                {loading ? <ActivityIndicator style={styles.loader} size="small" /> : <Button title="Save" onPress={handleSaveClick} />}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: theme.shadow,
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
        paddingBottom: 80,
    },
    container: {
        flex: 1,
        position: "relative",
    },
    pickerWrapper: {
        flex: 0,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonWrapper: {
        flex: 0,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        position: "absolute",
        bottom: 5,
        right: 5,
        paddingHorizontal: 10,
        paddingVertical: 1,
    },
    label: {
        paddingLeft: 8,
        color: theme.shadowDark
    }
});

export default NewTaskView;
