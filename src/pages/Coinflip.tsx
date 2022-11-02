import { useI18n } from "@solid-primitives/i18n";
import { createSignal, For } from "solid-js";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";
import { SiteItem } from "src/store/items";

// components
import { Stats, Actions, GameListItem } from "~components/coinflip";
import { Announcement } from "~components/layout";

const Debug = () => {
  const [_, { loadUser, incrementExperience, incrementBalance }] =
    useUserContext();

  function exp() {
    incrementExperience(1500);
  }

  function balance() {
    incrementBalance(365);
  }

  return (
    <div class="flex space-x-5">
      <button onClick={loadUser}>load</button>
      <button onClick={exp}>xp</button>
      <button onClick={balance}>balance</button>
    </div>
  );
};

export enum CoinFlipGameStatus {
  WAITING,
  FINISHED,
  JOINED,
  JOINABLE,
}

export type CoinFlipGameUserType = {
  id: number;
  avatar: string;
  level: number;
  name: string;
  steamid: string;
  items: SiteItem[];
};

export type GameDataType = {
  id: number;
  status: CoinFlipGameStatus;
  timer?: number;
  diff?: number;
  hash?: string;
  initial_value?: number;
  owner?: string;
  time_left?: number;
  value?: number;
  blue_side?: CoinFlipGameUserType;
  red_side?: CoinFlipGameUserType;
};

const Coinflip = () => {
  const [t] = useI18n();
  const [games, setGames] = createSignal<GameDataType[]>([
    {
      id: 6709152,
      status: CoinFlipGameStatus.FINISHED,
      diff: 10,
      hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
      initial_value: 333,
      owner: "76561199155114267",
      time_left: 1666982806,
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
    },
    {
      id: 6709152,
      status: CoinFlipGameStatus.JOINABLE,
      diff: 10,
      hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
      initial_value: 333,
      owner: "76561199155114267",
      time_left: 1666982806,
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
      id: 6709152,
      status: CoinFlipGameStatus.JOINED,
      diff: 10,
      hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
      initial_value: 333,
      owner: "76561199155114267",
      time_left: 1666982806,
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
      id: 6709155,
      status: CoinFlipGameStatus.WAITING,
      diff: 10,
      hash: "0e98287fed8fff784491ead2d446b4f1ec4e06bda369cbc2758d1936eceb0cc5",
      initial_value: 333,
      owner: "76561199155114267",
      time_left: 1666982806,
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
        items: [
          [760, 434],
          [760, 434],
          [760, 434],
        ],
      },
    },
  ]);

  return (
    <div class="text-gray-100">
      <Title>{t("global.coinflip", {}, "Coinflip")}</Title>

      {/* top header */}
      <div class="flex items-center justify-between px-10 h-32 bg-gradient-to-t from-gradient-dark-gray-100 to-gradient-dark-gray-200">
        <Stats />
        <Actions />
      </div>

      {/* Announcement */}
      <div class="my-2.5">
        <Announcement />
      </div>

      {/* Game List */}
      <div class="flex flex-col gap-5 p-4">
        <For each={games()}>
          {(game, index) => <GameListItem data={game}></GameListItem>}
        </For>
      </div>
    </div>
  );
};

export default Coinflip;
