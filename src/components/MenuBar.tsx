import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MenuBarView: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Menu</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
});

export default MenuBarView;
