import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './components/Home';
import Wallpapers from './components/Wallpapers';
import FullImage from './components/FullImage';
import Search from './components/Search';
import IconBadge from 'react-native-icon-badge';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setData } from './components/redux/action';
import FavouriteWallpapers from './components/FavouriteWallpapers';

// {/* <Icon name="search" size={30} color="dodgerblue" /> */}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
      >
      <Tab.Screen name="Home" component={HomeStack}
        options={{
          tabBarIcon: (({color, size})=>(
            <Icon name="home" size={size} color={color} />
          )),
          tabBarLabel: 'Home',
          tabBarIconStyle: {marginTop: 5},
          tabBarLabelStyle: {fontSize: 10, marginBottom: 3},
        }}
      />
      <Tab.Screen name="Search" component={SearchStack}
        options={{
          tabBarIcon: (({color, size})=>(
            <Icon name="search" size={size} color={color} />
          )),
          tabBarLabel: 'Search',
          tabBarIconStyle: {marginTop: 5},
          tabBarLabelStyle: {fontSize: 10, marginBottom: 3},
        }} />
      <Tab.Screen name="Favourites" component={FavouriteStack}
        options={{
          tabBarIcon: (({color, size, focused})=>(
            <IconWithBadge color={color} size={size} focused={focused} />
          )),
          tabBarLabel: 'Favourites',
          tabBarIconStyle: {marginTop: 5},
          tabBarLabelStyle: {fontSize: 10, marginBottom: 3},
        }} />
    </Tab.Navigator>
  )
}


const HomeStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: {backgroundColor: "#f9fbfd"}, animation: "simple_push" }}>
        <Stack.Screen name="MainHome" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Wallpapers" component={Wallpapers} />
        <Stack.Screen name="FullImage" options={{title: ""}} component={FullImage} />
      </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false, headerStyle: {backgroundColor: "#f9fbfd"}, animation: "simple_push"}}>
      <Stack.Screen name="SearchHome" component={Search} options={{headerShown: false}} />
      <Stack.Screen name="SearchWallpapers" component={Wallpapers} />
      <Stack.Screen name="FullImage" options={{title: ""}} component={FullImage} />
    </Stack.Navigator>
  )
}

const FavouriteStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false, headerStyle: {backgroundColor: "#f9fbfd"}, animation: "simple_push"}}>
      <Stack.Screen name="FavouriteHome" component={FavouriteWallpapers} options={{headerShown: false}} />
      <Stack.Screen name="FavouriteWallpapers" component={Wallpapers} />
      <Stack.Screen name="FullImage" options={{title: ""}} component={FullImage} />
    </Stack.Navigator>
  )

}

function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f9fbfd'} />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  )
}


const IconWithBadge = ({ focused, color, size }) => {
  // <Icon name={`${focused ? "heart-fill" : "heart"}`} size={size} color={color} />
  const favouritesData = useSelector((state)=>state.reducer);
  const [count, setCount] = useState(0);

  
  const dispatch = useDispatch();
  useEffect(()=>{
    // dispatch(setData(['https://source.unsplash.com/random']));
    // AsyncStorage.setItem('favourites', JSON.stringify([]));
    // AsyncStorage.clear();

    AsyncStorage.getItem('favourites').then((data)=>{
      if (!data) {
        return;
      }
      dispatch(setData(JSON.parse(data)));
    })
  }, []);

  useEffect(()=>{
    setCount(favouritesData.length);
    setTimeout(() => {
      AsyncStorage.setItem('favourites', JSON.stringify(favouritesData));
    }, 1500);
  }, [favouritesData]);

  return (
    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
      <IconBadge
        MainElement={
          <Icon name={`${focused ? "heart-fill": "heart"}`} size={size} color={color} />
        }
        BadgeElement={
          <Text style={{color:'#fff', fontSize: 10}}>{count > 9 ? "9+": count}</Text>
        }
        IconBadgeStyle={
          {width:20,
          height:20,
          fontSize: 8,
          margin: -5,
          backgroundColor: 'dodgerblue',
        }
        
      }
        Hidden={count == 0}
        />
    </View>
  )
}


export default App;
