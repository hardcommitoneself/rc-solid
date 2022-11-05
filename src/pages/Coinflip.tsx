import { useI18n } from "@solid-primitives/i18n";
import { createSignal, For, createEffect, onCleanup } from "solid-js";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";
import { useCoinFlipContext } from "src/store/coinflip";
import createDebounce from "@solid-primitives/debounce";
import { StylizedButton } from "~components/ui/Button";

// components
import { Stats, Actions, GameListItem } from "~components/coinflip";
import { Announcement } from "~components/layout";

const Debug = () => {
  const [_, { loadUser, incrementExperience, incrementBalance }] =
    useUserContext();

  const [state, { createNewGame, waiting, joined }] = useCoinFlipContext();

  function exp() {
    incrementExperience(1500);
  }

  function balance() {
    incrementBalance(365);
  }

  return (
    <div class="flex gap-1">
      <StylizedButton onClick={() => createNewGame(400000)}>
        Create
      </StylizedButton>
      <StylizedButton onClick={() => waiting(400000)}>Waiting</StylizedButton>
      <StylizedButton onClick={() => joined(400000)}>Join</StylizedButton>
      <StylizedButton>Finish</StylizedButton>
      <StylizedButton>Remove</StylizedButton>
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
