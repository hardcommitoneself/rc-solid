import {
  createEffect,
  createSignal,
  JSX,
  Match,
  Show,
  Switch,
  For,
  Accessor,
} from "solid-js";
import { getItemModel, SiteItem, SteamItem } from "src/store/items";
import { StylizedButton } from "src/components/ui/Button";
import { CountdownCircleProgress } from "src/components/ui/Progress";
import { useModalContext } from "src/store/modal";
import { CoinFlipGame, CoinFlipGameStatus } from "src/store/coinflip";

type SideType = "blue" | "red";
type CoinType = "blue" | "red";
type CoinPosType = "tr" | "tl" | "br" | "bl";

type ItemBackgroundImageType = "f15840" | "a7ec2e" | "35a3f1";

interface GameListItemProps {
  data: CoinFlipGame;
  maxLen: Accessor<number>;
}

interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  id?: string;
  hasCoinBadge: boolean;
  side?: SideType;
  pos?: CoinPosType;
}

interface CoinProps {
  type: CoinType;
}

interface PriceCardProps {
  totalPrice: Accessor<number>;
  diff: number;
  isFinished: boolean;
}

interface ItemProps {
  id: number;
  price: number;
}

// env
const ITEM_IMAGE_URL = import.meta.env
  .VITE_STEAM_STATIC_ECONOMY_IMAGE_PUBLIC_URL;

// bg
const ItemBGImages = {
  f15840: "bg-item-f15840",
  a7ec2e: "bg-item-a7ec2e",
  "35a3f1": "bg-item-35a3f1",
};

