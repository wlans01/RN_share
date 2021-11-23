import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Image,
  Pressable,
  Text,
  FlatList,
} from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import Drag_Drop from "../Components/Drag_Drop";
import Drag_DropPrat from "../Components/Drag_DropPrat";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const ITEM_SIZE = SCREENWIDTH / 1.5;

const Story = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [imguri, setimguri] = useState(item.uri);

  const [isDone, setisDone] = useState(false);
  const changeimg = (uri) => {
    setimguri(uri);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: SCREENWIDTH,
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
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Parts", {
                uridata: imguri,

                item: item,
              });
            }}
          >
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
            컵홀더를 골라주세요
          </Text>
        </View>
      </View>

      <SharedElement
        id={`item.${item.id}.uri`}
        style={{
          position: "absolute",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={{ uri: imguri }} style={styles.image} />
      </SharedElement>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <FlatList
          scrollEventThrottle={16}
          data={item.Holder}
          horizontal
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 30,
            zIndex: 50,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Drag_Drop item={item} changeimg={changeimg} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Story;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    borderRadius: 20,
    resizeMode: "contain",
    bottom: -40,
  },
});
