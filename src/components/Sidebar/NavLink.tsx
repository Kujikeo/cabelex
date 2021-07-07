import { Text, Link as ChakraLink, Icon, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface INavLink extends LinkProps {
  children: string;
  icon: ElementType;
  href: string;
}
export function NavLink({ children, href, icon, ...rest }: INavLink) {
  return (
    <>
      <ActiveLink href={href} passHref>
        <ChakraLink display="flex" align="center" {...rest}>
          <Icon as={icon} fontSize="20" />
          <Text ml="4" fontWeight="medium">
            {children}
          </Text>
        </ChakraLink>
      </ActiveLink>
    </>
  );
}
