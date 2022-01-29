import React from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useHistory } from "react-router";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { Profile, isAuth, queryProfileAuth } from "../../recoil/profile";

export function useGoogleAuthentication() {
  const setUser = useSetRecoilState(Profile);
  const setIsAuth = useSetRecoilState(isAuth);
  const [result, setResult] = React.useState<string | null>(null);
  const { accessToken, frequencies, refreshToken, user } = useRecoilValue(
    queryProfileAuth(result)
  );
  const { push } = useHistory();
  React.useEffect(() => {
    async function authenticate() {
      if (
        accessToken !== null &&
        frequencies !== null &&
        refreshToken !== null &&
        user !== null
      ) {
        setUser(user);
        setIsAuth(true);
        push("/");
      }
    }

    if (result !== null) {
      authenticate();
    }
  }, [result]);
  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response) {
      const tokenId = response.tokenId;
      setResult(tokenId);
    }
  };

  return {
    handleSuccess,
  };
}
