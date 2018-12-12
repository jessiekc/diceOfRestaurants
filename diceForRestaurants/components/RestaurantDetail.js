import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View, ScrollView, Image, Linking, Dimensions} from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left, Right, Button, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryPie, VictoryGroup, VictoryCandlestick } from 'victory-native';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
//reference: https://www.youtube.com/watch?v=9g_73wEbX8E&t=505s


var {width, height} = Dimensions.get('window');
export default class RestaurantDetail extends Component {
    /**
     * constructor for restaurant detail
     */
    constructor() {
        super();
        this.state = {
            searchResult:[],
            localList: [],
            iconName: "add",
            searchContent: "",
            searchLocation: "",
            restaurantAddress: "",
            restaurantPhotos: [],
            restaurantRate:1,
            hours:[],
            reviews:[],
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+"FssaySoD_y-Ey_-kuN141a_nedlgL1KXTGw1QeLGmxKyciYFX4-bswEJgVC9lXa1JJep4hr5H0cZ-8p82h2R7mmkuscNz_ST8-ycmS44EqQ2U8PghgFaJVKxtzPqW3Yx";
        this.renderSection=this.renderSection.bind(this);
        this.renderSectionOne = this.renderSectionOne.bind(this);
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
        let tempID="";
        if(this.props.navigation.getParam('selectedID')){
            tempID = this.props.navigation.getParam('selectedID');
        }
        console.log(tempID);
        axios.get(`https://api.yelp.com/v3/businesses/`+tempID)
            .then((response) => {
                this.setState({
                    searchResult: response.data,
                    localList: tempList,
                    searchLocation:tempLocation,
                    searchContent: tempContent,
                    restaurantAddress: response.data.location.display_address.toString(),
                    restaurantPhotos: response.data.photos,
                    restaurantRate: response.data.rating,

                });
                if(response.data.hours){
                    this.setState({
                        hours:[
                            {x: "Sun.", open: response.data.hours[0].open[0].start/100, close: response.data.hours[0].open[0].end/100, high: response.data.hours[0].open[0].end/100, low: response.data.hours[0].open[0].start/100},
                            {x: "Mon.", open: response.data.hours[0].open[1].start/100, close: response.data.hours[0].open[1].end/100, high: response.data.hours[0].open[1].end/100, low: response.data.hours[0].open[1].start/100},
                            {x: "Tue.",  open: response.data.hours[0].open[2].start/100, close: response.data.hours[0].open[2].end/100, high: response.data.hours[0].open[2].end/100, low: response.data.hours[0].open[2].start/100},
                            {x: "Wed.",  open: response.data.hours[0].open[3].start/100, close: response.data.hours[0].open[3].end/100, high: response.data.hours[0].open[3].end/100, low: response.data.hours[0].open[3].start/100},
                            {x: "Thur.", open: response.data.hours[0].open[4].start/100, close: response.data.hours[0].open[4].end/100, high: response.data.hours[0].open[4].end/100, low: response.data.hours[0].open[4].start/100},
                            {x: "Fri.",  open: response.data.hours[0].open[5].start/100, close: response.data.hours[0].open[5].end/100, high: response.data.hours[0].open[5].end/100, low: response.data.hours[0].open[5].start/100},
                            {x: "Sat.",  open: response.data.hours[0].open[6].start/100, close: response.data.hours[0].open[6].end/100, high: response.data.hours[0].open[6].end/100, low: response.data.hours[0].open[6].start/100}]
                    })
                }
                console.log("1234");
                console.log(response.data);
                console.log(this.state.hours);

            });
        axios.get(`https://api.yelp.com/v3/businesses/`+tempID+`/reviews`)
            .then((response) => {
                this.setState({
                    reviews: response.data.reviews
                });
                console.log("1234");
                console.log(response.data);
                console.log(this.state.hours);

            });
    }
    renderSectionOne = () =>{
        return this.state.restaurantPhotos.map((image, index)=>{
            return(
                <View key={index} style = {[{width:((width)/3)},{height:(width)/3}, index%3!==0?{paddingLeft:2}:{paddingLeft:0},{marginBottom: 2}]}>
                    <Image style = {{flex:1, width:undefined, height: undefined}} source={{uri:image}}>

                    </Image>
                </View>
            )
        })
    }

    renderSection = () =>{
        console.log(this.state.searchResult);
        console.log("1234");

        return(
            <View style = {{flexDirection:'row', flexWrap: 'wrap', marginTop: 20}}>
                {this.renderSectionOne()}

            </View>
        )
    }

    render() {
        return (
                <ScrollView style={{backgroundColor:"white"}}>
                    <View style={{flexDirection: 'row', paddingTop:20, marginBottom: 10}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image
                                style={{width:75, height: 75, borderRadius: 37.5}}
                                source={{uri: this.state.searchResult.image_url}}
                            />
                        </View>
                        <View style = {{flex: 3}}>
                            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 15, color: 'grey'}}>
                                        Price
                                    </Text>
                                    <Text>{this.state.searchResult.price}</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 15, color: 'grey'}}>
                                        Open Now
                                    </Text>
                                    <Text>{(!this.state.searchResult.is_closed).toString()}</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 15, color: 'grey'}}>
                                        Review
                                    </Text>
                                    <Text>{this.state.searchResult.review_count}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Button bordered dark
                                        onPress={() => { Linking.openURL(this.state.searchResult.url) }}
                                    style = {{flex:4, marginHorizontal: 10, marginVertical: 10,  justifyContent:'center', height: 30}}>
                                    <Text style={{fontSize: 15, color: 'black'}}>Go to the Website</Text>
                                </Button>

                            </View>

                        </View>
                    </View>
                    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
                        <Text style = {{fontWeight: 'bold'}}>{this.state.searchResult.name}</Text>
                        <Text>{this.state.searchResult.display_phone}</Text>
                        <Text>{this.state.restaurantAddress}</Text>
                        <Rating
                            type='star'
                            ratingColor='#f1c40f'
                            ratingBackgroundColor='white'
                            emptyStarColor={'#f1c40f'}
                            imageSize={20}
                            startingValue={this.state.restaurantRate}
                        />
                    </View>
                    {this.renderSection()}
                    <List>
                        <FlatList
                            data={this.state.reviews}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ListItem
                                    title ={item.user.name}
                                    avatar={{uri: item.user.image_url}}
                                    subtitle = {item.text}
                                    onPress={() => { Linking.openURL(item.url) }}
                                />
                            )}
                        />
                    </List>
                    <View>
                        <VictoryChart
                            theme={VictoryTheme.grayscale}
                            domainPadding={{ x: 25 }}
                        >
                        <VictoryCandlestick
                            style={{
                                data: {fill: "rgb(234, 195, 176)"},
                                labels: {fontSize: 12},
                                parent: {border: "1px solid #ccc"}
                            }}
                            labels={(d) => `${d.open} - ${d.close}`}
                            data={this.state.hours}
                            domain={{y: [0, 24]}}
                        />
                        </VictoryChart>
                    </View>

                </ScrollView>
        );
    }
}
