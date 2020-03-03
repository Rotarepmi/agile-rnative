import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

interface Props {
    message: string;
    sender: string;
    date: string;
}

const ChatView: React.FC<Props> = ({ message, sender, date }) => {

    return (
        <View>
            <Text>Dupa dupa</Text>
            <Text>12.12.1212</Text>
            <Text>Mansersik</Text>
        </View>
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

export default ChatView;
