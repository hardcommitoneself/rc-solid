import { useI18n } from "@solid-primitives/i18n";
import { createSignal, For, createEffect, onCleanup } from "solid-js";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";
import { useCoinFlipContext } from "src/store/coinflip";
import createDebounce from "@solid-primitives/debounce";
import { StylizedButton } from "~components/ui/Button";
import {
  CoinFlipGame,
  CoinFlipGameStatus,
  CoinFlipGameWaiting,
  CoinFlipGameJoined,
  CoinFlipGameFinished,
} from "src/store/coinflip";

// components
import { Stats, Actions, GameListItem } from "~components/coinflip";
import { Announcement } from "~components/layout";

const Debug = () => {
  const [_, { loadUser, incrementExperience, incrementBalance }] =
    useUserContext();

  const [state, { createNewGame, waiting, joined, finish, remove }] =
    useCoinFlipContext();

  function exp() {
    incrementExperience(1500);
  }

  function balance() {
    incrementBalance(365);
  }

  function createGame() {
    const newGame: CoinFlipGame = {
      id: 6727141,
      status: CoinFlipGameStatus.JOINABLE,
      time_left: 1667593412,
      value: 556,
      owner: "76561198190685382",
      initial_value: 556,
      hash: "655e482ff7f79f8c43e1e50850ba0ba59f69b637f6f0373559b81c40a16c10bf",
      diff: 10,
      blue_side: {
        id: 117475,
        avatar: "650158753d392ec232546fd5b7b29723dfa67c9f",
        level: Math.floor(Math.random() * 90 + 1),
        name: "Prorere #****",
        steamid: "76561198190685382",
        items: [
          [3535, 172],
          [2545, 115],
        ],
      },
    };

    createNewGame(newGame);
  }

  function waitGame() {
    const waitingData: CoinFlipGameWaiting = {
      id: 6727141,
      status: CoinFlipGameStatus.WAITING,
      timer: 1667740569,
      red_side: {
        id: 92308,
        avatar: "3a341435afd82d6ff7d232376f38f6c66fe6e71c",
        level: Math.floor(Math.random() * 90 + 1),
        name: "Ko3eY #**** #****",
        steamid: "76561198340183346",
      },
    };

    waiting(waitingData);
  }

  function joinGame() {
    const joinData: CoinFlipGameJoined = {
      id: 6727141,
      status: CoinFlipGameStatus.JOINED,
      time_left: 1667593412,
      value: 556,
      owner: "76561198190685382",
      initial_value: 556,
      hash: "655e482ff7f79f8c43e1e50850ba0ba59f69b637f6f0373559b81c40a16c10bf",
      diff: 10,
      blue_side: {
        id: 117475,
        avatar: "650158753d392ec232546fd5b7b29723dfa67c9f",
        level: Math.floor(Math.random() * 90 + 1),
        name: "Prorere #****",
        steamid: "76561198190685382",
        items: [
          [3535, 172],
          [2545, 115],
        ],
      },
      red_side: {
        id: 92308,
        avatar: "3a341435afd82d6ff7d232376f38f6c66fe6e71c",
        level: Math.floor(Math.random() * 90 + 1),
        name: "Ko3eY #**** #****",
        steamid: "76561198340183346",
        items: [
          [3797, 57],
          [3021, 50],
          [3021, 50],
          [3021, 50],
        ],
      },
    };

    joined(joinData);
  }

  function finishGame() {
    const finishData: CoinFlipGameFinished = {
      id: 6727141,
      mod: "PVYOvqFFi3-b%k(ONCnfH$yOB#qpxdn",
      secret: "PVYOvqFFi3",
      seed: "b%k(ONCnfH$yOB#qpxdn",
      serialNumber: 7930965,
      status: CoinFlipGameStatus.FINISHED,
      ticketNumber: 56,
      winner_side: "blue",
    };

    finish(finishData);
  }

  function removeGame() {
    const removeData = {
      data: 6727141,
    };

    remove(removeData.data);
  }

  return (
    <div class="flex gap-1">
      <StylizedButton onClick={createGame}>Create</StylizedButton>
      <StylizedButton onClick={waitGame}>Waiting</StylizedButton>
      <StylizedButton onClick={joinGame}>Join</StylizedButton>
      <StylizedButton onClick={finishGame}>Finish</StylizedButton>
      <StylizedButton onClick={removeGame}>Remove</StylizedButton>
    </div>
  );
};

const Coinflip = () => {
  const [t] = useI18n();
  const [state] = useCoinFlipContext();

  const [maxNumberOfDisplaybleItems, setMaxNumberOfDisplayableItems] =
    createSignal(0);

  const setWindowSize = () => {
    if (window.innerWidth > 1600) {
      setMaxNumberOfDisplayableItems(6);
      return;
    }
    if (window.innerWidth > 1280) {
      setMaxNumberOfDisplayableItems(4);
      return;
    }
    if (window.innerWidth > 960) {
      setMaxNumberOfDisplayableItems(2);
      return;
    }
    if (window.innerWidth < 800) {
      setMaxNumberOfDisplayableItems(4);
      return;
    }
    if (window.innerWidth < 960) {
      setMaxNumberOfDisplayableItems(6);
      return;
    }
  };

  const debounceSetWindowSize = createDebounce(setWindowSize, 200);

  createEffect(() => {
    setWindowSize();
    window.addEventListener("resize", debounceSetWindowSize);
  });

  onCleanup(async () => {
    window.removeEventListener("resize", debounceSetWindowSize);
  });

  return (
    <div class="text-gray-100">
      <Title>{t("global.coinflip", {}, "Coinflip")}</Title>

      {/* top header */}
      <div class="flex items-center justify-between px-10 h-32 bg-gradient-to-t from-gradient-dark-gray-100 to-gradient-dark-gray-200">
        <Stats />
        <Actions />
        <Debug />
      </div>

      {/* Announcement */}
      <div class="my-2.5">
        <Announcement />
      </div>

      {/* Game List */}
      <div class="flex flex-col gap-5 p-4">
        <For each={state.current}>
          {(game, index) => (
            <GameListItem
              data={game}
              maxLen={maxNumberOfDisplaybleItems}
            ></GameListItem>
          )}
        </For>
      </div>
    </div>
  );
};

export default Coinflip;
