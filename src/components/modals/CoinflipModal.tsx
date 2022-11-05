import { Modal, ModalHeader, ModalBody } from "~components/ui/Modal";
import {
  CoinFlipGameStatus,
  useCoinFlipContext,
  CoinFlipGamePlayer,
  SideType,
} from "src/store/coinflip";
import {
  CoinFlipModal as CoinflipModalProps,
  useModalContext,
} from "src/store/modal";
import { Badge } from "~components/ui/Badge";
import { getItemModel } from "src/store/items";
import { CountdownCircleProgress } from "~components/ui/Progress";
import {
  createSignal,
  onMount,
  For,
  Show,
  Switch,
  Match,
  Accessor,
  onCleanup,
} from "solid-js";

// env
const ITEM_IMAGE_URL = import.meta.env
  .VITE_STEAM_STATIC_ECONOMY_IMAGE_PUBLIC_URL;

interface PlayerDetailProps {
  side: SideType;
  isWon: boolean;
  data: CoinFlipGamePlayer;
  chance: number;
  status: CoinFlipGameStatus;
  isEndCoinFlip: Accessor<boolean>;
}

interface ItemDetailProps {
  id: number;
  price: number;
}

interface CoinFlipProps {
  winner_side: SideType;
}

const CoinflipModal = (props: CoinflipModalProps) => {
  const { gameid } = props;
  const [coinflipState, coinflipActions] = useCoinFlipContext();
  const [modalState, modalActions] = useModalContext();
  const [showMetaData, setShowMetaData] = createSignal(false);
  const [isEndCoinFlip, setIsEndCoinFlip] = createSignal(false);

  const coinflipGameData = coinflipActions.getCoinflipDataById(
    gameid as number
  );

  if (coinflipGameData === undefined) {
    // close modal
    modalActions.closeModal();
    return;
  }

  // chance
  let totalPriceOfRed = 0;
  let totalPriceOfBlue = 0;
  if (coinflipGameData.red_side && coinflipGameData.red_side.items)
    totalPriceOfRed = coinflipGameData.red_side.items?.reduce((total, item) => {
      return (total += item[1]);
    }, 0);

  if (coinflipGameData.blue_side && coinflipGameData.blue_side.items)
    totalPriceOfBlue = coinflipGameData.blue_side.items.reduce(
      (total, item) => {
        return (total += item[1]);
      },
      0
    );

  const chanceOfBlue =
    (totalPriceOfBlue / (totalPriceOfRed + totalPriceOfBlue)) * 100;
  const chanceOfRed =
    (totalPriceOfRed / (totalPriceOfRed + totalPriceOfBlue)) * 100;

  onMount(() => {
    const timeout = setTimeout(() => {
      setShowMetaData(true);
      setIsEndCoinFlip(true);
    }, 3500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  return (
    <Modal>
      <ModalHeader title={`Coinflip #${gameid}`}></ModalHeader>
      <ModalBody>
        <div class="relative w-full flex flex-col mt-11">
          {/* coin flip */}
          <div
            class="absolute z-10 left-1/2 -translate-x-1/2"
            classList={{
              "-top-10":
                coinflipGameData.status !== CoinFlipGameStatus.FINISHED,
              "-top-20":
                coinflipGameData.status === CoinFlipGameStatus.FINISHED,
            }}
          >
            <Switch>
              <Match
                when={coinflipGameData.status === CoinFlipGameStatus.WAITING}
              >
                <CountdownCircleProgress
                  timer={coinflipGameData.timer as number}
                  variant="orange"
                  size="lg"
                />
              </Match>

              <Match
                when={coinflipGameData.status === CoinFlipGameStatus.JOINED}
              >
                <CountdownCircleProgress
                  timer={coinflipGameData.timer as number}
                  variant="green"
                  size="lg"
                />
              </Match>

              <Match
                when={coinflipGameData.status === CoinFlipGameStatus.FINISHED}
              >
                <CoinFlip
                  winner_side={coinflipGameData.winner_side as SideType}
                />
              </Match>
            </Switch>
          </div>
          <div class="w-full grid grid-cols-2">
            {/* left side */}
            <PlayerDetail
              side="blue"
              isWon={coinflipGameData.winner_side === "blue"}
              data={coinflipGameData.blue_side as CoinFlipGamePlayer}
              chance={chanceOfBlue}
              status={coinflipGameData.status as CoinFlipGameStatus}
              isEndCoinFlip={isEndCoinFlip}
            />
            {/* right side */}
            <PlayerDetail
              side="red"
              isWon={coinflipGameData.winner_side === "red"}
              data={coinflipGameData.red_side as CoinFlipGamePlayer}
              chance={chanceOfRed}
              status={coinflipGameData.status as CoinFlipGameStatus}
              isEndCoinFlip={isEndCoinFlip}
            />
          </div>

          {/* other detail */}
          <div class="text-xs text-site-320 p-2 pt-4 leading-tight text-center flex flex-col">
            {/* hash value */}
            <Show
              when={
                coinflipGameData.status === CoinFlipGameStatus.WAITING ||
                coinflipGameData.status === CoinFlipGameStatus.JOINABLE
              }
            >
              <span class="text-white">
                This game will expire on&nbsp;
                {new Date(
                  (coinflipGameData.time_left as number) * 1000
                ).toUTCString()}
              </span>
            </Show>
            <span>Hash: {coinflipGameData.hash}</span>

            {/* should delay while coin flipping */}
            <Show
              when={
                showMetaData() &&
                coinflipGameData.status === CoinFlipGameStatus.FINISHED
              }
            >
              <span>Secret: {coinflipGameData.secret}</span>
              <span>Winning ticket: {coinflipGameData.ticketNumber}</span>
              <span>Serial number: {coinflipGameData.serialNumber}</span>
              <span>Random.org seed: {coinflipGameData.seed}</span>
              <span>Mod: {coinflipGameData.mod}</span>

              {/* validate serial number */}
              <a
                class="cursor-pointer text-lime-500 text-sm hover:underline"
                href={`https://rustchance.com/provably-fair/serial?number=${coinflipGameData.serialNumber}`}
              >
                Validate Round
              </a>
            </Show>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

const PlayerDetail = (props: PlayerDetailProps) => {
  const { side, isWon, data, chance, status, isEndCoinFlip } = props;
  const [total, setTotal] = createSignal(0);

  onMount(() => {
    // convert cent to dollar
    if (data && data.items)
      setTotal(
        data.items.reduce((total, item) => {
          return (total += item[1]);
        }, 0) / 20
      );
  });

  return (
    <div
      class="flex flex-col items-center gap-4 p-1 transition duration-300"
      classList={{
        "opacity-30":
          !isWon && isEndCoinFlip() && status === CoinFlipGameStatus.FINISHED,
      }}
    >
      {/* player base info */}
      <a
        class="text-white inline-flex flex-col items-center justify-center w-fit gap-3"
        classList={{
          "cursor-default": data === undefined,
        }}
        href={
          data !== undefined
            ? `http://steamcommunity.com/profiles/${data.id}`
            : `#`
        }
        target="_blank"
        rel="noopener"
      >
        {/* avatar */}
        <div class="relative">
          <img
            class="w-24 h-24 rounded-md transition duration-300"
            classList={{
              "shadow-win":
                isWon &&
                isEndCoinFlip() &&
                status === CoinFlipGameStatus.FINISHED,
              "shadow-lose":
                !isWon &&
                isEndCoinFlip() &&
                status === CoinFlipGameStatus.FINISHED,
            }}
            src={
              data !== undefined
                ? `https://avatars.steamstatic.com/${data.avatar}_full.jpg`
                : `/src/assets/images/unknown.jpeg`
            }
          />
          <div
            class="absolute w-10 h-10 bottom-0 bg-contain"
            classList={{
              "bg-coin-blue -right-5": side === "blue",
              "bg-coin-red -left-5": side === "red",
            }}
          ></div>
        </div>

        {/* name */}
        <div class="text-base">
          {data === undefined ? "Waiting for player.." : data.name}
        </div>

        {/* level badge */}
        <Show when={data !== undefined}>
          <Badge
            classList={{
              "bg-gray-800": data.level < 10,
              "bg-gray-500": data.level >= 10 && data.level < 20,
              "bg-green-700": data.level >= 20 && data.level < 50,
              "bg-teal-700": data.level >= 50,
            }}
          >
            {data.level} Level
          </Badge>
        </Show>
      </a>

      {/* player item info */}
      <Show when={data && data.items && data.items.length > 0}>
        <table class="border-collapse w-full">
          <tbody>
            {/* total price & chance */}
            <tr class="text-site-320 border-b border-b-site-600">
              <td class="px-2 py-1 align-middle text-sm text-left border-b-site-600"></td>
              <td class="px-2 py-1 align-middle text-sm text-left border-b-site-600">
                ${total()}
              </td>
              <td class="px-2 py-1 align-middle text-xs text-center border-b-site-600">
                {chance.toFixed(2)}%
              </td>
            </tr>

            {/* item list */}
            <For each={data.items}>
              {(item, index) => <ItemDetail id={item[0]} price={item[1]} />}
            </For>
          </tbody>
        </table>
      </Show>
    </div>
  );
};

const ItemDetail = (props: ItemDetailProps) => {
  const { id, price } = props;
  const item = getItemModel(id);

  return (
    <tr class="bg-site-900 border-b border-b-site-600">
      {/* image */}
      <td class="flex items-center justify-center px-2 py-1 align-middle text-sm text-left">
        <img
          class="w-20 h-12.5"
          src={`${ITEM_IMAGE_URL}/${item?.image}/80fx50f`}
        />
      </td>

      <td class="px-2 py-1 align-middle text-sm text-left">{item?.name}</td>

      <td class="px-2 py-1 align-middle text-xs text-center">${price / 20}</td>
    </tr>
  );
};

const CoinFlip = (props: CoinFlipProps) => {
  const { winner_side } = props;
  const [isStart, setIsStart] = createSignal(false);
  const [isEnd, setIsEnd] = createSignal(false);

  onMount(() => {
    const startTimeout = setTimeout(() => setIsStart(true), 300);
    const endTimeout = setTimeout(() => setIsEnd(true), 3320);

    onCleanup(() => {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
    });
  });

  return (
    <Show when={isStart()}>
      <div
        classList={{
          b_2_p: winner_side === "blue",
          r_2_p: winner_side === "red",
        }}
        style={isEnd() ? { "background-position-x": "-28480px" } : {}}
      ></div>
    </Show>
  );
};

export default CoinflipModal;
