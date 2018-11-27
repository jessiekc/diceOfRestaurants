
import React, {Component} from 'react';
import {Platform , FlatList, Linking, Dimensions, View, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LocalList extends Component {
    /**
     * constructor for local list
     */
    constructor() {
        super();
        this.state = {
            localList:[],
            iconName:"remove-circle",
            searchContent: "",
            searchLocation: "",
        }
        // this.onPress = this.onPress.bind(this);
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        // let listPassed = '';
        // if(this.props.navigation.getParam('selectedList')){
        //     listPassed =
        // }
        let tempContent = 'restaurants';
        if(this.props.navigation.getParam('searchContent')){
            tempContent = this.props.navigation.getParam('searchContent')
        }
        let tempLocation = '60612';
        if(this.props.navigation.getParam('searchLocation')){
            tempLocation = this.props.navigation.getParam('searchLocation')
        }
        console.log("3888888")
        console.log(tempLocation);
        this.setState({
            localList: this.props.navigation.getParam('selectedList'),
            searchContent: tempContent,
            searchLocation: tempLocation,
        });

    }
    onPress() {

        this.props.navigation.replace('Restaurants', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation });
    }
    delete(item) {
        this.state.localList.splice(this.state.localList.indexOf(item), 1 );
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation });
    }
    showRestaurantInfo(){
        // Linking.openURL(this.state.localList[0].url);
        this.props.navigation.push('RestaurantDetail', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'selectedID':this.state.localList[0].id});
    }
    render() {
        return (
            <View >
                <Header>
                    <Left>
                        <Icon
                            name={"ios-add-circle"}
                            onPress={()=>this.onPress()} size={35}
                            style={{marginLeft:10, marginTop:4}}/>
                    </Left>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 25}}>List</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={{flexDirection: 'column', justifyContent: 'space-between',alignItems:'center'}}>

                    <View style={{ height: (Dimensions.get('window').height-220), width:Dimensions.get('window').width}}>
                        <List >
                            <FlatList
                                data={this.state.localList}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <ListItem
                                        title ={item.name}
                                        avatar={{uri: item.image_url}}
                                        onPress={()=>this.delete(item)}
                                        rightIcon={{name: this.state.iconName}}
                                    />
                                )}
                            />
                        </List>
                    </View>
                    <View style={{ flex:1}}>
                        <Button rounded primary onPress={() => this.showRestaurantInfo()}>
                            <Text>Roll the dice!</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}