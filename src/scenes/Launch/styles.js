import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  appName: {
    marginTop: 3,
    fontSize: 44,
    color: 'black',
    // fontFamily: 'HelveticaNeue-Thin',
    fontWeight: '200',
  },
  tagLine: {
    marginTop: 40,
    fontSize: 20,
    // fontFamily: 'HelveticaNeue-Thin',
    fontWeight: '200',
    color: '#333',
  },
  bottomSection: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
  },
  topSection: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    //height: 160
  },
});
