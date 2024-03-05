import { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import tw from "twrnc";
import APILib from "../lib/API";
import { useNavigation } from "@react-navigation/native";
import SingleWallpaper from "./SingleWallpaper";

function titleCase(str) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

const Wallpapers = (props) => {
    const {navigation} = props;
    const {category} = props.route.params;
    const [loading, setLoading] = useState(true);
    const [wallpapers, setWallpapers] = useState([]);
    const navigation_layout = useNavigation();

    const api = new APILib();

    useLayoutEffect(()=>{
      navigation_layout.setOptions({ title: `${titleCase(category)}`});
    })

    const getWallPapers = async (n=2) => {
        const data = await api.getPhotosByCategory(category.toLowerCase(), 400, 600, n);
        setWallpapers(prevWallpapers => [...prevWallpapers, ...data]);
        setLoading(false);
    }

    useEffect(() => {
      freshWallpapers();
    }, [])

    const freshWallpapers = ()=> {
      getWallPapers(2);
      getWallPapers(2);
      getWallPapers(2);
      getWallPapers(2);
      getWallPapers(2);
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
          getWallPapers();
        }
    };

    const viewFullImage = (image) => {
      navigation.navigate("FullImage", {imageLink: image});
    }
    
      return (
        <View style={tw`flex-1 bg-[#f9fbfd]`}>

        {
            loading ? (
              <View style={tw`flex flex-1 justify-center items-center`}>
                <ActivityIndicator size={40} color={"dodgerblue"} />
              </View>
            ) : (
              <ScrollView contentContainerStyle={[styles.container, {display: !loading ? "flex" : "none"}]}
              onScroll={handleScroll}
              // scrollEventThrottle={16}
              >
      
                {wallpapers.map((image, index) => (
                      <SingleWallpaper key={index} image={image} viewFullImage={viewFullImage} />
                  ))}
        
                <View style={tw`w-full h-20 flex justify-center items-center`}>
                    <ActivityIndicator size={40} color={"dodgerblue"} />
                </View>
      
              </ScrollView>
            )
        }
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: "#f9fbfd"
    },
    imageContainer: {
      width: '48.6%',
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 8,
    },
  });

export default Wallpapers;