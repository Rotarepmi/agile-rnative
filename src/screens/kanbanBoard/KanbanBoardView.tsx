import React from "react";
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from "react-native";

import { KanbanColumn } from "./column";
import { Column } from "../../utils/Types";

interface Props {
    columns: Column[];
    loading: boolean;
}

const KanbanBoardView: React.FC<Props> = ({ columns, loading }) => {
    return (
        <React.Fragment>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.container}>
                    <ScrollView horizontal scrollEnabled pagingEnabled style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                        {columns && columns.map(col => <KanbanColumn column={col} key={col.id} />)}
                    </ScrollView>
                </View>
            )}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        flexGrow: 1,
    },
});

export default KanbanBoardView;
