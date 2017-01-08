import React, { PropTypes } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import baseStyles from './../../config/baseStyles';

const Login = props => (
  <TouchableWithoutFeedback onPress={props.dimissKeyboard}>
    <View style={baseStyles.container}>
      <TouchableHighlight
        onPress={props.close}
        underlayColor="transparent"
        style={[baseStyles.backButtonContainer]}
      >
        <Icon name="ios-close-circle" size={30} color="#333" />
      </TouchableHighlight>
      <Text style={baseStyles.welcomeText}>WELCOME BACK</Text>

      <View style={baseStyles.inputs}>
        <View style={baseStyles.inputContainer}>

          <TextInput
            style={[baseStyles.input, baseStyles.greyFont, { borderWidth: 1, borderColor: props.emailBorder }]}
            autoFocus
            placeholder="Email"
            placeholderTextColor="#AAA"
            autoCorrect={false}
            autoCapitalize="none"
            keyBoardType="email-address"
            returnKeyType="next"
            value={props.email}
            onChangeText={props.onChangeEmail}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
          />
        </View>
        <View style={baseStyles.inputContainer}>
          <TextInput
            secureTextEntry
            style={[baseStyles.input, baseStyles.greyFont, { borderWidth: 1, borderColor: props.passwordBorder }]}
            placeholder="Password"
            placeholderTextColor="#AAA"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="send"
            value={props.password}
            onChangeText={props.onChangePassword}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
          />
        </View>
        {props.renderLoginButton()}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  emailBorder: PropTypes.string,
  passwordBorder: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  dimissKeyboard: PropTypes.func,
  renderLoginButton: PropTypes.func,
  close: PropTypes.func,
};

export default Login;
