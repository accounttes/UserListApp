import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "./screens/UserListScreen";
import { User } from "./types";
import UserDetailScreen from "./screens/UserDetailScreen";

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
