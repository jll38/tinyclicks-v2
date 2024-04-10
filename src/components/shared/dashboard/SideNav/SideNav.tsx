"use client";
import { useState, useEffect } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconGlobe,
  IconLink,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { MdCampaign } from "react-icons/md";

import classes from "./SideNav.module.scss";

import { useRouter } from "next/router";
import { navigate } from "@/lib/navigate";

interface NavbarLinkProps {
  icon: any
  label: string;
  active?: boolean;
  onClick?(): void;
  route: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  route,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        {typeof Icon === 'function' ? (
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        ) : (
          <Icon style={{ width: rem(20), height: rem(20) }} />
        )}
      </UnstyledButton>
    </Tooltip>
  );
}
const mockdata = [
  { icon: IconHome2, label: "Home", route: "/dashboard" },
  { icon: IconLink, label: "Links", route: "/dashboard/manage-links" },
  { icon: MdCampaign, label: "Campaigns", route: "/dashboard/campaigns" },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
    route: "/dashboard/analytics",
  },
  { icon: IconGlobe, label: "Geolocation", route: "/dashboard/geography" },
  { icon: IconSettings, label: "Settings", route: "/dashboard/settings" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      route={link.route}
      onClick={() => {
        setActive(index);
        navigate(link.route);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" route={""} />
      </Stack>
    </nav>
  );
}
