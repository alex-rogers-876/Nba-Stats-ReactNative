import React from "react"
import { observer, inject } from "mobx-react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import  {ShopStore}  from "../stores/ShopStore"
import SVGImage from 'react-native-svg-image';
import Image from 'react-native-remote-svg'

  const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 65,
    paddingTop: '56.25%', // 16:9
  },
};
debugger
const shop = ShopStore.create()

const Team = observer(() => (
  <View style={{ flexDirection: 'row'}}>
  <ScrollView style={{flex:1}}>

  {shop.getTeams.map(book => <BookEntry key={book.TEAM_ID} book={book} />)}

  </ScrollView>
  </View>
))
onPress = () => {
  const { navigate } = this.props.navigation;
    navigate('Home', { shop: shop })

}

const BookEntry = 

  observer(({ book, shop }) => (
    <TouchableOpacity onPress={this.onPress}> 
<View style={{flex:1}}>
    <Image source={{uri: book.photoUrl}}
    style={{justifyContent: 'flex-end', width: 50, height: 50}} />
</View>
</TouchableOpacity>
  ))

export default Team