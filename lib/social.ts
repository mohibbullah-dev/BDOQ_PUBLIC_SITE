import type { ComponentType, SVGProps } from "react";
import type { ISocialLink } from "@/lib/types";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/SocialBrandIcons";

type SocialIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIAL_ICON_MAP: Record<string, SocialIconComponent> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsappIcon,
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
};

export function getSocialIcon(iconName: string): SocialIconComponent {
  return SOCIAL_ICON_MAP[iconName] ?? WhatsappIcon;
}

export function orderSocialLinks(
  links: ISocialLink[],
  order: readonly string[]
): ISocialLink[] {
  return order
    .map((icon) => links.find((link) => link.icon === icon))
    .filter((link): link is ISocialLink => link !== undefined);
}
