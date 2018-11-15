import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View} from 'react-native';
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
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
    }
    /**
     * function to fetch data from yelp api
     */
    componentDidMount() {
        let tempList =[];
        if(this.props.navigation.getParam('selectedList')){
            tempList = this.props.navigation.getParam('selectedList');
        }
        console.log("32");
        console.log(this.props.navigation.getParam('selectedList'));
        axios.get("https://api.yelp.com/v3/businesses/search?term=restaurants&location=60612")
            .then((response) => {
                console.log(response.data);
                this.setState({
                    searchResult: response.data.businesses,
                    localList: tempList
                });
                console.log(this.state.searchResult);
            });
    }

    add(item) {
        console.log(item);
        this.state.localList.push(item);
        console.log(this.state.localList);
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList});
    }

    gotoList(){
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList});
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
            </View>
        );
    }
}
