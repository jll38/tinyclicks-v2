import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <div>TinyClicks</div>

        <Group className={classes.links}>
          <Anchor c="dimmed" href={"/contact"} lh={1} size="sm">
            Contact
          </Anchor>
          <Anchor c="dimmed" href={"/privacy"} lh={1} size="sm">
            Privacy
          </Anchor>
          <Anchor c="dimmed" href={"/blog"} lh={1} size="sm">
            Blog
          </Anchor>
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
