import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { ChatMessage } from "./chatMessage";

const ChatView: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <React.Fragment>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList contentContainerStyle={styles.scrollView} data={[]} renderItem={({ item }) => <ChatMessage data={item} />} />
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

export default ChatView;
