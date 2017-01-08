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
    const drawerStyles = { main: { shadowColor: "#000000", shadowOpacity: 0.3, shadowRadius: 2, elevation: 14, backgroundColor: '#fff' }, drawer: { backgroundColor: '#F1F1F1' } };
    return (
      <Drawer
        ref={(drawer) => { this.drawer = drawer; }}
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type="displace"
        content={<SideMenu app={this.app} />}
        styles={drawerStyles}
        tapToClose
        openDrawerOffset={0.6}
        panCloseMask={0.6}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
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
