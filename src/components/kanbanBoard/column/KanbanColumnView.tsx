import React from "react";
import { StyleSheet, Dimensions, View, Text, FlatList } from "react-native";

import { KanbanColumnItem } from "../columnItem";
import ColumnHeader from "./components/ColumnHeader";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

interface Props {
    data: {
        id: string;
        title: string;
        items: {
            id: string;
            title: string;
        }[];
    };
}

const KanbanColumnView: React.FC<Props> = ({ data, children }) => {
    return (
        <View style={styles.container}>
            <ColumnHeader title={data.title} id={data.id} />

            <FlatList
                contentContainerStyle={styles.flatList}
                data={data.items}
                renderItem={({ item }) => <KanbanColumnItem key={item.id} data={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_DIMENSIONS.width,
        height: "auto",
    },
    flatList: {
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
    },
});

export default KanbanColumnView;
