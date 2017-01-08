import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Login from './Login';
import baseStyles from './../../config/baseStyles';
import utils from './../../utils';

// import Spinner from "../Spinner"
// import Alert from "../../../alert"

export default class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      emailBorder: 'transparent',
      passwordBorder: 'transparent',
      email: '',
      password: '',
      loading: false,
    };
  }

  onChangeEmail(text) {
    this.setState({
      email: text,
      emailBorder: utils.validateEmail(text) ? 'transparent' : '#FFC200',
    });
  }

  onChangePassword(text) {
    this.setState({
      password: text,
      passwordBorder: utils.validatePassword(text) ? 'transparent' : '#FFC200',
    });
  }

  login() {
    if (!utils.validateEmail(this.state.email) || !utils.validatePassword(this.state.password)) {
      Alert.alert('Error', 'Please enter a valid email or password.');
      return;
    }

    this.setState({ loading: true });

    this.app.authenticate({
      type: 'local',
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      this.setState({ loading: false });
      // re-route to chat app
      Actions.main();
    }).catch((error) => {
      console.log('ERROR', error);
      Alert.alert('Error', 'Please enter a valid email or password.');
      this.setState({ loading: false });
    });
  }

  dismissKeyboard() {
    TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField());
  }

  close() {
    this.dismissKeyboard();
    Actions.pop();
  }

  renderLoginButton() {
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text>Logging in...</Text>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight
          style={[baseStyles.baseButton, baseStyles.buttonPrimary, { padding: 10 }]}
          onPress={() => this.login()}
          underlayColor="transparent"
        >
          <Text style={[baseStyles.baseButtonText, baseStyles.buttonPrimaryText]}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <Login
        close={() => this.close()}
        emailBorder={this.state.emailBorder}
        passwordBorder={this.state.passwordBorder}
        onChangeEmail={email => this.onChangeEmail(email)}
        onChangePassword={pass => this.onChangePassword(pass)}
        password={this.state.password}
        email={this.state.email}
        dimissKeyboard={() => this.dismissKeyboard()}
        renderLoginButton={() => this.renderLoginButton()}
      />
    );
  }

}
