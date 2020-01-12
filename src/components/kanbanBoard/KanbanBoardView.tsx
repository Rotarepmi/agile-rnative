import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

import { KanbanColumn} from "./column";

const KanbanBoardView: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal scrollEnabled pagingEnabled style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                <KanbanColumn>
                    <Text>Backlog</Text>
                </KanbanColumn>
                <KanbanColumn>
                    <Text>To do</Text>
                </KanbanColumn>
                <KanbanColumn>
                    <Text>Ongoing</Text>
                </KanbanColumn>
                <KanbanColumn>
                    <Text>Done</Text>
                </KanbanColumn>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
    },
    scrollView: {
        flexGrow: 1,
    }
});

export default KanbanBoardView;
