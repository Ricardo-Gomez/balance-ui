import { selectorFamily } from "recoil";
import { api } from "../../api";
import { LocalStorageService } from "../../services/storage/LocalStorage";

export const queryProfileAuth = selectorFamily({
  key: "queryProfileAuth",
  get: (token) => async () => {
    if (!token) {
      return {
        accessToken: null,
        refreshToken: null,
        user: null,
        frequencies: null,
      };
    }
    let accessToken: string;
    let refreshToken: string;
    let user: Record<string, any>;
    let frequencies: Record<string, any>;

    try {
      const auth = await api.authGoogleWithToken(token as string);
      accessToken = auth.accessToken;
      refreshToken = auth.refreshToken;
      user = auth.user;
      LocalStorageService.setToken({
        accessToken,
        refreshToken,
      });
      LocalStorageService.setUser(user);
      const frequenciesData = await api.getFrequencies();
      frequencies = frequenciesData;
      LocalStorageService.setFrequencies(frequencies);

    } catch (error) {
      throw new Error("failed to auth");
    }

    return {
      accessToken,
      refreshToken,
      user,
      frequencies,
    };
  },
});
