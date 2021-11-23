import * as React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
});

const StoryThumbnail = ({ item }) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = React.useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        navigation.navigate("Story", { item });
      }}
    >
      <SharedElement id={`item.${item.id}.uri`}>
        <View style={[styles.container]}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
      </SharedElement>
    </Pressable>
  );
};

export default StoryThumbnail;
