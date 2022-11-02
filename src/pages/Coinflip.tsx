import { useI18n } from "@solid-primitives/i18n";
import { createSignal, For, mapArray } from "solid-js";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";
import { useCoinFlipContext } from "src/store/coinflip";
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

const Coinflip = () => {
  const [t] = useI18n();
  const [state] = useCoinFlipContext();

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
          {(game, index) => <GameListItem data={game}></GameListItem>}
        </For>
      </div>
    </div>
  );
};

export default Coinflip;
