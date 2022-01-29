// import { Center } from "@chakra-ui/layout";
import { CircularProgress, Flex } from "@chakra-ui/react";
import React from "react";

type LoaderProps = {
  fullWidth: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ fullWidth = false }) => {
  if (fullWidth)
    return (
      <Flex height='400px'>
        <CircularProgress
          justifySelf='center'
          alignSelf='center'
          isIndeterminate
          color='green.300'
          size='100px'
        />
      </Flex>
    );
  else {
    return (
      <CircularProgress
        justifySelf='center'
        alignSelf='center'
        isIndeterminate
        color='green.300'
      />
    );
  }
};