const GameListItem = (props: GameListItemProps) => {
  const { data, maxLen } = props;
  const [items, setItems] = createSignal<SiteItem[]>([]);
  const [restLen, setRestLen] = createSignal(0);
  const [totalPrice, setTotalPrice] = createSignal(0);
  const [, actions] = useModalContext();

  createEffect(() => {
    setItems(
      [...(data.blue_side?.items || []), ...(data.red_side?.items || [])]
        .sort((a, b) => b[1] - a[1])
        .slice(0, maxLen())
    );

    setRestLen(
      (data.blue_side?.items || []).length +
        (data.red_side?.items || []).length -
        maxLen()
    );

    setTotalPrice(
      [
        ...(data.blue_side?.items || []),
        ...(data.red_side?.items || []),
      ].reduce((total, item) => {
        return total + item[1];
      }, 0) / 20
    );
  });

  return (
    <div class="flex flex-col md-lg:flex-row gap-5 p-2.5 md-lg:h-24 bg-site-900 rounded">
      {/* left side */}
      <div class="md-lg:w-3/5 flex flex-col md-lg:flex-row md-lg:items-center gap-8">
        {/* avatar of blue and red */}
        <div class="w-40 flex items-center justify-center">
          <Switch>
            <Match when={!!data.blue_side && !!data.red_side}>
              <Show when={data.status !== CoinFlipGameStatus.JOINABLE}>
                <div class="flex items-center gap-1">
                  <Avatar
                    id={data.blue_side?.avatar}
                    hasCoinBadge={true}
                    side="blue"
                    pos="br"
                  />
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAApCAYAAAA8hqkEAAAFrnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarVZtcus2DPzPU/QIBAGQ4HHAr5neoMfvklJiOy9OXzu1JqaMUCCAXSwU5l9/rvAHPlSyBdFiueYc8ZEqNTluLF6fa6Uo5/v+ET9uXuwh1fsfCSbGytfPPO/9Drs+Hihy29urPZR++7HbEX06Ph/eJ+/7e5/djjhddrp/h4+AXJ7Suf9Sv93ezr/+loJiDIU/TiFNJo74zvsURgRs7Nt2vjVtC+FecTkL1+9rFzJ/X7zPuy+1i37b+bUUIeZ7Q/5So9tO+sX+ODi9RESPk1/+MS5MHp+n2q01bK15ZeeSUakc7qQ+Ujl32NhQSj6PZVwFf4r7cq6Ky5BiB2IDaDZcPVClhMouEhrktGietVNHiJJmKlhT6omPzbikmvoBRfZFKxWuPAIwStyBGsOcPmOhc24953UynDwIOxPBGeGJX67wnfG/XJ+O1trUJYp21Qm0QFxpcxphbOT2N3YBEFp3TfXU91zhiTfxCVgGgnrKbEjQY7tcNKUHt/jgzNinUUK8WoPKuB2gRDhbEQwYLRQz6E2ZYkmpEKGOBnwckSeW1IAAqaZBYQEb5gxwLO2z8UyhszdpusyQFgChnLkAmsoOsEQU/Cli4JCjeySoataiplU9c5asOWcIFTTKCxcpWnIpxUotbmxiatmKmVXzmipDwrTmWkK1Wqs7DnW4djzt2OHeUuMmTVtupVmrzTvo06Vrz71067X7SIMH2n/kUcKwUYdPmqDSlKkzzzJt1ukLXFu8ZOnKqyxbdfknanS37Qtq9AW5n1GjG7WNmJx95YEazKV8uKAtJ7oxA2JJCIiXjQAInTZm0UgkbeQ2ZrEmNIUmoEa6wUG3AzEgKJOSLvrE7oHcj7gFlX+FW3qHXNjQ/R/IhQ3djdyvuH2D2vAzUfgAtLtw1zTygrCthEqYp+bScUKhNVssIzkhqslr5LhcQW2MhrMRGvnrGl4MaQ10DiDKgCeqVVrqTRVA50WpW0lSV0/IOnaEMi37QquVtSNSG0tZKtTr+MO8URLdk+/NClIwwgYYY+gG3ToFK/s2E8Sw1m7UC7BEBIijTsq9bRyBOPZUlGj6aIijgku+k/B6pxO+Tfhe6xxtWVsRsHs2GsolT7Y+cJRWgDxSQj2pgkeVpEkXwTB1EzKNXCeq0IbWhqGDfDJPxOeV8d+TG4p5oolPa3g1IJEdfgdUoJPlAbwVsG+moLGSyGJwvnZMDt/xlJqH9Vks9KHdn0CvEFD6zaJH1SFraW5LAqm4d1ComSomFxSzekzZfbG33XFA13ayHc92NOSeTDKB+A33OAUPbxl2rwUkgY8FjPIAekB536MKTfCqkvcxUJsZTm+aHFJ9cmp4a43Avea8QD8VyycbPPrmzPBgNTpzh1tmBWfAZ2iZd/SaN3je9Yje1mZXHGbaIAk0h3yUNPxOTVFEjVMFLtShIc3RLsiZ0R3ewTXkEnAe+ilDUN25tjXAaUhVrwp+ZYmz7QoXUa6VQKVmmT8K/Jzbt8yu6InWG1Rn9AV+QqlPi5UqcypIIugXdEzdHQPJSRV6JCA5tu9pviZj+soqvFAbG4JyW7+4Cjen2PHdGqI2iGlER3Gcxm1ANiX52u2U8N43BhiN5NEhaICNGjJtFXOjog+gAFCY/boVoq+fcX1aARrOKOZQcdQIDFpHKtQuYatmfgUoH5nE+HZ1sbIGxg4myBR02sRYqj0gSx1b93HOwoTqmWkuTaCN5QOst7wgu64YNfv3AIfQJkBe+oOm4R/ySQVuZlqn1zAquxaQiDdpMf+gPxHTaBM2QPv3S+6R39bxHup4+XSOYFuG/m9JOoIE2NR/ADC8GPYxeDC1TVlRTDsShMWXIgDAAt91U8pmGxNT8BR4rFxCQfv4JjpEuGN2vNfALxJ4gY1KXpZwXs+BZfgbprFVAwjYj7UAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfiCg8JNzFLg4NfAAAAn0lEQVRIx8XWuw3AIAwEUGAAN9QpskP23ygNC5AmkSIChnOM8QCneyA+ftuP7O5J6fQOnOB+jm4AUcxwgMQ9dw1QRpBuH0tAWuitgZTRbDDK0N1G9cM0wvgEoC3mH+ceoxqAMGxuJI7RDBhl2F2qLQYbMMKwfRdqjG5AjwETyhY2a8AxRA3eDLttbDHEDR4GFFBrsfaLQxQzHFAy1v/SLv25OJVJhNkXAAAAAElFTkSuQmCC"
                    height={40}
                    class="h-10"
                  />
                  <Avatar
                    id={data.red_side?.avatar}
                    hasCoinBadge={true}
                    side="red"
                    pos="tl"
                  />
                </div>
              </Show>
            </Match>
            <Match when={!data.blue_side || !data.red_side}>
              <Switch>
                <Match when={!!data.blue_side}>
                  <>
                    <Avatar id={data.blue_side?.avatar} hasCoinBadge={false} />
                    <Coin type="red" />
                  </>
                </Match>
                <Match when={!!data.red_side}>
                  <>
                    <Avatar id={data.red_side?.avatar} hasCoinBadge={false} />
                    <Coin type="blue" />
                  </>
                </Match>
              </Switch>
            </Match>
          </Switch>
        </div>

        {/* items */}
        <div
          class="flex md-lg:grid gap-2.5"
          classList={{
            "grid-cols-7": maxLen() === 6 && restLen() > 0,
            "grid-cols-6": maxLen() === 6 && restLen() <= 0,
            "grid-cols-5": maxLen() === 4 && restLen() > 0,
            "grid-cols-4": maxLen() === 4 && restLen() <= 0,
            "grid-cols-3": maxLen() === 2 && restLen() > 0,
            "grid-cols-2": maxLen() === 2 && restLen() <= 0,
          }}
        >
          <For each={items()} fallback={<div>Loading...</div>}>
            {(item, index) => <Item id={item[0]} price={item[1]} />}
          </For>
          <Show when={restLen() > 0}>
            <div class="flex items-center justify-center uppercase text-xs text-site-335">
              +{restLen()} Items
            </div>
          </Show>
        </div>
      </div>

      {/* right side */}
      <div class="flex flex-col gap-5 md-lg:gap-0 md-lg:flex-row items-center justify-between md-lg:w-2/5">
        {/* price and status */}
        <div class="grid grid-cols-2 w-1/2 gap-5 xl:gap-10">
          {/* price card */}
          <PriceCard
            totalPrice={totalPrice}
            diff={data.diff as number}
            isFinished={
              data.status === CoinFlipGameStatus.FINISHED ||
              data.status === CoinFlipGameStatus.JOINED
            }
          />
          {/* status */}
          <div class="flex items-center justify-center">
            <Show when={data.status === CoinFlipGameStatus.FINISHED}>
              <Avatar
                class="ml-5"
                id={data.red_side?.avatar}
                hasCoinBadge={true}
                side="red"
                pos="tl"
              />
            </Show>
            <Show when={data.status === CoinFlipGameStatus.WAITING}>
              <CountdownCircleProgress
                size="md"
                variant="orange"
                timer={data.timer as number}
              />
            </Show>
            <Show when={data.status === CoinFlipGameStatus.JOINED}>
              <CountdownCircleProgress
                size="md"
                variant="green"
                timer={data.timer as number}
              />
            </Show>
          </div>
        </div>
        {/* actions */}
        <div class="flex gap-2">
          <Show when={data.status === CoinFlipGameStatus.JOINABLE}>
            <StylizedButton size="sm">JOIN</StylizedButton>
          </Show>
          <StylizedButton
            colorScheme="orange"
            variant="outline"
            size="sm"
            onClick={() =>
              actions.displayModal({
                name: "coinflip",
                gameid: data.id,
              })
            }
          >
            View
          </StylizedButton>
        </div>
      </div>
    </div>
  );
};

