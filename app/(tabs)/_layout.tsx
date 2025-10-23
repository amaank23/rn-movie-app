import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { colors } from "@/utils/style";
import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type TabIconProps = {
  title: string;
  icon: ImageSourcePropType;
  focused: boolean;
};

const TabIcon = ({ title, icon, focused }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground source={images.highlight} style={styles.backgroundImage}>
        <Image
          source={icon}
          tintColor={"#151312"}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.normalWrapper}>
      <Image
        source={icon}
        tintColor={"#A8B5DB"}
        style={{ width: 20, height: 20 }}
      />
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
          marginVertical: 4,
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 0,
          borderColor: "#0f0D23",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Search" icon={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Saved" icon={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  wrapper: {
    // borderRadius: 9999,
    // overflow: "hidden", // this clips the image!
  },
  backgroundImage: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    minWidth: 112,
    minHeight: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    color: colors.seconday,
    fontWeight: 600,
    marginLeft: 8,
  },
  normalWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
    borderRadius: 9999,
  },
});
