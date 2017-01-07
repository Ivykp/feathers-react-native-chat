import React, { Component } from 'react';
import {
  Actions,
  ActionConst,
  Scene,
  Router,
} from 'react-native-router-flux';
import {
  AsyncStorage,
  Navigator,
  Platform,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import base styles
import { colors } from './config/baseStyles';

// Import scenes
import Launch from './scenes/Launch';
import Login from './scenes/Login';
import Signup from './scenes/Signup';
import Chat from './scenes/Chat';
import Offline from './scenes/Offline';

// Import components
import SideDrawer from './scenes/SideDrawer';

const { FloatFromRight, FloatFromBottom, FadeAndroid } = Navigator;

class App extends Component {
  constructor(props) {
    super(props);
    this.app = null;
    this.state = {
      connected: true,
    };

    this.renderLeftButton = this.renderLeftButton.bind(this);
  }

  renderLeftButton() {
    if (this.state.connected) {
      return (
        <TouchableHighlight
          onPress={() => Actions.get('drawer').ref.toggle()}
          underlayColor="transparent"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginLeft: 0, width: 50, height: 50 }}>
          <Icon name="ios-menu" size={36} color={colors.accentColor} />
        </TouchableHighlight>

      );
    }

    return <View />;
  }

  render() {
    return (
      <Router>
        {/*<Scene
          key="launch"
          component={Launch}
          wrapRouter
          title="Launch"
          initial={this.state.connected}
        />*/}
        <Scene key="drawer" component={SideDrawer} type={ActionConst.RESET}>
          <Scene key="mainContainer" tabs={false}>
            <Scene
              component={Chat}
              key="chat"
              title="Chat"
              app={this.app} events={this.eventEmitter}
              renderLeftButton={this.renderLeftButton}
            />
            <Scene
              component={Chat}
              key="directMessage"
              title="Direct Message"
              renderLeftButton={this.renderLeftButton}
            />
          </Scene>
        </Scene>

        <Scene key="login" component={Login} title="Login" schema="modal" app={this.app} />
        <Scene key="signup" component={Signup} title="Signup" schema="modal" app={this.app} />
        <Scene
          key="offline"
          component={Offline}
          title="Offline"
          schema="boot"
          app={this.app}
          initial={!this.state.connected}
        />
      </Router>
    );
  }
}

export default App;
