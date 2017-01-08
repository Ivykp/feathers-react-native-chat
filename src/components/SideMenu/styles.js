import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center',
  },
  userCount: {
    marginVertical: 5,
    color: '#777',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  userCountContainer: {
    marginTop: Platform.OS === 'ios' ? 25 : 0,
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '400',
    padding: 5,
    color: '#333',
    height: 24,
    marginLeft: 5,
  },
  drawerMain: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 14,
  },
  drawer: {
    backgroundColor: '#F1F1F1',
  },
});

export default styles;
