import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions, StatusBar, TouchableOpacity} from "react-native";
import { Icon } from 'react-native-elements';

const App = () => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const apiUrl =
    "https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100";

  useEffect(() => {
    fetchData();
  }, []);

  const handleLikePress = () => {

    setIsLiked(!isLiked);
    console.log('Like button pressed');
    
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      // console.log(result.object);
      let objectArr = [];
      objectArr = result.object;
      for (let i = 0; i < objectArr.length; i++) {
      }
      setData(objectArr);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderCard = ({ item }) => (
    
    <View style={styles.card} >
      <View>
      <TouchableOpacity onPress={handleLikePress} style={{ zIndex:1, position: 'absolute', top: 10, right: 5 }}>
      <Icon
        name={isLiked ? 'heart' : 'heart-o'}
        type="font-awesome"
        color={isLiked ? 'red' : 'black'}
        onPress={handleLikePress}
      />
      </TouchableOpacity>
      <Image source={{uri: item.mediaUrl}} style={styles.img}/>

      </View>
      
      <Text style={{fontWeight: 'bold'}} >{item.name}</Text>
      <Text>Rating: {item.rating}</Text> 
      <Text>Price: ${item.variants[0].sellingPrice}</Text>
      <Text style={{textDecorationLine:'line-through'}} >Price: ${item.variants[0].mrp}</Text>  
      <Text>Size: {item.variants[0].variant}</Text> 
    </View>

  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="orange" />
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  card: {
    width: Dimensions.get('window').width/2-25,
    height:200,
    borderRadius:10,
    borderColor:'#f7bbb',
    margin:5,
    marginBottom:90,
    marginTop:5
  },
  img:{
    width: 160,
    height: 180,
    borderRadius:10
  }
});

export default App;