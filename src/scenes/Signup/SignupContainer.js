import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import Signup from './Signup';
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

  register() {
    const { email, password } = this.state;
    if (!utils.validateEmail(email) || !utils.validatePassword(password)) {
      Alert.alert('Error', 'Please enter a valid email or password.');
      return;
    }

    this.setState({ loading: true });

    const userData = { email, password };

    this.app.service('users').create(userData).then((result) => {
      this.app.authenticate({
        type: 'local',
        email,
        password,
      }).then(response => {
        this.setState({ loading: false });
        // re-route to main authorized chat   component
        Actions.MainMenu({ type: ActionConst.RESET });
      }).catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Please enter a valid email or password.');
        this.setState({ loading: false });
      });
    }).catch((err) => {
      console.log('Err', err);
      this.setState({ loading: false });
      Alert.alert('Error', err.message);
    });
  }

  dismissKeyboard() {
    TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField());
  }

  close() {
    this.dismissKeyboard();
    Actions.pop();
  }

  renderSignupButton() {
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text>Creating account...</Text>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight
          style={[baseStyles.baseButton, baseStyles.buttonPrimary, { padding: 10 }]}
          onPress={() => this.register()}
          underlayColor="transparent"
        >
          <Text style={[baseStyles.baseButtonText, baseStyles.buttonPrimaryText]}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <Signup
        close={() => this.close()}
        emailBorder={this.state.emailBorder}
        passwordBorder={this.state.passwordBorder}
        onChangeEmail={email => this.onChangeEmail(email)}
        onChangePassword={pass => this.onChangePassword(pass)}
        password={this.state.password}
        email={this.state.email}
        dimissKeyboard={() => this.dismissKeyboard()}
        renderSignupButton={() => this.renderSignupButton()}
      />
    );
  }

}
