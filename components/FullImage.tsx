import { ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Octicons";
import downloadImage from "../lib/DownloadFile";
import APILib from "../lib/API";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from './redux/action';

const FullImage = (props) => {
    const [loading, setLoading] = useState(true);
    let initialLink = props.route.params.imageLink;
    
    const api = new APILib();
    const photoId = api.getPhotoId(initialLink);
    let imageLink = "https://images.unsplash.com/" + photoId + "?w=800&h=1200";

    const dispatch = useDispatch();
    const favouriteItems = useSelector(state => state.reducer);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        let result = favouriteItems.filter((element)=>{
            return element === initialLink;
        });
        if (result.length) {
            setIsAdded(true);
        }
        else {
            setIsAdded(false);
        }
    }, [favouriteItems]);

    useEffect(()=>{
        setLoading(true);

    }, [])

    const handleLoadStart = ()=> {
        setLoading(true);
    }
    const handleLoadEnd = () => {
        setLoading(false);
    }
    
    const handleDownload = () => {
        const originalDownloadLink = "https://images.unsplash.com/" + photoId + "?fm=jpg";
        downloadImage(originalDownloadLink);
    }

    return (
        <View style={tw`flex-1 bg-[#ddd] flex justify-center items-center`}>
            {
                loading && 
                <ActivityIndicator size={40} color="dodgerblue" />
            }

            <ImageBackground source={{uri: imageLink}} style={tw`w-full h-[100%] flex justify-end items-start ${loading ? "hidden" : "flex"}`}
                resizeMode="contain"
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
            >
                <View style={tw`p-4`}>
                    <View style={tw`absolute bottom-4 left-4 flex-row`}>
                    
                    {
                        isAdded ? (
                            <TouchableOpacity activeOpacity={1} onPress={()=>dispatch(removeFromWishList(initialLink))} style={tw`bg-white p-1 rounded-full w-10 h-10 mr-3 flex justify-center items-center`}>
                                <Icon name="heart-fill" size={20} color="dodgerblue" />
                            </TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity activeOpacity={1} onPress={()=>dispatch(addToWishList(initialLink))} style={tw`bg-white p-1 rounded-full w-10 h-10 mr-3 flex justify-center items-center`}>
                                <Icon name="heart" size={20} color="dodgerblue" />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity activeOpacity={1} onPress={()=>handleDownload()} style={tw`bg-white p-1 rounded-full w-10 h-10 mr-3 flex justify-center items-center`}>
                        <Icon name="download" size={20} color="dodgerblue" />
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default FullImage;