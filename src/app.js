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
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';

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

import settings from './config/settings';

if (!global._babelPolyfill) { require('babel-polyfill'); }
const io = require('socket.io-client');


const { FloatFromRight, FloatFromBottom, FadeAndroid } = Navigator;

const styles = StyleSheet.create({
  navBar: {
    height: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
  navTitle: {
    color: 'grey',
  },
  routerScene: {
    // Some navbar padding to avoid content overlap
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight - 2,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };

    this.renderLeftButton = this.renderLeftButton.bind(this);

    const options = { transports: ['websocket'], forceNew: true };
    const socket = io(settings.server, options);

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      // Use AsyncStorage to store our login token
      .configure(authentication({
        storage: AsyncStorage,
      }));
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.app.io.on('connect', () => {
      this.setState({ connected: true });

      this.app.authenticate().then(() => {
        this.setState({ loading: false });
        Actions.MainMenu();
      }).catch((err) => {
        console.log('Error:', err);
        this.setState({ loading: false });
        Actions.launch();
      });
    });

    this.app.io.on('disconnect', () => {
      this.setState({ connected: false });
      Actions.offline();
    });
  }

  renderLeftButton() {
    if (this.state.connected) {
      return (
        <TouchableHighlight
          onPress={() => { console.log('click'); return Actions.get('MainMenu').ref.toggle()}}
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
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
      >
        <Scene
          key="launch"
          component={Launch}
          wrapRouter
          hideNavBar
          title="Launch"
          initial={this.state.connected}
        />
        <Scene key="MainMenu" component={SideDrawer} type={ActionConst.RESET} app={this.app}>
          <Scene key="mainContainer" tabs={false}>
            <Scene
              component={Chat}
              key="chat"
              title="Chat"
              app={this.app} events={this.eventEmitter}
              renderLeftButton={this.renderLeftButton}
              sceneStyle={styles.routerScene}
            />
            <Scene
              component={Chat}
              key="directMessage"
              title="Direct Message"
              renderLeftButton={this.renderLeftButton}
            />
          </Scene>
        </Scene>

        <Scene key="login" component={Login} title="Login" app={this.app} />
        <Scene key="signup" component={Signup} title="Signup" app={this.app} />
        <Scene
          key="offline"
          component={Offline}
          title="Offline"
          app={this.app}
          direction="fade"
          initial={!this.state.connected}
          type={ActionConst.RESET}
        />
      </Router>
    );
  }
}

export default App;
