import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface IProfile {
  showProfileData: boolean;
}
export function Profile({ showProfileData }: IProfile) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Guilherme</Text>
          <Text color="gray.300" fontSize="small">
            kujikeo@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Guilherme Machado" />
    </Flex>
  );
}
