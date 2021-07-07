import { HStack } from "@chakra-ui/react";

export function Separator() {
  return (
    <HStack
      spacing="8"
      mx="8"
      pr="8"
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
      h="8"
    >
      {/* <Icon as={RiNotificationLine} fontSize="20" />
    <Icon as={RiUserLine} fontSize="20" /> */}
    </HStack>
  );
}
