import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

export default class App extends Component {
    state = {
      data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          selected: false
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          selected: false
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          selected: false
        }
      ],
    }
  
  onSelect(id){
    let data = this.state.data.map((item) => {
      if (item.id === id ){
        item.selected = !item.selected;
      }
      return item;
    })
    this.setState({
      data: data
    })
  }

  onDelete(id){
    let data = this.state.data.filter((item) => {
      return item.id !== id;
    })
    this.setState({
      data: data
    })
  }

  onAdd(id){
    let newItem = {
      id: "test" + Math.random()*10,
      title: 'New Item',
      selected: false
    }

    this.state.data.push(newItem);
    alert(this.state.data.length)

    let data = this.state.data.map(item=>item);
    this.setState({
      data: data
    })
  }

  render() {
    return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.appContainer}>
        <View style={styles.container}>
          <Text>TO DO LIST</Text>
          <FlatList style={styles.flatList} data={this.state.data} renderItem={({item}) => (          
          <Item
            id={item.id}
            title={item.title}
            selected={item.selected}
            onSelect={this.onSelect.bind(this)}
            onDelete={this.onDelete.bind(this)}
          />)}
          keyExtractor={item => item.id}
          />
          <Button style={styles.button} onPress={() => this.onAdd()} title="ADD"/>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}

const Item = ({ id, title, selected, onSelect, onDelete }) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'},
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Button style={styles.deleteButton} color="red" onPress={() => onDelete(id)} title="Delete"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1
  },
  safeAreaContainer:{
    flex:1
  },
  flatList:{
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    backgroundColor: '#24C634',
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
});
