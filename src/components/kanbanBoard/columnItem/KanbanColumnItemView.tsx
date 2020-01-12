import React from "react";
import { View, Text } from "react-native";

interface Props {
    data: {
        id: string;
        title: string;
    };
}

const KanbanColumnItemView: React.FC<Props> = ({ data, children }) => {
    return (
        <View>
            <Text>{data.title}</Text>
        </View>
    );
};

export default KanbanColumnItemView;
