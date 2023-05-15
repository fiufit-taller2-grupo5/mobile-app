import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
  mainVerticalStack: {
    top: '5%',
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
    height: "-10%",
    width: "80%",
    borderRadius: 30
  },
  button2: {
    backgroundColor: "#FF6060",
    top: "60%",
  },
  loginAndRegisterButton: {
    top: "-10%",
  },
  extraInfoButton: {
    top: "3%",
  },
  heading: {
    flex: 0,
    left: '0%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  heading1: {
    top: '15%',
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
    top: '10%',
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
    top: "0%",
    right: "0%",
    bottom: "0%",
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
  },
  moveToLogin: {
    top: '2%',
    left: '0%',
  },
  moveToRegister: {
    top: '2.8%',
    left: '0%',
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
    top: '10%',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FF6060',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 18,
    top: '18%',
    left: '10%',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  button: {
    top: '85%',
    alignSelf: 'center',
    width: '60%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
    alignItems: 'center',
  },
  buttonForm: {
    alignSelf: 'center',
    width: '80%',
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
  },
  titleButton: {
    top: '50%',
    width: '100%',
    height: '70%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
    alignSelf: 'center',
  },
  typeButton: {
    top: '55%',
    width: '100%',
    height: '70%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
    alignContent: 'center',
    justifyContent: 'center',
  },
  difficultyButton: {
    top: '55%',
    width: '100%',
    height: '70%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
    alignContent: 'center',
  },
  distanceButton: {
    top: '50%',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
    alignContent: 'center',
  },
  descriptionButton: {
    top: '30%',
    height: '7%',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 30,
    backgroundColor: "#FF6060",
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
    width: '90%',
    height: '40%',
    marginTop: '5%',
    alignSelf: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
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