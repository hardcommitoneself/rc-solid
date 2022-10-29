import {
  createEffect,
  createSignal,
  JSX,
  mapArray,
  Match,
  Switch,
} from "solid-js";
import { GameDataType } from "src/pages/Coinflip";
import { getItemModel, SiteItem, SteamItem } from "src/store/items";
import { StylizedButton } from "src/components/ui/Button";

type SideType = "blue" | "red";
type CoinType = "blue" | "red";
type ItemBackgroundImageType = "f15840" | "a7ec2e" | "35a3f1";

interface GameListItemProps {
  data: GameDataType;
}

interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  id?: string;
  hasCoinBadge: boolean;
  coin?: SideType;
}

interface CoinProps {
  type: CoinType;
}

interface PriceCardProps {
  totalValue: number;
  estFrom: number;
  estTo: number;
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
        <div class="relative flex">
          <Switch>
            <Match when={!!data.blue_side && !!data.red_side}>
              <>
                <Avatar
                  class="!z-20"
                  id={data.blue_side?.avatar}
                  hasCoinBadge={true}
                />
                <Avatar
                  class="!absolute ml-10"
                  id={data.red_side?.avatar}
                  hasCoinBadge={true}
                />
              </>
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
        <div class="flex gap-5">
          <PriceCard totalValue={174.32} estFrom={173.21} estTo={178.3} />
        </div>
        {/* actions */}
        <div class="flex gap-2">
          <StylizedButton>JOIN</StylizedButton>
          <StylizedButton color="orange" variant="outline">
            VIEW
          </StylizedButton>
        </div>
      </div>
    </div>
  );
};

const Avatar = (props: AvatarProps) => {
  const { id, hasCoinBadge, coin, ...rest } = props;
  return (
    <div
      classList={{
        "w-14 h-14 rounded-full overflow-hidden z-10": true,
        [rest.class as string]: true,
      }}
    >
      <img
        src={`https://avatars.steamstatic.com/${id}_full.jpg`}
        width={56}
        height={56}
      />
    </div>
  );
};

const Coin = (props: CoinProps) => {
  const { type } = props;

  return (
    <div class="absolute ml-10 w-14 h-14 rounded-full overflow-hidden">
      <img
        src={`${
          type === "blue"
            ? "https://rustchance.com/static/media/red_side.1d169258.png"
            : "https://rustchance.com/static/media/blue_side.167bac47.png"
        }`}
        width={56}
        height={56}
      />
    </div>
  );
};

const PriceCard = (props: PriceCardProps) => {
  const { totalValue, estFrom, estTo } = props;
  return (
    <div class="flex flex-col justify-center items-center">
      <span class="text-sm font-semibold leading-loose">$ {totalValue}</span>
      <span class="text-xs text-site-330">
        {estFrom} - {estTo}
      </span>
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

const State = () => {
  return <div></div>;
};

export default GameListItem;
