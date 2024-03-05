import { ScrollView, StyleSheet, Text, View } from "react-native"
import tw from "twrnc";
import { useSelector } from "react-redux";
import SingleWallpaper from "./SingleWallpaperFavourite";

const FavouriteWallpapers = (props) => {
    const {navigation} = props;
    const favouritesData = useSelector((state)=>state.reducer);
    const viewFullImage = (image) => {
        navigation.navigate("FullImage", {imageLink: image});
    }

    return (
        
        <View style={tw`flex-1 bg-[#f9fbfd]`}>

            {
                !favouritesData.length ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Text style={tw`text-slate-600`}>No Favourite Images</Text>
                </View>
                ) :
                (
                <ScrollView contentContainerStyle={styles.container}>
                    {favouritesData.map((image, index) => (
                        <SingleWallpaper key={index} image={image} viewFullImage={viewFullImage} />
                    ))}
                </ScrollView>
                )

            }

        </View>
    )
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

export default FavouriteWallpapers;