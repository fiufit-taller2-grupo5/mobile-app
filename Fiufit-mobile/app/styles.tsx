import { StyleSheet } from "react-native";
import { Platform } from 'react-native';

export const welcomeStyles = StyleSheet.create({
  mainVerticalStack: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  verticalStack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  horizontalStack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleHorizontalStack: {
    top: '-5%',
  },
  buttonsHorizontalStack: {
    top: '-15%',
  },
  button: {
    justifyContent: 'center',
    width: '35%',
    height: '140%',
    borderRadius: 50,
  },
  text: {
    fontFamily: 'BebasNeue',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  heading1: {
    top: '0%',
    paddingLeft: '3%',
    fontSize: 100,
    lineHeight: 120,
  },
  heading2: {
    left: '30%',
    fontSize: 77,
    lineHeight: 92,
  },
  heading3: {
    left: '5%',
    fontSize: 88,
    lineHeight: 106,
  },
  paragraph: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.01,
  },
  desc: {
    fontWeight: "700",
  }
});

export const loginAndRegisterStyles = StyleSheet.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    textAlign: "center",
    width: "80%",
    borderRadius: 30
  },
  button2: {
    backgroundColor: "#FF6060",
    top: 80,
  },
  loginAndRegisterButton: {
    top: "-10%",
  },
  extraInfoButton: {
    top: "3%",
  },
  heading: {
    left: '0%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  heading1: {
    top: 100,
    color: "#FF6060",
  },
  heading2: {
    flex: 0,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 35,
    textAlign: 'center',
    top: 30
  },
  registerHeading: {
    top: '3%',
  },
  loginHeading: {
    top: '0%',
  },
  extraInfoHeading: {
    top: '15%',
  },
  googleImage: {
  },
  link: {
    left: "0%",
  },
  registerLink: {
    top: "35%",
  },
  loginLink: {
    top: "50%",
  },
  extraInfoLink: {
    top: "3%",
  },
  googleTextOption: {
    top: '0%',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 15
  },
  moveToLogin: {
    top: '2%',
    left: '0%',
  },
  moveToRegister: {
    top: '2.8%',
    left: '0%',
    marginTop: 0
  }
});

export const navigationBarStyles = StyleSheet.create({
  navBar: {
    borderRadius: 30,
  }
});

export const footerTabStyles = StyleSheet.create({
  horizontalFooterTab: {
    borderRadius: 30,
    position: 'relative',
    bottom: -690,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  }
});

export const trainingStyles = StyleSheet.create({
  textTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 20,
  }
});

export const createTrainingStyles = StyleSheet.create({
  heading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    marginTop: '5%',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FF6060',
  },
  titleText: {
    marginTop: '5%',
  },
  descriptionText: {
    marginTop: '2%',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 18,
    left: '10%',
    alignSelf: 'flex-start',
    color: '#FF6060',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  }
});

export const rateTrainingStyles = StyleSheet.create({
  heading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    top: '10%',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FF6060',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    top: '18%',
    left: '10%',
  },
  starRatingBox: {
    width: '100%',
    fontSize: 30,
    paddingTop: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  commentInputBox: {
    width: '90%',
    marginTop: 4,
    alignSelf: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});


export const editProfileStyles = StyleSheet.create({
  heading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    top: '50%',
    lineHeight: 35,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FF6060',
  },
  fitText: {
    left: '5%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 25,
  },
  button: {
    top: '100%',
    width: '80%',
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#FF6060',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FF6060',
  },
  nameBox: {
    width: '100%',
    fontSize: 30,
    paddingTop: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  infoBox: {
    marginHorizontal: 5,
    borderRadius: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 1,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    top: '15%',
    right: '15%',
    textAlign: 'left',
    alignSelf: 'flex-end',
  },
});