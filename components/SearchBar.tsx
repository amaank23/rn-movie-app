import { icons } from "@/constants/icons";
import { colors } from "@/utils/style";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.image}
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChange={() => {}}
        placeholderTextColor={"#a8b5db"}
        style={styles.textInput}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors["dark-200"],
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    color: "white",
  },
});
