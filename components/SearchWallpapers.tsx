import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import APILib from "../lib/API";
import Icon from "react-native-vector-icons/Octicons";

const Wallpapers = (props) => {
    const {navigation} = props;
    const {category} = props.route.params;
    const [loading, setLoading] = useState(true);
    const [wallpapers, setWallpapers] = useState([]);

    const api = new APILib();

    const getWallPapers = async (n=2) => {
        const data = await api.getPhotosByCategory(category.toLowerCase(), 400, 600, n);
        setWallpapers(prevWallpapers => [...prevWallpapers, ...data]);
        setLoading(false);
    }

    useEffect(() => {
        getWallPapers(10);
        
    }, [])

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
          getWallPapers();
        }
    };

    const makeFavourite = (image) => {
        console.warn(image);
    }
    const viewFullImage = (image) => {
      navigation.navigate("FullImage", {imageLink: image});
    }
    
      return (
        <View style={tw`flex-1 bg-[#f9fbfd]`}>

        {
            loading &&
            <View style={tw`flex flex-1 mt-35 justify-center items-center`}>
                <ActivityIndicator size={40} color={"dodgerblue"} />
            </View>
        }


        <ScrollView contentContainerStyle={[styles.container, {display: !loading ? "flex" : "none"}]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        >

        {wallpapers.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={()=>viewFullImage(image)} activeOpacity={1}>
                    <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
                <View style={tw`absolute bottom-3 left-3 flex-row`}>
                <TouchableOpacity activeOpacity={1} onPress={()=>makeFavourite(image)}>
                    <Icon name="heart" size={25} color="white" />
                </TouchableOpacity>
                </View>
            </View>
          ))}

        <View style={tw`w-full h-20 flex justify-center items-center`}>
            <ActivityIndicator size={30} color={"dodgerblue"} />
        </View>

        </ScrollView>
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
      width: '48.2%',
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 8,
    },
  });

export default Wallpapers;