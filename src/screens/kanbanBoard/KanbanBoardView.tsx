import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

import { KanbanColumn} from "./column";
import { Column } from "../../utils/Types";

interface Props {
    columns: Column[]
}

const KanbanBoardView: React.FC<Props> = ({ columns }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal scrollEnabled pagingEnabled style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                {
                    columns && columns.map(col => <KanbanColumn data={col} key={col.id} />)
                }
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
