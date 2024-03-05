import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import Icon from "react-native-vector-icons/Octicons";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToWishList, removeFromWishList } from './redux/action';

const SingleWallpaper = ({ image, viewFullImage }) => {

    const dispatch = useDispatch();
    const favouriteItems = useSelector(state => state.reducer);
    const [isAdded, setIsAdded] = useState(false);


    useEffect(() => {
        let result = favouriteItems.filter((element)=>{
            return element === image;
        });
        if (result.length) {
            setIsAdded(true);
        }
        else {
            setIsAdded(false);
        }
    }, [favouriteItems]);

    const makeFavourite = (image) => {
      dispatch(addToWishList(image));
      setIsAdded(true);
    }

    const removeFromFavourite = (image) => {
        dispatch(removeFromWishList(image));
        setIsAdded(false);
    }


    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>viewFullImage(image)} activeOpacity={1}>
                <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
            <View style={tw`absolute bottom-3 left-3 flex-row`}>
            {
                isAdded ? (
                    <TouchableOpacity activeOpacity={1} onPress={()=>removeFromFavourite(image)}>
                        <Icon name="heart-fill" size={25} color="white" />
                    </TouchableOpacity>
                ) :
                <TouchableOpacity activeOpacity={1} onPress={()=>makeFavourite(image)}>
                    <Icon name="heart" size={25} color="white" />
                </TouchableOpacity>
            }

            </View>
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
      borderRadius: 1,
    },
  });

export default SingleWallpaper;