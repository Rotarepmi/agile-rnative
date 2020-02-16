import React, { useEffect, useState, FunctionComponent } from "react";
import { NavigationActions, NavigationSwitchProp } from "react-navigation";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import firebase, { db } from "../utils/firebase";
import { setActiveProject } from "../redux/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import { theme } from "../utils/theme";

interface Props {
    navigation: NavigationSwitchProp;
}

const SideMenu: FunctionComponent<DrawerContentComponentProps> = ({ navigation }) => {
    const currentUser = firebase.auth().currentUser;

    function navigateToScreen(route: string) {
        navigation.navigate(route);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={{...styles.navSectionStyle, ...styles.firstSection}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("MainScreen");
                            }}
                        >
                            <Text style={styles.navItemStyle}>Go to Home screen</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Tasks");
                            }}
                        >
                            <Text style={styles.navItemStyle}>Project Tasks</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Chat");
                            }}
                        >
                            <Text style={styles.navItemStyle}>Project Chat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Share");
                            }}
                        >
                            <Text style={styles.navItemStyle}>Share project</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigateToScreen("UserSettings");
                    }}
                >
                    <Text style={styles.footerItem}>|| {currentUser.displayName}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstSection: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    navItemStyle: {
        padding: 10,
    },
    navSectionStyle: {
        marginBottom: 10
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    footerContainer: {
        backgroundColor: "lightgrey",
    },
    footerItem: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default SideMenu;
