import { UrlObject } from "url";

import { TODAY_ROUTE_QUERY } from "./dates";

export enum ROUTE {
  listen = "listen",
  home = "home",
  today = "today",
  archive = "archive",
  tracks = "tracks",
}

export interface ISticker {
  src: string;
  height: number;
  width: number;
}

export interface IRoute {
  label: string;
  url: Partial<UrlObject>;
  sticker?: ISticker;
}

export const ROUTES = new Map<ROUTE, IRoute>([
  [
    ROUTE.home,
    {
      label: "Home",
      url: {
        pathname: "/",
      },
    },
  ],
  [
    ROUTE.archive,
    {
      url: {
        pathname: "/archive",
      },
      label: "Archive",
      sticker: {
        src: "v1640336995/doyoutrackid/sticker_archive_qwadum.png",
        height: 62,
        width: 100,
      },
    },
  ],
  [
    ROUTE.today,
    {
      url: {
        pathname: "/tracks",
        query: {
          date: TODAY_ROUTE_QUERY,
        },
      },
      label: "Today",
      sticker: {
        src: "v1640336995/doyoutrackid/sticker_today_mykwki.png",
        height: 96,
        width: 100,
      },
    },
  ],
  [
    ROUTE.tracks,
    {
      url: {
        pathname: "/tracks",
      },
      label: "Tracks",
    },
  ],
  [
    ROUTE.listen,
    {
      url: {
        pathname: "https://doyou.world/",
      },
      label: "Listen",
      sticker: {
        src: "v1640336995/doyoutrackid/sticker_do_you_gpalw0.png",
        height: 100,
        width: 100,
      },
    },
  ],
]);

export const BANANA_NAV_LINKS = [
  ROUTES.get(ROUTE.listen),
  ROUTES.get(ROUTE.today),
  ROUTES.get(ROUTE.archive),
] as IRoute[];

export const NAV_BAR_LINKS = [
  ROUTES.get(ROUTE.today),
  ROUTES.get(ROUTE.archive),
] as IRoute[];
