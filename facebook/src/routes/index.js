import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import PolicyScreen from '../screens/Policy';
import ChooseGenderScreen from '../screens/ChooseGender';
import CreateNameScreen from '../screens/CreateName';
import ChooseAgeScreen from '../screens/ChooseAge';
import ChooseNumberPhoneScreen from '../screens/ChooseNumberPhone';
import CreatePasswordScreen from '../screens/CreatePassword';
import ChooseDateOfBirthScreen from '../screens/ChooseDateOfBirth';
import IntroCreateAccountScreen from '../screens/IntroCreateAccount';
import SaveAccountLoginScreen from '../screens/SaveAccountLogin';
import SaveInfoConfirmScreen from '../screens/SaveInfoConfirm';
import PolicyConfirmScreen from '../screens/PolicyConfirm';
import VerificationCodeScreen from '../screens/VerificationCode';
import CommentScreen from '../components/Comment';
import CommentHomeScreen from '../screens/CommentHome';
import CreatePostScreen from '../screens/CreatePost';
import CRUD from '../screens/CRUD';
import Post from '../components/Post';
import ChooseEmoji from '../screens/ChooseEmoji';
import MenuScreen from '../screens/Menu';
import MessageHomeScreen from '../screens/MessageHome';
import MessageNewScreen from '../screens/MessageNew';
import MessagePrimaryScreen from '../screens/MessagePrimary';
import MessageProfileScreen from '../screens/MessageProfile';
import MessageRecipientInfoScreen from '../screens/MessageRecipientInfo';
import MessageWaitingScreen from '../screens/MessageWaiting';
import CameraScreen from '../screens/CameraScreen';
import SearchScreen from '../screens/Search';
import FriendLists from '../screens/FriendLists';
import FriendSuggest from '../screens/FriendSuggest';
import TabVideos from '../screens/TabVideos';
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
import CommentScreen from "../components/Comment";
import CommentHomeScreen from "../screens/CommentHome";
import CreatePostScreen from "../screens/CreatePost";
import CRUD from "../screens/CRUD";
import Post from "../components/Post";
import ChooseEmoji from "../screens/ChooseEmoji";
import MenuScreen from "../screens/Menu";
import MessageHomeScreen from "../screens/MessageHome";
import MessageNewScreen from "../screens/MessageNew";
import MessagePrimaryScreen from "../screens/MessagePrimary";
import MessageProfileScreen from "../screens/MessageProfile";
import MessageRecipientInfoScreen from "../screens/MessageRecipientInfo";
import MessageWaitingScreen from "../screens/MessageWaiting";
import CameraScreen from "../screens/CameraScreen";
import SearchScreen from "../screens/Search";
import FriendLists from "../screens/FriendLists"
import FriendSuggest from "../screens/FriendSuggest";

const publicRoutes = [
    {
        name: 'Home',
        component: HomeScreen,
    },
    {
        name: 'Login',
        component: LoginScreen,
    },
    {
        name: 'Policy',
        component: PolicyScreen,
    },
    {
        name: 'IntroCreateAccount',
        component: IntroCreateAccountScreen,
    },
    {
        name: 'ChooseGender',
        component: ChooseGenderScreen,
    },
    {
        name: 'CreateName',
        component: CreateNameScreen,
    },
    {
        name: 'ChooseAge',
        component: ChooseAgeScreen,
    },
    {
        name: 'ChooseNumberPhone',
        component: ChooseNumberPhoneScreen,
    },
    {
        name: 'CreatePassword',
        component: CreatePasswordScreen,
    },
    {
        name: 'ChooseDateOfBirth',
        component: ChooseDateOfBirthScreen,
    },
    {
        name: 'SaveAccountLogin',
        component: SaveAccountLoginScreen,
    },
    {
        name: 'SaveInfoConfirm',
        component: SaveInfoConfirmScreen,
    },
    {
        name: 'PolicyConfirm',
        component: PolicyConfirmScreen,
    },
    {
        name: 'VerificationCode',
        component: VerificationCodeScreen,
    },
    {
        name: 'Comment',
        component: CommentScreen,
    },
    {
        name: 'CommentHome',
        component: CommentHomeScreen,
    },
    {
        name: 'CreatePost',
        component: CreatePostScreen,
    },
    {
        name: 'CRUD',
        component: CRUD,
    },
    {
        name: 'Post',
        component: Post,
    },
    {
        name: 'ChooseEmoji',
        component: ChooseEmoji,
    },
    {
        name: 'Menu',
        component: MenuScreen,
    },
    {
        name: 'MessageHome',
        component: MessageHomeScreen,
    },
    {
        name: 'MessageNew',
        component: MessageNewScreen,
    },
    {
        name: 'MessagePrimary',
        component: MessagePrimaryScreen,
    },
    {
        name: 'MessageProfile',
        component: MessageProfileScreen,
    },
    {
        name: 'MessageRecipientInfo',
        component: MessageRecipientInfoScreen,
    },
    {
        name: 'MessageWaiting',
        component: MessageWaitingScreen,
    },
    {
        name: 'CameraScreen',
        component: CameraScreen,
    },
    {
        name: 'FriendLists',
        component: FriendLists,
    },
    {
        name: 'FriendSuggest',
        component: FriendSuggest,
    },
    {
        name: 'Search',
        component: SearchScreen,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
