import { Box, Stack } from "@chakra-ui/react";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
} from "react-icons/ri";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/filials" icon={RiContactsLine}>
          Filiais
        </NavLink>
        <NavLink href="/funcionarios" icon={RiDashboardLine}>
          Funcionários
        </NavLink>
      </NavSection>
    </Stack>
  );
}
