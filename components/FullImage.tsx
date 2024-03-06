import { ActivityIndicator, ImageBackground, Alert, TouchableOpacity, View, Text, Modal } from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Octicons";
import downloadImage from "../lib/DownloadFile";
import APILib from "../lib/API";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from './redux/action';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

const FullImage = (props) => {
    const [loading, setLoading] = useState(true);
    let initialLink = props.route.params.imageLink;
    
    const api = new APILib();
    const photoId = api.getPhotoId(initialLink);
    let imageLink = "https://images.unsplash.com/" + photoId + "?w=800&h=1200";

    const dispatch = useDispatch();
    const favouriteItems = useSelector(state => state.reducer);
    const [isAdded, setIsAdded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [wallpaperLoading, setWallpaperLoading] = useState(false);

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

    const callback = res => {
        setWallpaperLoading(false);
        Alert.alert("Success", "Wallpaper set successfully");
    };

    const handleSetWallpaper = (type) => {
        // setWallpaper(imageLink);
        // console.warn(imageLink);
        const originalDownloadLink = "https://images.unsplash.com/" + photoId + "?fm=jpg";
        
        switch (type) {
            case 'HOME':
                wallpaperType = TYPE.HOME;
                break;
            case 'LOCK':
                wallpaperType = TYPE.LOCK;
                break;
            case 'BOTH':
                wallpaperType = TYPE.BOTH;
                break;
            default:
                wallpaperType = TYPE.BOTH;
        }

        setModalVisible(false);
        setWallpaperLoading(true);
        ManageWallpaper.setWallpaper(
            {
              uri: originalDownloadLink,
            },
            callback,
            wallpaperType,
          );
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
                    <TouchableOpacity activeOpacity={1} onPress={()=>setModalVisible(true)} style={tw`bg-white p-1 rounded-full w-40 h-10 mr-3 flex justify-center items-center`}>
                        <Text style={tw`text-[#1E90FF] font-medium`}>SET AS WALLPAPER</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            <ModalSetWallpaper visible={modalVisible} setVisible={setModalVisible} setHomeScreen={()=>handleSetWallpaper('HOME')} setLockScreen={()=>handleSetWallpaper('LOCK')} setBothScreen={()=>{handleSetWallpaper('BOTH')}} />

            <ModalLoading  visible={wallpaperLoading} />

        </View>
    )
}

function ModalSetWallpaper({ visible, setVisible, setHomeScreen, setLockScreen, setBothScreen }) {
    return (
      <View>
        <Modal transparent={true} animationType="fade" visible={visible}>
          <View style={tw`p-6 bg-gray-600 bg-opacity-60 flex-1 justify-center items-center`}>
            <View style={tw`w-full p-5 bg-white rounded-md flex justify-center items-center shadow`}>
                <TouchableOpacity style={tw`p-2`} activeOpacity={1} onPress={setHomeScreen}>
                    <Text style={tw`text-[#1E90FF] font-medium`}>HOME SCREEN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-2`} activeOpacity={1} onPress={setLockScreen}>
                    <Text style={tw`text-[#1E90FF] font-medium`}>LOCK SCREEN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-2`} activeOpacity={1} onPress={setBothScreen}>
                    <Text style={tw`text-[#1E90FF] font-medium`}>BOTH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-2`} activeOpacity={1} onPress={()=>setVisible(false)}>
                    <Text style={tw`text-red-500 font-medium`}>CANCEL</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  function ModalLoading({ visible }) {
    return (
      <View>
        <Modal transparent={true} animationType="fade" visible={visible}>
          <View style={tw`p-6 bg-opacity-60 bg-gray-600 flex-1 justify-center items-center`}>
            <View style={tw`w-full p-5 bg-white rounded-md flex justify-between items-center flex-row shadow`}>
                <Text style={tw`text-slate-800 font-semibold`}>Setting Wallpaper...</Text>
                <ActivityIndicator size={30} color="dodgerblue" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }



export default FullImage;