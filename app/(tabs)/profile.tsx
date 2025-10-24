import { colors } from "@/utils/style";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 40,
      }}
    >
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
