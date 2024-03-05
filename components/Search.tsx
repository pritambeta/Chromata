import { TextInput, View } from "react-native"
import tw from "twrnc";
import { useEffect, useState } from "react";

function removeExtraSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
}
  
const Search = (props) => {
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        setSearchText('');
    }, [])

    const handleSearch = () => {
      if (searchText.length == 0) return;
      props.navigation.navigate("SearchWallpapers", {category: removeExtraSpaces(searchText)});
    }

    return (
        <View style={tw`flex-1 bg-[#f9fbfd]`}>
            <View style={tw`w-full h-20 p-4`}>
                <TextInput style={tw`p-2 px-4 bg-gray-200 rounded-full text-gray-800 text-sm`}
                    placeholder="Search..." 
                    placeholderTextColor={"#6b7280"}
                    value={searchText}
                    onChangeText={(text)=>setSearchText(text)}
                    keyboardType="web-search"
                    onSubmitEditing={handleSearch}
                />
            </View>
        </View>
    )
}

export default Search;