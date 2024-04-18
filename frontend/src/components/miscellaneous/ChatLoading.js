import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="10vh" />
      <Skeleton height="10vh" />
      <Skeleton height="10vh" />
      <Skeleton height="10vh" />
      <Skeleton height="10vh" />
      <Skeleton height="10vh" />
    </Stack>
  );
};

export default { ChatLoading };
