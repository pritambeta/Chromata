import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const SingleWallpaper = ({ image, viewFullImage }) => {
    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>viewFullImage(image)} activeOpacity={1}>
                <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
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