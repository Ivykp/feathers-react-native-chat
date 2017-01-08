import React from 'react';
import { Text, View, ListView, TouchableHighlight, Image } from 'react-native';

import styles from './styles';
import baseStyles from './../../config/baseStyles';

const PLACEHOLDER = 'https://raw.githubusercontent.com/feathersjs/feathers-chat/master/public/placeholder.png';

const SideMenu = (props) => {
  const nOnline = props.onlineUserCount;

  const onlinePhrase = {
    [nOnline]: `${nOnline} people registered`,
    0: 'You\'re all alone :-(',
    1: `${nOnline} person registered`,
  };

  return (
    <View style={[{ marginTop: 0, flex: 1 }, styles.drawer]}>
      <View style={styles.userCountContainer}>
        <Text style={styles.userCount}>{onlinePhrase[nOnline]}</Text>
      </View>
      <ListView
        keyboardShouldPersistTaps="always"
        enableEmptySections
        dataSource={props.ds.cloneWithRows(props.data)}
        style={{ padding: 10, flex: 0.85 }}
        renderRow={(user, sectionID, rowID) => (

          <TouchableHighlight onPress={() => props.onRowPress(user, sectionID, rowID)}>
            <View style={styles.userContainer}>
              <Image source={{ uri: user.avatar || PLACEHOLDER }} style={styles.avatar} />
              <Text style={styles.username}>
                {user.username}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />

      <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight style={[baseStyles.baseButton, baseStyles.buttonPrimary, { width: 120, padding: 0 }]} onPress={props.signOut}>
          <Text style={[baseStyles.baseButtonText, baseStyles.buttonPrimaryText, { fontSize: 14, fontWeight: '600' }]}>Sign Out</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

SideMenu.propTypes = {
  signOut: React.PropTypes.func,
  data: React.PropTypes.array,
  onlineUserCount: React.PropTypes.number,
  onRowPress: React.PropTypes.func,
  ds: React.PropTypes.instanceOf(ListView.DataSource),
};

export default SideMenu;
