import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Drag_DropPrat from "../Components/Drag_DropPrat";
import { SharedElement } from "react-navigation-shared-element";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.5;

const Parts = ({ route }) => {
  const { uridata, item } = route.params;

  const [imguri, setimguri] = useState(uridata);
  const [isDone, setisDone] = useState(false);
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(0.5)).current;
  const scale2 = useRef(new Animated.Value(10)).current;

  const constant = useRef(new Animated.Value(1)).current;
  const Done = () => {
    setisDone(true);
    Animated.parallel([small, big]).start(stamp.start());
  };

  const restart = () => {
    setisDone(false);
    constant.setValue(1);
    scale.setValue(0.5);
    scale2.setValue(10);
  };
  const big = Animated.spring(scale, {
    toValue: 1.7,
    useNativeDriver: true,
  });

  const small = Animated.spring(constant, {
    toValue: 0,
    tension: 1,
    useNativeDriver: true,
  });

  const stamp = Animated.spring(scale2, {
    toValue: 1.5,
    tension: 1,
    delay: 500,
    useNativeDriver: true,
  });

  const scale1 = constant.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  const opacity = scale.interpolate({
    inputRange: [0.5, 1.7],
    outputRange: [0, 1],
  });

  const opacity2 = scale2.interpolate({
    inputRange: [1, 10],
    outputRange: [1, 0],
  });
  return (
    <Animated.View style={{ ...styles.contianer }}>
      <SharedElement id={`item.${item.id}.uri`} style={{ flex: 1 }}>
        <Animated.View
          style={{
            flex: 1,
            width: SCREENWIDTH,
            opacity: isDone ? 0 : 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" color="black" size={98} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Snapchat")}>
              <Image
                source={require("../Image/icon.png")}
                style={{
                  width: SCREENWIDTH / 2.5,
                  height: SCREENHEIGHT / 7,
                  margin: 30,
                  overflow: "visible",
                }}
              />
            </Pressable>
            <Pressable onPress={() => Done()}>
              <Ionicons name="chevron-forward-sharp" color="black" size={98} />
            </Pressable>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 36, marginTop: -20 }}>
              컵을 꾸며보세요
            </Text>
          </View>
        </Animated.View>
      </SharedElement>
      <SharedElement
        id={`item.${item.id}.uri`}
        style={{
          position: "absolute",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={{ uri: imguri }} style={styles.mainimage} />
      </SharedElement>

      <TouchableOpacity
        style={{ position: "absolute", left: 70 }}
        onPress={() => restart()}
      >
        <Ionicons name="refresh-circle-outline" color="gray" size={98} />
      </TouchableOpacity>
      {isDone ? (
        <Animated.Image
          source={require("../Image/icon.png")}
          style={{
            width: SCREENWIDTH / 2.5,
            height: SCREENHEIGHT / 7,
            margin: 30,
            position: "absolute",
            top: 30,
            opacity,
            transform: [{ scale }],
          }}
        />
      ) : null}
      {isDone ? (
        <Animated.Image
          source={require("../Image/done.png")}
          style={{
            width: SCREENWIDTH / 2.5,
            height: SCREENHEIGHT / 7,
            margin: 30,
            position: "absolute",

            opacity: opacity2,
            transform: [{ scale: scale2 }],
          }}
        />
      ) : null}
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          bottom: 50,
          width: SCREENWIDTH,
        }}
      >
        {item.parts.map((e) => (
          <Drag_DropPrat item={e} isDone={isDone} key={e.id} />
        ))}
      </View>
    </Animated.View>
  );
};

export default Parts;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mainimage: {
    flex: 1,
    position: "absolute",
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    borderRadius: 20,
    resizeMode: "contain",
    top: -360,
  },
});