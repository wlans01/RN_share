import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StoryThumbnail from "./StoryThumbnail";
import item from "../Cupdata";
import { useNavigation } from "@react-navigation/core";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.5;
const Snapchat = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Animated.View style={{ ...styles.contianer }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SharedElement id={`item.${item.id}.uri`}>
          <Image
            source={require("../Image/icon.png")}
            style={{
              width: SCREENWIDTH / 2.5,
              height: SCREENHEIGHT / 7,
              margin: 30,

              overflow: "visible",
            }}
          />
        </SharedElement>
        <Text style={{ fontSize: 36, marginBottom: 20, marginTop: -20 }}>
          마음에드는 컵을 골라주세요
        </Text>
      </View>
      <Animated.FlatList
        scrollEventThrottle={16}
        data={item}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: ITEM_SIZE / 4,
          justifyContent: "center",
          alignItems: "center",
        }}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -100, 0],
          });
          const zIndex = scrollX.interpolate({
            inputRange,
            outputRange: [0, 10, 0],
            extrapolate: "clamp",
          });
          const oPa = scrollX.interpolate({
            inputRange: [
              (index - 2) * ITEM_SIZE,
              ...inputRange,
              (index + 2) * ITEM_SIZE,
            ],
            outputRange: [0.4, 0.7, 1, 0.7, 0.4],
            extrapolate: "clamp",
          });
          const eve = scrollX.interpolate({
            inputRange,
            outputRange: [0, 5, 0],
            extrapolate: "clamp",
          });

          return (
            <Cup
              item={item}
              translateY={translateY}
              zIndex={zIndex}
              oPa={oPa}
              eve={eve}
            />
          );
        }}
        keyExtractor={(item, index) => index}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </Animated.View>
  );
};

const Cup = ({ item, translateY, zIndex, oPa, eve }) => {
  const navigation = useNavigation();
  const onpress = () => {
    navigation.navigate("Story", { item: item });
  };
  return (
    <Pressable onPress={() => onpress()}>
      <Animated.View
        style={{
          ...styles.cupbox,
          opacity: oPa,
          zIndex,

          transform: [{ translateY }],
        }}
      >
        <SharedElement id={`item.${item.id}.uri`}>
          <Image style={styles.cupimg} source={{ uri: item.uri }} />
        </SharedElement>
      </Animated.View>
    </Pressable>
  );
};
export default Snapchat;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cupbox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    // backgroundColor: "red",

    borderRadius: 20,
    overflow: "visible",
    // marginHorizontal: -50,
  },
  cupimg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  secondbox: {
    width: 350,
    height: 600,
    position: "absolute",
    zIndex: 30,
    backgroundColor: "green",
    borderRadius: 20,
    top: 0,
  },
});
