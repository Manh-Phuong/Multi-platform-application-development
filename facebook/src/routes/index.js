// publicRoutes.js
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import PolicyScreen from "../screens/Policy";
import ChooseGenderScreen from "../screens/ChooseGender";
import CreateNameScreen from "../screens/CreateName";
import ChooseAgeScreen from "../screens/ChooseAge";
import ChooseNumberPhoneScreen from "../screens/ChooseNumberPhone";
import CreatePasswordScreen from "../screens/CreatePassword";
import ChooseDateOfBirthScreen from "../screens/ChooseDateOfBirth";
import IntroCreateAccountScreen from "../screens/IntroCreateAccount";
import SaveAccountLoginScreen from "../screens/SaveAccountLogin";
import SaveInfoConfirmScreen from "../screens/SaveInfoConfirm";
import PolicyConfirmScreen from "../screens/PolicyConfirm";
import VerificationCodeScreen from "../screens/VerificationCode";
import MenuScreen from "../screens/FacebookMenu";

const publicRoutes = [
    {
        name: "Home",
        component: HomeScreen
    },
    {
        name: "Login",
        component: LoginScreen
    },
    {
        name: "Policy",
        component: PolicyScreen
    },
    {
        name: "IntroCreateAccount",
        component: IntroCreateAccountScreen
    }, {
        name: "ChooseGender",
        component: ChooseGenderScreen
    }, {
        name: "CreateName",
        component: CreateNameScreen
    }, {
        name: "ChooseAge",
        component: ChooseAgeScreen
    }, {
        name: "ChooseNumberPhone",
        component: ChooseNumberPhoneScreen
    }, {
        name: "CreatePassword",
        component: CreatePasswordScreen
    }, {
        name: "ChooseDateOfBirth",
        component: ChooseDateOfBirthScreen

    }, {
        name: "SaveAccountLogin",
        component: SaveAccountLoginScreen

    }, {
        name: "SaveInfoConfirm",
        component: SaveInfoConfirmScreen
    }, {
        name: "PolicyConfirm",
        component: PolicyConfirmScreen
    }, {
        name: "VerificationCode",
        component: VerificationCodeScreen
    },
    {
        name: "ContentMenu",
        component: MenuScreen
    },
];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
