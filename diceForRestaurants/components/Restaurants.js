import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View, ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left, Right, Button, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

token="FssaySoD_y-Ey_-kuN141a_nedlgL1KXTGw1QeLGmxKyciYFX4-bswEJgVC9lXa1JJep4hr5H0cZ-8p82h2R7mmkuscNz_ST8-ycmS44EqQ2U8PghgFaJVKxtzPqW3Yx";

export default class Restaurants extends Component {
    /**
     * constructor for restaurants
     */
    constructor() {
        super();
        this.state = {
            searchResult:[],
            localList: [],
            iconName: "add",
            searchContent: "",
            searchLocation: "",
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
    }
    /**
     * function to fetch data from yelp api
     */
    componentDidMount() {
        let tempContent = 'restaurants';
        if(this.props.navigation.getParam('searchContent')){
            tempContent = this.props.navigation.getParam('searchContent')
        }
        let tempLocation = '60612';
        if(this.props.navigation.getParam('searchLocation')){
            tempLocation = this.props.navigation.getParam('searchLocation')
        }
        let tempList =[];
        if(this.props.navigation.getParam('selectedList')){
            tempList = this.props.navigation.getParam('selectedList');
        }
        console.log(this.props.navigation.getParam('selectedList'));
        axios.get(`https://api.yelp.com/v3/businesses/search?term=`+tempContent+`&location=`+tempContent)
            .then((response) => {
                this.setState({
                    searchResult: response.data.businesses,
                    localList: tempList,
                    searchLocation:tempLocation,
                    searchContent: tempContent,
                });
            });
    }

    add(item) {
        console.log(item);
        this.state.localList.push(item);
        console.log(this.state.localList);
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation });
    }

    gotoList(){
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation });
    }
    searchByCategory(){
        this.props.navigation.replace('Restaurants', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation });
    }
    render() {
        return (
            <View>
                <Header>
                    <Left>
                        <Icon
                            name={"ios-list-box"}
                            onPress={()=>this.gotoList()} size={35}
                            style={{marginLeft:10, marginTop:4}}
                        />
                    </Left>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 25}}>Restaurants</Text>
                    </Body>
                    <Right/>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <View >
                        <View searchBar style={{flex: 1, alignItems: 'auto', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>
                            <Item>
                                <Icon name="ios-search" style={{ fontSize: 25,padding:10 }} />
                                <Input style={{borderColor: '#ffffff',borderWidth:1}} placeholder={this.state.searchContent} onChangeText={(text) => this.setState({searchContent: text})}/>
                                <Input style={{borderColor: '#ffffff',borderWidth:1}} placeholder={this.state.searchLocation} onChangeText={(text) => this.setState({searchLocation: text})}/>
                                <Button transparent onPress={()=>this.searchByCategory()} >
                                    <Text>Search</Text>
                                </Button>
                            </Item>
                        </View>
                    </View>
                    <List>
                        <FlatList
                            data={this.state.searchResult}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ListItem
                                    title ={item.name}
                                    avatar={{uri: item.image_url}}
                                    onPress={()=>this.add(item)}
                                    rightIcon={{name: this.state.iconName}}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