const Avatar = (props: AvatarProps) => {
  const { id, hasCoinBadge, side, pos, ...rest } = props;

  return (
    <div
      class="relative w-14 h-14 z-10"
      classList={{
        [rest.class as string]: true,
      }}
    >
      <img
        src={`https://avatars.steamstatic.com/${id}_full.jpg`}
        class="rounded-full"
        width={56}
        height={56}
      />

      <Show when={side != undefined}>
        <div
          class="absolute w-5 h-5"
          classList={{
            "top-2 -left-2": pos === "tl",
            "top-2 -right-2": pos === "tr",
            "bottom-2 -left-2": pos === "bl",
            "bottom-2 -right-2": pos === "br",
          }}
        >
          <img
            src={`${
              side === "red"
                ? "https://rustchance.com/static/media/red_side.1d169258.png"
                : "https://rustchance.com/static/media/blue_side.167bac47.png"
            }`}
            width={20}
            height={20}
          />
        </div>
      </Show>
    </div>
  );
};

const Coin = (props: CoinProps) => {
  const { type } = props;

  return (
    <div class="-translate-x-3 w-14 h-14 rounded-full overflow-hidden">
      <img
        src={`${
          type === "red"
            ? "https://rustchance.com/static/media/red_side.1d169258.png"
            : "https://rustchance.com/static/media/blue_side.167bac47.png"
        }`}
        class="w-14 h-14"
        width={56}
        height={56}
      />
    </div>
  );
};

const PriceCard = (props: PriceCardProps) => {
  const { totalPrice, diff, isFinished } = props;
  return (
    <div class="flex flex-col justify-center items-center whitespace-nowrap">
      <span class="text-sm font-semibold leading-loose">$ {totalPrice()}</span>
      <Show when={!isFinished}>
        <span class="text-xs text-site-330">
          {((totalPrice() * (100 - diff)) / 100).toFixed(2)} -{" "}
          {((totalPrice() * (100 + diff)) / 100).toFixed(2)}
        </span>
      </Show>
    </div>
  );
};

const Item = (props: ItemProps) => {
  const { id, price } = props;
  const [isTooltipShow, setIsTooltipShow] = createSignal(false);

  const item = getItemModel(id);
  const itemBG = ItemBGImages[item?.color as ItemBackgroundImageType];

  return (
    <div
      class={`flex items-center justify-center min-w-28 h-23 rounded ${itemBG}`}
      onMouseEnter={() => setIsTooltipShow(true)}
      onMouseLeave={() => setIsTooltipShow(false)}
    >
      <div class="w-full h-ful flex flex-col items-center justify-center">
        <img src={`${ITEM_IMAGE_URL}/${item?.image}/80fx50f`} />
        <span class="text-xs leading-3">${price / 20}</span>
      </div>

      {/* tooltip */}
      <div
        class="inline-block absolute z-10 px-2 py-1 text-xs font-medium text-white bg-site-550 rounded shadow-sm transition duration-500 tooltip dark:bg-gray-500"
        classList={{
          "opacity-100 -translate-y-14": isTooltipShow(),
          "opacity-0 -translate-y-12": !isTooltipShow(),
        }}
      >
        {item?.name}
        <div class="absolute left-[calc(50%_-_2px)] -bottom-1 bg-inherit w-2 h-2 invisible before:visible before:content-[''] before:rotate-45 before:bg-inherit before:w-2 before:h-2 before:absolute"></div>
      </div>
    </div>
  );
};

export default GameListItem;
