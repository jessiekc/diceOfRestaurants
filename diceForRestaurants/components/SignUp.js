import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View, ScrollView, Button} from 'react-native';
import { List, ListItem, FormLabel, FormInput } from 'react-native-elements';
import {Container, Header, Body, Left, Right, Picker, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyA5pqB8xBxkHQljqj4yprd5TtIOeeDD3lo",
    authDomain: "diceforrestaurants.firebaseapp.com",
    databaseURL: "https://diceforrestaurants.firebaseio.com",
    projectId: "diceforrestaurants",
    storageBucket: "diceforrestaurants.appspot.com",
    messagingSenderId: "1048362502940"
});

export default class SignUp extends Component {
    /**
     * constructor for restaurant detail
     */
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
    }
    onLoginPress(){
        this.setState({error:'', loading: true});
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
                this.setState({error:'',loading:false});
                this.props.navigation.replace('Restaurants')
            })
            .catch(()=> {
                this.setState({error:'Authentication failed',loading:false});
            });
    }
    onSignupPress(){
        this.setState({error:'', loading: true});
        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                this.setState({error:'',loading:false});
                this.props.navagition.replace('Restaurants')
            })
            .catch(()=> {
                this.setState({error:'Authentication failed',loading:false});
            });
    }

    renderButtonOrLoading(){
        if(this.state.loading){
            return <Text> Loading </Text>
        }
        return <View>
            <Button onPress={this.onLoginPress.bind(this)} title={'Login'} ></Button>
            <Button onPress={this.onSignupPress.bind(this)} title='Sign Up'/>
            <Text>Button</Text>
        </View>
    }
    render(){
        return(

            <View>
                <FormLabel>
                    Email
                </FormLabel>
                <FormInput value = {this.state.email} onChangeText={email=> this.setState({email})}/>
                <FormLabel>
                    Password
                </FormLabel>
                <FormInput value = {this.state.password} onChangeText={password=> this.setState({password})}/>
                {this.renderButtonOrLoading()}

            </View>

        )
    }
}
