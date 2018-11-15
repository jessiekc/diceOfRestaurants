
import React, {Component} from 'react';
import {Platform , FlatList, View} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LocalList extends Component {
    /**
     * constructor for person profile
     */
    constructor() {
        super();
        this.state = {
            localList:[],
            iconName:"remove-circle"
        }
        this.onPress = this.onPress.bind(this);
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        // let listPassed = '';
        // if(this.props.navigation.getParam('selectedList')){
        //     listPassed =
        // }
        console.log(this.props.navigation.getParam('selectedList'));

        this.setState({
            localList: this.props.navigation.getParam('selectedList')
        });
        console.log(this.state.localList);
    }

    onPress() {
        console.log("here");
        this.props.navigation.replace('Restaurants', {'selectedList': this.state.localList});
    }
    delete(item) {
        console.log(item);
        // this.state.localList.pop(item);
        this.state.localList.splice(this.state.localList.indexOf(item), 1 );
        console.log(this.state.localList);
        this.props.navigation.replace('LocalList', {'selectedList': this.state.localList});
    }

    render() {
        return (
            <View>
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
                <List>
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
        );
    }
}