import React from "react";
import { Modal, View, Text, TouchableHighlight } from "react-native";

interface Props {
    data: {
        id: string;
        title: string;
    };
    detailsVisible: boolean;
    setDetailsVisible: () => void;
}

const TaskDetailsView: React.FC<Props> = ({ data, detailsVisible, setDetailsVisible }) => {
    return (
        <Modal animationType="slide" transparent={false} visible={detailsVisible}>
            <View>
                <TouchableHighlight onPress={setDetailsVisible}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>

                <Text>{data.title}</Text>
            </View>
        </Modal>
    );
};

export default TaskDetailsView;
