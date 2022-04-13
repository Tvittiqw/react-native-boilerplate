import {Platform, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        marginTop: 40,
        alignItems: "center",
        flex: 1,
        paddingBottom: Platform.OS === "ios" ? 25 : 10,
    },
    signupText: {
        fontSize: 36,
        marginBottom: 20,
    },
    navLink: {
        color: "blue"
    },
    loginContainer: {
        marginTop: 30,
        justifyContent: "center",
        flexDirection: "row",
    },
})

export default styles;