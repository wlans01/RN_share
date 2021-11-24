import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Parts from "./Parts";
import Snapchat from "./Snapchat";
import Story from "./Story";
import StoryThumbnail from "./StoryThumbnail";

const Stack = createSharedElementStackNavigator();
const Navigator = () => (
  <Stack.Navigator
    initialRouteName="StoryThumbnail"
    screenOptions={{
      headerShown: false,
      presentation: "transparentModal",
      animationTypeForReplace: "push",
    }}
  >
    <Stack.Screen name="Snapchat" component={Snapchat} />
    <Stack.Screen
      name="Story"
      component={Story}
      sharedElements={(route) => {
        const { item } = route.params;
        return [`item.${item.id}.uri`];
      }}
    />
    <Stack.Screen name="Parts" component={Parts} />
    <Stack.Screen name="StoryThumbnail" component={StoryThumbnail} />
  </Stack.Navigator>
);

export default Navigator;
