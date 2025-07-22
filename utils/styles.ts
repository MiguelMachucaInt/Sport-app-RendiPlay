import { StyleSheet } from "react-native";

export function mergeStyles(...styles: any[]) {
    return StyleSheet.flatten(styles.filter(Boolean));
}