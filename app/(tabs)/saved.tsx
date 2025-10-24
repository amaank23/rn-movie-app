import { colors } from "@/utils/style";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Saved = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 40,
      }}
    >
      <Text>Saved</Text>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});
