import React from "react";
import { StyleSheet, Dimensions, View, Text, FlatList } from "react-native";

import { KanbanColumnItem } from "../columnItem";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

const KanbanColumnView: React.FC = ({ children }) => {
    const data = [
        {
            id: "jeden",
            title: "jeden",
        },
        {
            id: "dwa",
            title: "dwa",
        },
        {
            id: "trzy",
            title: "trzy",
        },
        {
            id: "cztery",
            title: "cztery",
        },
    ];

    return (
        <View style={styles.container}>
            {children}
            <FlatList data={data} renderItem={({ item }) => <KanbanColumnItem key={item.id} data={item} />} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
        padding: 10,
    },
});

export default KanbanColumnView;
