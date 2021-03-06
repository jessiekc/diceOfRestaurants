
import React, {Component} from 'react';
import {Platform , FlatList, Linking, Dimensions, View, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

// Get a reference to the database service

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
            sortOrder: "",
            showOpenNow:false,
            searchPrice:"1",
            email:"kle11@illinois",

        }
        this.onPress = this.onPress.bind(this);
        this.delete = this.delete.bind(this);
        this.showRestaurantInfo = this.showRestaurantInfo.bind(this);
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        // let listPassed = '';
        // if(this.props.navigation.getParam('selectedList')){
        //     listPassed =
        // }
        // var userId = firebase.auth().currentUser.uid;
        // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        //     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        //     // ...
        // });
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
        let tempList = this.props.navigation.getParam('selectedList');
        firebase.database().ref('users/' + tempEmail).on('value', (snapshot)=> {
            // updateStarCount(postElement, snapshot.val());
            tempList = snapshot.val().list;
            this.setState({
                localList: tempList,
                searchContent: tempContent,
                searchLocation: tempLocation,
                sortOrder: tempOrder,
                showOpenNow: tempOpenNow,
                searchPrice: tempPrice,
                email: tempEmail
            });
        });

    }
    onPress() {
        this.props.navigation.replace('Restaurants', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation , 'sortOrder': this.state.sortOrder, 'showOpenNow': this.state.showOpenNow, 'searchPrice': this.state.searchPrice, 'email': this.state.email });
    }
    delete(item) {
        this.state.localList.splice(this.state.localList.indexOf(item), 1 );
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
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'sortOrder': this.state.sortOrder, 'showOpenNow': this.state.showOpenNow, 'searchPrice': this.state.searchPrice, 'email': this.state.email  });
    }
    showRestaurantInfo(){
        let randomid=this.state.localList[Math.floor(this.state.localList.length*Math.random())].id;
        this.props.navigation.push('RestaurantDetail', {'selectedList': this.state.localList, 'searchContent': this.state.searchContent, 'searchLocation': this.state.searchLocation, 'selectedID': randomid, 'showOpenNow': this.state.showOpenNow, 'searchPrice': this.state.searchPrice, 'email': this.state.email });
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
                        <Button style={{backgroundColor:"rgb(234, 195, 176)"}}rounded primary onPress={() => this.showRestaurantInfo()}>
                            <Text>Roll the dice!</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}