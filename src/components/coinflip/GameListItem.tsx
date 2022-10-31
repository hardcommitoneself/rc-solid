import {
  createEffect,
  createSignal,
  JSX,
  mapArray,
  Match,
  Show,
  Switch,
} from "solid-js";
import { GameDataType } from "src/pages/Coinflip";
import { getItemModel, SiteItem, SteamItem } from "src/store/items";
import { StylizedButton } from "src/components/ui/Button";
import { CountdownCircleProgress } from "src/components/ui/Progress";

type SideType = "blue" | "red";
type CoinType = "blue" | "red";
type CoinPosType = "tl" | "tr" | "bl" | "br";
type ItemBackgroundImageType = "f15840" | "a7ec2e" | "35a3f1";

interface GameListItemProps {
  data: GameDataType;
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
  totalValue: number;
  estFrom: number;
  estTo: number;
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
  f15840: "bg-item-bg-f15840",
  a7ec2e: "bg-item-bg-a7ec2e",
  "35a3f1": "bg-item-bg-35a3f1",
};

const GameListItem = (props: GameListItemProps) => {
  const { data } = props;
  const [items, setItems] = createSignal<SiteItem[]>([]);

  createEffect(() => {
    setItems(
      [...(data.blue_side?.items || []), ...(data.red_side?.items || [])].slice(
        0,
        5
      )
    );
  });

  const mappedItemsList = mapArray(items, (item) => {
    return <Item id={item[0]} price={item[1]} />;
  });

  return (
    <div class="flex gap-5 p-2.5 h-[90px] bg-site-900 rounded">
      {/* left side */}
      <div class="w-3/5 flex items-center gap-14">
        {/* avatar of blue and red */}
        <div class="w-40 flex items-center justify-center">
          <Switch>
            <Match when={!!data.blue_side && !!data.red_side}>
              <Show when={data.status !== "joinable"}>
                <div class="flex items-center gap-1">
                  <Avatar
                    id={data.blue_side?.avatar}
                    hasCoinBadge={true}
                    side="blue"
                    pos="br"
                  />
                  <img
                    src="data:image/png;base64,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"
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
        <div class="grid md:grid-cols-4 xl:grid-cols-6 gap-2.5">
          {mappedItemsList}
        </div>
      </div>

      {/* right side */}
      <div class="flex items-center justify-between w-2/5">
        {/* price and status */}
        <div class="flex gap-10">
          <PriceCard
            totalValue={174.32}
            estFrom={173.21}
            estTo={178.3}
            isFinished={data.status === "finished"}
          />
          {/* status */}
          <Show when={data.status === "finished"}>
            <Avatar
              class="ml-5"
              id={data.red_side?.avatar}
              hasCoinBadge={true}
              side="red"
              pos="tl"
            />
          </Show>
          <Show when={data.status === "waiting"}>
            <CountdownCircleProgress
              size="md"
              variant="orange"
              duration={100}
            />
          </Show>
          <Show when={data.status === "joined"}>
            <CountdownCircleProgress size="md" variant="green" duration={100} />
          </Show>
        </div>
        {/* actions */}
        <div class="flex gap-2">
          <Show when={data.status === "joinable"}>
            <StylizedButton>JOIN</StylizedButton>
          </Show>
          <StylizedButton color="orange" variant="outline">
            VIEW
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
      classList={{
        "relative w-14 h-14 z-10": true,
        [rest.class as string]: true,
      }}
    >
      <img
        src={`https://avatars.steamstatic.com/${id}_full.jpg`}
        class="rounded-full"
        width={56}
        height={56}
      />

      <Show when={side}>
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
  const { totalValue, estFrom, estTo, isFinished } = props;
  return (
    <div class="flex flex-col justify-center items-center">
      <span class="text-sm font-semibold leading-loose">$ {totalValue}</span>
      <Show when={!isFinished}>
        <span class="text-xs text-site-330">
          {estFrom} - {estTo}
        </span>
      </Show>
    </div>
  );
};

const Item = (props: ItemProps) => {
  const { id, price } = props;

  const item = getItemModel(id);
  const itemBG = ItemBGImages[item?.color as ItemBackgroundImageType];

  return (
    <div
      class={`flex items-center justify-center min-w-[90px] h-[70px] rounded ${itemBG}`}
    >
      <div class="w-full h-ful flex flex-col items-center justify-center">
        <img src={`${ITEM_IMAGE_URL}/${item?.image}/80fx50f`} />
        <span class="text-xs leading-3">${price / 20}</span>
      </div>
    </div>
  );
};

export default GameListItem;
