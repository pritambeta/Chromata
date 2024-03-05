import React from 'react'
import tw from "twrnc";
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/backgrounds/background.png";
import { shuffleArray, categories } from '../lib/Constants';

const Home = (props) => {
    const random_number = Math.floor(Math.random() * 1000) + 1;
    // const random_number = "0";

    const openAllWallpapers = (category) => {
      props.navigation.navigate("Wallpapers", {category});
    }


    return (
        <ScrollView style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode='cover'>
          <View style={tw``}>
            <View style={tw`flex px-4 pt-13 pb-6`}>
              <Text style={tw`text-3xl font-bold text-slate-800`}>Filter Your</Text>
              <Text style={tw`text-xl text-slate-800`}>Moods Here</Text>
            </View>

            <ScrollView horizontal style={tw`flex flex-row p-4 pt-0`}>
              {
                shuffleArray(categories[0]).map((item, index)=>(
                  <TouchableOpacity key={index} activeOpacity={1} onPress={()=>openAllWallpapers(item)}>
                    <ImageBackground source={{uri: `https://source.unsplash.com/400x250/?${item.toLowerCase()},darktheme,${random_number}`}} resizeMode='cover'
                style={tw`w-70 h-50 rounded-lg overflow-hidden flex justify-end items-start m-4 ml-0`}>
                      <Text style={tw`text-white m-3.5 text-xl font-bold`}>{item}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

            <Text style={tw`text-xl font-medium text-slate-800 m-4 my-0`}>Trending</Text>
            <ScrollView horizontal style={tw`flex flex-row p-4`}>
            {
              shuffleArray(categories[1]).map((item, index)=>(
                <TouchableOpacity key={index} activeOpacity={1} onPress={()=>openAllWallpapers(item)}>
                  <ImageBackground source={{uri: `https://source.unsplash.com/250x400/?${item.toLowerCase()},darktheme,${random_number}`}} resizeMode='cover'
              style={tw`w-50 h-70 rounded-lg overflow-hidden flex justify-end items-start m-4 ml-0`}>
                    <Text style={tw`text-white m-3.5 text-xl font-bold`}>{item}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            }
            </ScrollView>

            <Text style={tw`text-xl font-medium text-slate-800 m-4 my-0`}>Popular</Text>
            <ScrollView horizontal style={tw`flex flex-row p-4`}>
            {
              shuffleArray(categories[2]).map((item, index)=>(
                <TouchableOpacity key={index} activeOpacity={1} onPress={()=>openAllWallpapers(item)}>
                  <ImageBackground source={{uri: `https://source.unsplash.com/250x400/?${item.toLowerCase()},darktheme,${random_number}`}} resizeMode='cover'
              style={tw`w-50 h-70 rounded-lg overflow-hidden flex justify-end items-start m-4 ml-0`}>
                    <Text style={tw`text-white m-3.5 text-xl font-bold`}>{item}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            }
            </ScrollView>

            <View style={tw`h-0 w-full flex flex-row justify-center items-center mb-5`}>
              {/* <Text style={tw`text-slate-600 mr-1`}>Developed by</Text> */}
              {/* <Text style={tw`text-slate-800 font-bold`}>PritamBeta</Text> */}
            </View>

          </View>

      

        </ImageBackground>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: "#f9fbfd",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Futura",
    }
  })

export default Home;
