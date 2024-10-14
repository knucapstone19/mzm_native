import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import ProfileIcon from "../icons/ProfileIcon";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "Home":
              return <HomeIcon color={color} />;
            case "Search":
              return <SearchIcon color={color} />;
            case "Profile":
              return <ProfileIcon color={color} />;
          }
        },
        tabBarStyle: { height: 56 },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF8800",
        tabBarInactiveTintColor: "#B0B0B0",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabBar;
