import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

const ShareScreen: React.FC = () => {
    const activeProject = useSelector(state => state.projects.activeProject);

    return (
        <View>
            <Text>NIc</Text>
        </View>
    );
};

export default ShareScreen;
