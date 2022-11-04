import { useI18n } from "@solid-primitives/i18n";
import { createSignal, For, createEffect, onCleanup } from "solid-js";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";
import { useCoinFlipContext } from "src/store/coinflip";
import { SiteItem } from "src/store/items";
import createDebounce from "@solid-primitives/debounce";

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

const Coinflip = () => {
  const [t] = useI18n();
  const [state] = useCoinFlipContext();

  const [maxLen, setMaxLen] = createSignal(0);

  const setWindowSize = () => {
    if (window.innerWidth > 1600) {
      setMaxLen(6);
      return;
    }
    if (window.innerWidth > 1280) {
      setMaxLen(4);
      return;
    }
    if (window.innerWidth > 960) {
      setMaxLen(2);
      return;
    }
    if (window.innerWidth < 800) {
      setMaxLen(4);
      return;
    }
    if (window.innerWidth < 960) {
      setMaxLen(6);
      return;
    }
  };

  const debounceWindowSize = createDebounce(setWindowSize, 200);

  createEffect(() => {
    setWindowSize();
    window.addEventListener("resize", debounceWindowSize);
  });

  onCleanup(async () => {
    window.removeEventListener("resize", debounceWindowSize);
  });

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
        <For each={state.current}>
          {(game, index) => (
            <GameListItem data={game} maxLen={maxLen}></GameListItem>
          )}
        </For>
      </div>
    </div>
  );
};

export default Coinflip;
