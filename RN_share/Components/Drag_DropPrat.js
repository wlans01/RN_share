import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 8;
const Drag_DropPrat = ({ item, changeimg, isDone }) => {
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
        Position.setOffset({
          x: Position.x._value,
          y: Position.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        Position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { dy }) => {
        Position.flattenOffset();
      },
    })
  ).current;
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        ...styles.iconbox,
        opacity: isDone ? (Position.y._value > -50 ? 0 : 1) : 1,
        transform: [...Position.getTranslateTransform(), { scale }],
      }}
    >
      <Image style={styles.iconimg} source={{ uri: item.uriparts }} />
    </Animated.View>
  );
};

export default Drag_DropPrat;

const styles = StyleSheet.create({
  iconbox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  iconimg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
});
