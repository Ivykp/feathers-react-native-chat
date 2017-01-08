import React from 'react';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SideMenu from './SideMenu';

class SideMenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.app = props.app;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      onlineUsersCount: 0,
      users: [],
    };
  }

  componentDidMount() {
    console.log('Mounting...');
    const query = {
      query: {
        // online: true,
        _id: { $nin: [this.app.get('user')._id] },
        $limit: 25,
      },
    };

    this.app.service('users')
      .find(query)
      .then((result) => {
        this.setState({
          onlineUserCount: result.total,
          users: result.data,
        });
      })
      .catch(error => console.log('Error:', error));
  }

  onRowPress(user, sectionID, rowID) {
    console.log(user);
    // TODO: Implement direct message functionality
    // Actions.directMessage({user: user, title: user.name});
    // this.openDrawer();
  }

  signOut() {
    this.app.logout();
    Actions.launch();
  }

  render() {
    return (
      <SideMenu
        onlineUserCount={this.state.onlineUsersCount}
        data={this.state.users}
        ds={this.ds}
        onRowPress={(user, sectionID, rowID) => this.onRowPress(user, sectionID, rowID)}
        signOut={() => this.signOut()}
      />
    );
  }
}

export default SideMenuContainer;
