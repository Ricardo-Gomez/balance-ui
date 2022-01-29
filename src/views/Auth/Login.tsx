import * as React from "react";
import { Heading, VStack, useColorMode, Center } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";
import {  useGoogleAuthentication } from "../../context/hooks/useGoogleAuth";
const Login: React.FC = () => {
  const { handleSuccess } = useGoogleAuthentication();
  const { colorMode } = useColorMode();

  const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  return (
    <Center minH="100vh">
      <VStack spacing={8}>
        <Heading>My Money Balance</Heading>
        <GoogleLogin
          clientId={googleClientId}
          isSignedIn={false}
          responseType="token"
          theme={colorMode}
          onSuccess={handleSuccess}
          onFailure={(e) => {
            console.log(e);
          }}
        />
      </VStack>
    </Center>
  );
};

export default Login;