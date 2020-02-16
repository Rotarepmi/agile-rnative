import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "react-navigation-drawer";

import firebase from "../utils/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const SideMenu: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
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
                            <Text style={styles.navItemStyle}><FontAwesome name="home" size={15} /> Go to Home screen</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Tasks");
                            }}
                        >
                            <Text style={styles.navItemStyle}><FontAwesome name="list" size={15} />  Project Tasks</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Chat");
                            }}
                        >
                            <Text style={styles.navItemStyle}><FontAwesome name="comments" size={15} /> Project Chat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                navigateToScreen("Share");
                            }}
                        >
                            <Text style={styles.navItemStyle}><FontAwesome name="share" size={15} /> Share project</Text>
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
                    <Text style={styles.footerItem}><FontAwesome name="user" size={15} /> {currentUser.displayName}</Text>
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
        paddingRight: 10,
        flex: 0,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SideMenu;
