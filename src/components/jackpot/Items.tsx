import { createEffect, createMemo, createSignal, For } from 'solid-js';
import { CompactSteamItem, getItemModel, SiteItem, SteamItem } from 'src/store/items';
import { JackpotDeposit } from 'src/store/jackpot';
import s from './Jackpot.module.css';

type ItemProps = {
    item: SiteItem;
    color: string;
    username: string;
    avatar: string;
}

const Item = (props: ItemProps) => {
    const item = createMemo(() => getItemModel(props.item[0]));

    return (
        <div class="snap-start flex-shrink-0 m-1 relative rounded overflow-hidden w-36 h-24">
            <div class="flex flex-col items-center bg-site-700 w-full h-full">
                <div class="absolute bottom-0 h-0.5 w-full" style={`background: ${props.color} none repeat scroll 0% 0%;`}></div>
                <div class={s.itemOverlay} style={`background: rgba(0, 0, 0, 0) radial-gradient(${props.color}, transparent 80%) repeat scroll 0% 0%;`}></div>
                <div class="flex items-center text-xs p-1 w-36">
                    <img src={`https://avatars.steamstatic.com/${props.avatar}_full.jpg`} class="w-5 object-cover rounded-full mr-1" alt={props.username} />
                    <span class="truncate text-gray-300 font-medium">{props.username}</span>
                </div>
                <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 drop-shadow" src={`https://community.cloudflare.steamstatic.com/economy/image/${item()?.image}/90fx90f`} alt={item()?.name} />
                <span class="absolute bottom-1 text-xs text-center w-36 z-10 text-gray-300 font-medium">{item()?.name}</span>
            </div>
        </div>
    );
};

type ItemsProps = {
    deposits: JackpotDeposit[];
}

const Items = (props: ItemsProps) => {
    return (
        <div class="relative border-b border-site-600 h-32">
            <div class="absolute top-0 left-0 h-32 w-32 bg-gradient-to-r from-site-800 to-transparent z-20" />
            <div class="absolute top-0 right-0 h-32 w-32 bg-gradient-to-l from-site-800 to-transparent z-20" />
            <div class="scroll-pl-3 snap-x flex py-3 overflow-x-auto overflow-y-hidden">
                <For each={props.deposits}>
                    {deposit => (
                        <For each={deposit.items}>
                            {item => (
                                <Item
                                    color={deposit.color}
                                    username={deposit.profile.username}
                                    avatar={deposit.profile.avatar}
                                    item={item}
                                />
                            )}
                        </For>
                    )}
                </For>
            </div>
        </div>
    );
};

export default Items;