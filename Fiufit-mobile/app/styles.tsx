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
  loginAndRegisterButton: {
    top: "-10%",
  },
  extraInfoButton: {
    top: "20%",
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
  registerHeading: {
    top: '3%',
  },
  loginHeading: {
    top: '0%',
  },
  extraInfoHeading: {
    top: '10%',
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
    top: "25%",
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
  },
});