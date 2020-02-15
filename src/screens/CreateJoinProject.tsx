import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { NavigationSwitchProp } from "react-navigation";

interface Props {
    navigation: NavigationSwitchProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Choose option:</Text>
            <View style={styles.button}>
                <Button title="Create new project" onPress={() => navigation.navigate("CreateProject")} />
            </View>
            <View style={styles.button}>
                <Button title="Join to project" onPress={() => navigation.navigate("JoinProject")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 20,
    },
});

export default MainScreen;
