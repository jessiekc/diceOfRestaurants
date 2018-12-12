import React, {Component} from 'react';
import {StyleSheet, Platform , FlatList, View, ScrollView, Button, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import { List, ListItem, FormLabel, FormInput } from 'react-native-elements';
import {Container, Header, Body, Left, Right, Picker, Item, Input, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// https://www.youtube.com/watch?v=4TruGz_JVp8
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
        this.onLoginPress = this.onLoginPress.bind(this);
        this.onSignupPress = this.onSignupPress.bind(this);
    }
    onLoginPress(){
        this.setState({error:'', loading: true});
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
                this.setState({error:'',loading:false});
                this.props.navigation.replace('Restaurants', {'email': this.state.email.split(".")[0]})
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
                var tempString = 'users/'+email.split(".")[0];
                firebase.database().ref(tempString).set({
                    email: email,
                    list: []
                });
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
        </View>
    }
    render(){
        const Divider = (props) => {
            return <View {...props}>
                <View style={styles.line}></View>
                <Text style={styles.textOR}>OR</Text>
                <View style={styles.line}></View>
            </View>
        }
        return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.up}>
                    <Ionicons
                        name="ios-pizza"
                        size={100}
                        color={'rgb(221, 97, 97)'}>
                    </Ionicons>
                    <Text style={styles.title}>
                        Welcome to Dice for Restaurant
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            placeholder="Enter your email"
                            value={this.state.email}
                            onChangeText={email=> this.setState({email})}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value = {this.state.password}
                            onChangeText={password=> this.setState({password})}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={this.onLoginPress.bind(this)}>
                        <Text style={styles.loginButtonTitle}>LOGIN</Text>
                    </TouchableOpacity>
                    <Divider style={styles.divider}></Divider>
                    <TouchableOpacity style={styles.signupButton} onPress={this.onSignupPress.bind(this)}>
                        <Text style={styles.signupButtonTitle}>SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgb(234, 195, 176)'
    },
    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    down: {
        flex: 7,//70% of column
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        color: 'rgb(249, 238, 238)',
        textAlign: 'center',
        width: 400,
        fontSize: 23
    },
    textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'//a = alpha = opacity
    },
    textInput: {
        width: 280,
        height: 45
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)'
    },
    signupButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(249, 238, 238)'
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white'
    },
    signupButtonTitle: {
        fontSize: 18,
        color: 'rgb(221, 97, 97)'
    },
    line: {
        height: 1,
        flex: 2,
        backgroundColor: 'black'
    },
    textOR: {
        flex: 1,
        textAlign: 'center'
    },
    divider: {
        flexDirection: 'row',
        height: 40,
        width: 298,
        justifyContent: 'center',
        alignItems: 'center'
    }
})