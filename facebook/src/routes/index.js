// publicRoutes.js
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import ChooseGenderScreen from "../screens/ChooseGender";
import CreateNameScreen from "../screens/CreateName";
import ChooseAgeScreen from "../screens/ChooseAge";
import ChooseNumberPhoneScreen from "../screens/ChooseNumberPhone";
import CreatePasswordScreen from "../screens/CreatePassword";
import IntroCreateAccountScreen from "../screens/IntroCreateAccount";

const publicRoutes = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Login",
    component: LoginScreen,
  },
  {
    name: "IntroCreateAccount",
    component: IntroCreateAccountScreen,
  },
  {
    name: "ChooseGender",
    component: ChooseGenderScreen,
  },
  { name: "CreateName", component: CreateNameScreen },
  {
    name: "ChooseAge",
    component: ChooseAgeScreen,
  },
  {
    name: "ChooseNumberPhone",
    component: ChooseNumberPhoneScreen,
  },
  {
    name: "CreatePassword",
    component: CreatePasswordScreen,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
