import { View, Text, TouchableOpacity, Image } from "react-native"
import tw from "twrnc";
import SearchIcon from "../assets/icons/search.png"

export function HomeNavbar() {
    return (
        <View style={tw`w-full h-16 bg-[#fff] p-4 flex flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-medium text-slate-800`}>Home</Text>
        <TouchableOpacity style={tw`p-1 rounded-md`} activeOpacity={1}>
          <Image source={SearchIcon} style={tw`w-7 h-7 mt-1`} />
        </TouchableOpacity>
      </View>
    )
}