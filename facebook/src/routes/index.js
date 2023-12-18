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
import ProfileDetail from '../screens/ProfileDetail';
import EditProfile from '../screens/EditProfile';
import SearchScreen from '../screens/Search';
import Friend from '../screens/Friend';
import FriendLists from '../screens/FriendLists';
import FriendListsOther from '../screens/FriendListsOther';
import FriendSuggest from '../screens/FriendSuggest';
import TabVideos from '../screens/TabVideos';
import VideoScreen from '../screens/VideoScreen';
import VideoActive from '../screens/VideoActive';
import DetailActivity from '../screens/DetailActivity';
import PreviewImage from '../screens/PreviewImage';
import EditDetail from '../screens/EditDetail';
import ProfileOtherDetail from '../screens/ProfileOtherDetail';
import ProfileSetting from '../screens/ProfileSetting';
import BlockList from '../screens/BlockList';
import BuyCoins from '../screens/BuyCoins';
import SettingNotification from '../screens/SettingNotification';
import Test from '../screens/Test';
import ActivityLog from '../screens/ActivityLog';
import DetailPost from '../screens/DetailPost';

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
        name: 'ProfileDetail',
        component: ProfileDetail,
    },
    {
        name: 'EditProfile',
        component: EditProfile,
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
        name: 'Friend',
        component: Friend,
    },
    {
        name: 'FriendLists',
        component: FriendLists,
    },
    {
        name: 'FriendListsOther',
        component: FriendListsOther,
    },
    {
        name: 'FriendSuggest',
        component: FriendSuggest,
    },
    {
        name: 'Search',
        component: SearchScreen,
    },
    {
        name: 'TabVideos',
        component: TabVideos,
    },
    {
        name: 'VideoScreen',
        component: VideoScreen,
    },
    {
        name: 'VideoActive',
        component: VideoActive,
    },
    {
        name: 'DetailActivity',
        component: DetailActivity,
    },
    {
        name: 'PreviewImage',
        component: PreviewImage,
    },
    {
        name: 'EditDetail',
        component: EditDetail,
    },
    {
        name: 'ProfileOtherDetail',
        component: ProfileOtherDetail,
    },
    {
        name: 'ProfileSetting',
        component: ProfileSetting,
    },
    {
        name: 'BlockList',
        component: BlockList,
    },
    {
        name: 'BuyCoins',
        component: BuyCoins,
    },
    {
        name: 'SettingNotification',
        component: SettingNotification,
    },
    {
        name: 'Test',
        component: Test,
    },
    {
        name: 'ActivityLog',
        component: ActivityLog,
    },
    {
        name: 'DetailPost',
        component: DetailPost,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
