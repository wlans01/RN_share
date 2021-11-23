import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

const ITEM_SIZE = SCREENWIDTH / 5;
const Drag_Drop = ({ item, changeimg }) => {
  //values
  const scale = useRef(new Animated.Value(1)).current;
  const Position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  //Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressout = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const gocenter = Animated.spring(Position, {
    toValue: 0,
    tension: 5,
    useNativeDriver: true,
  });
  const ondrop = Animated.spring(scale, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goHome = Animated.timing(Position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onHome = Animated.timing(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  //panResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        Position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250) {
          Animated.sequence([ondrop, goHome, onHome]).start();

          changeimg(item.uriC);
        } else {
          Animated.parallel([onPressout, goHome]).start();
        }
      },
    })
  ).current;
  return (
    <Pressable onPress={() => console.log(1)} style={{ zIndex: 20 }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          ...styles.iconimg,
          transform: [...Position.getTranslateTransform(), { scale }],
        }}
      >
        <Image style={styles.iconimg} source={{ uri: item.uriH }} />
      </Animated.View>
    </Pressable>
  );
};

export default Drag_Drop;

const styles = StyleSheet.create({
  iconimg: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    resizeMode: "contain",
  },
});
