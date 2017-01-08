import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import SideMenu from './../../components/SideMenu';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }
  
  componentDidMount() {
    Actions.refresh({ key: 'MainMenu', ref: this.drawer });
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref={(drawer) => { this.drawer = drawer; }}
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type="static"
        content={<SideMenu app={this.app}/>}
        tapToClose
        tweenHandler={Drawer.tweenPresets.parallax}
        openDrawerOffset={0.6}
        tweenDuration={150}
        panCloseMask={0.8}
        negotiatePan
        tweenEasing="easeInOutBounce"
        /* tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}*/
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

SideDrawer.propTypes = {
  navigationState: PropTypes.object,
  onNavigate: PropTypes.func,
};

export default SideDrawer;
