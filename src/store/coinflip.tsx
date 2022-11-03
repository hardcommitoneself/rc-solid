import { createStore } from "solid-utils";
import { SiteItem, SteamItem } from "./items";

type SideType = "red" | "blue";

export enum CoinFlipGameStatus {
  WAITING,
  FINISHED,
  JOINED,
  JOINABLE,
}

type CoinFlipGamePlayer = {
  id: number;
  avatar: string;
  level: number;
  name: string;
  steamid: string;
  items: SiteItem[];
};

type CoinFlipGame = {
  id: number;
  status: CoinFlipGameStatus;
  timer?: number;
  diff?: number;
  hash?: string;
  initial_value?: number;
  owner?: string;
  time_left?: number;
  value?: number;
  blue_side?: CoinFlipGamePlayer;
  red_side?: CoinFlipGamePlayer;
  winner_side?: SideType;
  secret?: string;
  seed?: string;
  serialNumber?: number;
  ticketNumber?: number;
  mod?: string;
};

type CoinFlipState = {
  current: CoinFlipGame[];
  history: CoinFlipGame[];
};

// actions
type Actions = {
  getCoinflipDataById: (gameid: number) => CoinFlipGame | undefined;
};

const [CoinFlipProvider, useCoinFlipContext] = createStore<
  CoinFlipState,
  Actions,
  {}
>({
  state: () => ({
    current: [
      {
        id: 6709151,
        status: CoinFlipGameStatus.FINISHED,
        diff: 10,
        hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
        initial_value: 333,
        owner: "76561199155114267",
        value: 333,
        blue_side: {
          id: 431033,
          avatar: "5296098e3a158611be6f6d5005dd867f1d6e32c1",
          level: 20,
          name: "ЧОПА ЗОМБИ 337",
          steamid: "76561199155114267",
          items: [
            [1419, 156],
            [789, 101],
            [1936, 673],
            [2814, 329],
            [2488, 321],
            [1299, 112],
            [1299, 112],
            [1091, 717],
            [777, 585],
            [760, 434],
          ],
        },
        red_side: {
          id: 514897,
          avatar: "6d3cfb16f4b6154117d76f32b715d0e206921ada",
          level: 59,
          name: "chainsaw masacare",
          steamid: "76561199119624606",
          items: [
            [1419, 156],
            [789, 101],
            [1936, 673],
            [2814, 329],
            [1091, 717],
            [777, 585],
            [760, 434],
          ],
        },
        winner_side: "red",
        mod: "eFeSgmkJUz-#)vmfDfaUa}AAgJgx%]V",
        secret: "eFeSgmkJUz",
        seed: "#)vmfDfaUa}AAgJgx%]V",
        serialNumber: 7922462,
        ticketNumber: 5,
      },
      {
        id: 6709152,
        status: CoinFlipGameStatus.JOINABLE,
        diff: 10,
        hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
        initial_value: 333,
        owner: "76561199155114267",
        time_left: 1667503351,
        value: 333,
        blue_side: {
          id: 431033,
          avatar: "5296098e3a158611be6f6d5005dd867f1d6e32c1",
          level: 20,
          name: "ЧОПА ЗОМБИ 337",
          steamid: "76561199155114267",
          items: [
            [1419, 156],
            [789, 101],
            [1936, 673],
            [2814, 329],
          ],
        },
      },
      {
        id: 6709153,
        status: CoinFlipGameStatus.JOINED,
        diff: 10,
        hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
        initial_value: 333,
        owner: "76561199155114267",
        timer: 1667506316,
        value: 333,
        red_side: {
          id: 514897,
          avatar: "6d3cfb16f4b6154117d76f32b715d0e206921ada",
          level: 59,
          name: "chainsaw masacare",
          steamid: "76561199119624606",
          items: [
            [1091, 717],
            [777, 585],
            [760, 434],
          ],
        },
        blue_side: {
          id: 514892,
          avatar: "42180acb7b1e082f0b19436f5fbf773e80360274",
          level: 1000,
          name: "david",
          steamid: "76561199119624606",
          items: [[760, 434]],
        },
      },
      {
        id: 6709154,
        status: CoinFlipGameStatus.WAITING,
        diff: 10,
        hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
        initial_value: 333,
        owner: "76561199155114267",
        timer: 1667506316,
        value: 333,
        time_left: 1667503351,
        red_side: {
          id: 514897,
          avatar: "6d3cfb16f4b6154117d76f32b715d0e206921ada",
          level: 59,
          name: "chainsaw masacare",
          steamid: "76561199119624606",
          items: [
            [1091, 717],
            [777, 585],
            [760, 434],
            [777, 585],
            [760, 434],
            [777, 585],
            [760, 434],
          ],
        },
        blue_side: {
          id: 514892,
          avatar: "42180acb7b1e082f0b19436f5fbf773e80360274",
          level: 1000,
          name: "david",
          steamid: "76561199119624606",
          items: [],
        },
      },
    ],
    history: [],
  }),

  actions: (set, get) => ({
    getCoinflipDataById(gameid: number) {
      return get.current.find((game) => game.id === gameid);
    },
  }),
});

export { CoinFlipProvider, useCoinFlipContext };
export type { CoinFlipGame, CoinFlipGamePlayer, SideType };
