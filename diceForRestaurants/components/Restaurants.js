import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View, ScrollView} from 'react-native';
import { List, ListItem ,CheckBox, ButtonGroup} from 'react-native-elements';
import {Container, Header, Body, Left, Right, Button, Picker, Item, Input, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as firebase from 'firebase';

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
            sortOrder: "",
            showOpenNow:false,
            searchPrice: "1",
            email:"kle11@illinois"
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
        this.add=this.add.bind(this);
        this.gotoList = this.gotoList.bind(this);
        this.searchByCategory = this.searchByCategory.bind(this);

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
        let tempOrder = 'best_match';
        if(this.props.navigation.getParam('sortOrder')){
            tempOrder = this.props.navigation.getParam('sortOrder')
        }
        let tempOpenNow = false;
        if(this.props.navigation.getParam('showOpenNow')){
            tempOpenNow = this.props.navigation.getParam('showOpenNow')
        }
        let tempPrice = "1";
        if(this.props.navigation.getParam('searchPrice')){
            tempPrice = this.props.navigation.getParam('searchPrice')
        }
        let tempEmail = "kle11@illinois";
        if(this.props.navigation.getParam('email')){
            tempEmail = this.props.navigation.getParam('email')
        }
        axios.get(`https://api.yelp.com/v3/businesses/search?term=`+tempContent+`&location=`+tempLocation+`&sort_by=`+tempOrder+`&open_now=`+tempOpenNow+`&price=`+tempPrice)
            .then((response) => {
                this.setState({
                    searchResult: response.data.businesses,
                    searchLocation:tempLocation,
                    searchContent: tempContent,
                    sortOrder: tempOrder,
                    showOpenNow: tempOpenNow,
                    searchPrice: tempPrice,
                    email: tempEmail
                });
            });
        let tempList = this.props.navigation.getParam('selectedList');
        firebase.database().ref('users/' + tempEmail).on('value', (snapshot)=> {
            // updateStarCount(postElement, snapshot.val());
            // console.log(tempEmail);
            console.log(tempList);
            console.log(snapshot.val());
            tempList = snapshot.val().list;
            this.setState({
                localList: tempList,
            });
            console.log(this.state.localList);

        });
    }

    add(item) {
        console.log(item);
        this.state.localList.push(item);
        // A post entry.
        var postData = {
            email: this.state.email,
            list: this.state.localList,
        };
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('users/'+this.state.email).push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['users/'+this.state.email] = postData;

        firebase.database().ref().update(updates);

        console.log(this.state.localList);
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'sortOrder': this.state.sortOrder, 'showOpenNow': this.state.showOpenNow , 'searchPrice': this.state.searchPrice , 'email': this.state.email });
    }

    gotoList(){
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'sortOrder': this.state.sortOrder, 'showOpenNow': this.state.showOpenNow, 'searchPrice': this.state.searchPrice , 'email': this.state.email });
    }
    searchByCategory(){
        this.props.navigation.replace('Restaurants', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'sortOrder': this.state.sortOrder, 'showOpenNow': this.state.showOpenNow, 'searchPrice': this.state.searchPrice , 'email': this.state.email });
    }
    sortChange(sortValue) {
        this.setState({
            sortOrder: sortValue,
        },this.displayChange);
    }
    displayChange(){
        axios.get(`https://api.yelp.com/v3/businesses/search?term=`+this.state.searchContent+`&location=`+this.state.searchLocation+`&sort_by=`+this.state.sortOrder+`&open_now=`+this.state.showOpenNow+`&price=`+this.state.searchPrice)
            .then(function(response){
                this.setState({
                    searchResult:response.data.businesses
                });
                console.log(this.state.searchResult);
            }.bind(this));
    }
    openNowChange(){
        this.setState({
            showOpenNow: !this.state.showOpenNow,
        },this.displayChange);
    }
    priceChange(selectedIndex){
        this.setState({
            searchPrice: selectedIndex
        },this.displayChange);
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
                    <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>
                        <Picker
                            style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}
                            mode={"dropdown"}
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="Sort by: "
                            selectedValue={this.state.sortOrder}
                            onValueChange={(itemValue, itemIndex) => this.sortChange(itemValue)}>
                            <Picker.Item label="Best Match" value = "best_match" />
                            <Picker.Item label="Rating" value = "rating" />
                            <Picker.Item label="Review Count" value = "review_count" />
                            <Picker.Item label="Distance" value = "distance" />
                        </Picker>
                        <CheckBox
                            containerStyle={{ marginLeft:40, padding: 0, backgroundColor: '#f3f3f3'}}
                            style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
                            center
                            title=' Open Now'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checkedColor='rgb(234, 195, 176)'
                            checked={this.state.showOpenNow}
                            onPress={() => this.openNowChange()}
                        />
                        <Picker
                            style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}
                            mode={"dropdown"}
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="Price: "
                            selectedValue={this.state.searchPrice}
                            onValueChange={(itemValue, itemIndex) => this.priceChange(itemValue)}>
                            <Picker.Item label="     $    " value = "1" />
                            <Picker.Item label="   $$   " value = "2" />
                            <Picker.Item label="   $$$ " value = "3" />
                            <Picker.Item label="  $$$$" value = "4" />
                        </Picker>


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
