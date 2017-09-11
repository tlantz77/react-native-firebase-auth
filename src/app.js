import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
        apiKey: "AIzaSyChXoGzIWaK13Ot_dSb-zfJFwdwx3X6p0o",
        authDomain: "react-auth-bed8d.firebaseapp.com",
        databaseURL: "https://react-auth-bed8d.firebaseio.com",
        projectId: "react-auth-bed8d",
        storageBucket: "react-auth-bed8d.appspot.com",
        messagingSenderId: "9296900460"
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
