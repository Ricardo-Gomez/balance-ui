import { atom } from "recoil";
import { LocalStorageService } from "../../services/storage/LocalStorage";

const userJson = LocalStorageService.getUser();
const accessToken = LocalStorageService.getAccessToken();
const refreshToken = LocalStorageService.getRefreshToken();

let user = {};

if (null !== userJson) {
  user = JSON.parse(userJson);
}

const defaultIsAuth = userJson && accessToken && refreshToken;
export const Profile = atom({
  key: "profileState",
  default: user
});

export const isAuth = atom({
  key: "isAuthState",
  default: Boolean(defaultIsAuth),
});

