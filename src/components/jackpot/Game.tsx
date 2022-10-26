import { For } from 'solid-js';
import { levelToColor } from 'src/experience';
import { JackpotDeposit, JackpotGame } from 'src/store/jackpot';
import { priceFormatter } from 'src/utils';
import { darken } from 'polished';

const Deposit = (props: JackpotDeposit) => {
    const color = levelToColor(props.profile.level);

    return (
        <div class="grid grid-cols-4 p-2 text-gray-50 bg-site-700 odd:bg-site-600">
            <div class="col-span-2 flex items-center gap-x-2">
                <img src={`https://avatars.steamstatic.com/${props.profile.avatar}_full.jpg`} class="w-8 h-8 shadow rounded-full border border-site-600" />
                <span class="flex-shrink-0 rounded px-1.5 py-0.5 tracking-wide font-medium text-xs" style={{background: `linear-gradient(to top, ${darken(0.1, color)}, ${color})`}}>{props.profile.level}</span>
                <span class="font-medium text-sm">{props.profile.username}</span>
            </div>
            <div class="flex items-center justify-end">
                <span class="text-sm">{priceFormatter.format(props.value/100)}</span>
            </div>
            <div class="flex items-center justify-end">
                <span class="text-sm">0.00%</span>
            </div>
        </div>
    );
}

const Game = (props: JackpotGame) => {

    return (
        <div class="flex flex-col">
            {props.id}
            <div class="w-full flex flex-col">
                <For each={props.deposits}>
                    {deposit => <Deposit {...deposit} />}
                </For>
            </div>
        </div>
    );
};

export default Game;