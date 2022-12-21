const SERVER_DOMAIN = "https://openeyz-v2.herokuapp.com";
// const SERVER_DOMAIN = "http://localhost:8081";

const API_PATH = SERVER_DOMAIN + "/api";
const ADMIN_PATH = SERVER_DOMAIN + "/admin";

export const SERVER_LOGOUT_URL = SERVER_DOMAIN + '/logout';

export const SERVER_ACCESS_URL = API_PATH + "/access";
export const SERVER_REFRESH_TOKEN_URL = API_PATH + "/refresh";

export const SERVER_USER_URL = API_PATH + '/user';
export const SERVER_USER_SIMPLE_URL = SERVER_USER_URL + '/simple';
export const SERVER_USER_DATA_URL = SERVER_USER_URL + '/data';
export const SERVER_USER_LNAME_URL = SERVER_USER_URL + '/lname';
export const SERVER_USER_NAME_URL = SERVER_USER_URL + '/name';
export const SERVER_USER_USERNAME_URL = SERVER_USER_URL + '/username';
export const SERVER_USER_PASSWORD_URL = SERVER_USER_URL + '/password';
export const SERVER_USER_DESCRIPTION_URL = SERVER_USER_URL + '/description';
export const SERVER_USER_AVATAR_URL = SERVER_USER_URL + '/avatar';
export const SERVER_USER_THEME_URL = SERVER_USER_URL + '/theme';
export const SERVER_USER_DELETE_URL = SERVER_USER_URL + '/delete';

export const SERVER_PUBLICATION_URL = API_PATH + '/publication';
export const SERVER_PUBLICATION_LIMIT_URL = SERVER_PUBLICATION_URL + '/limit';

export const SERVER_COMMENT_URL = API_PATH + '/comment';
export const SERVER_COMMENT_LIMIT_URL = SERVER_COMMENT_URL + '/limit';
export const SERVER_COMMENT_DELETE_URL = SERVER_COMMENT_URL + '/delete';

export const SERVER_USER_NOTIF_URL = API_PATH + '/notif';
export const SERVER_USER_NOTIF_ONE_URL = SERVER_USER_NOTIF_URL + '/one';

export const SERVER_LIKE_URL = API_PATH + '/like';
export const SERVER_LIKE_COUNT_URL = SERVER_LIKE_URL + '/count';

export const SERVER_IMG_URL = API_PATH + '/img';

export const SERVER_USER_STATE_URL = ADMIN_PATH + '/state';
export const SERVER_USER_ROLE_URL = ADMIN_PATH + '/role';


const ROOT_URL = "/";
export const HOME_PAGE_URL = ROOT_URL;
export const ACCESS_PAGE_URL = ROOT_URL + "access";
export const NOTIFICATION_PAGE_URL = ROOT_URL + "notification";
export const MENTIONS_PAGE_URL = ROOT_URL + "mentions";
export const ERROR_PAGE_URL = ROOT_URL + "error";
export const PROFILE_PAGE_URL = ROOT_URL + "profile";
export const TEAM_PAGE_URL = ROOT_URL + "team";
export const NOTFOUND_PAGE_URL = ROOT_URL + "*";
export const SUPERADMIN_IMG_URL = "../assets/suadmin.png";
export const ADMIN_IMG_URL = ROOT_URL + "@/assets/admin.png";
export const USER_IMG_URL = ROOT_URL + "@/assets/user.png";


export const ERROR_MESSAGE_DURATION = 4000;
export const POST_GET_LIMIT = 5;
export const COMMENT_GET_LIMIT = 3;
export const INFINITE_SCROLL_OFFSET = 0;
