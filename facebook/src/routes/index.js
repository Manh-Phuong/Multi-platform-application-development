// publicRoutes.js
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import ChooseGenderScreen from "../screens/ChooseGender";

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
    name: "ChooseGender",
    component: ChooseGenderScreen,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
