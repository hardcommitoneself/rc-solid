import { useI18n } from "@solid-primitives/i18n";
import { createEffect, createSelector, createSignal } from "solid-js";
import { JackpotDeposit, useJackpotContext } from "src/store/jackpot";
import { useUserContext } from "src/store/user";
import { formatter, priceFormatter } from "src/utils";
import { StylizedButton } from "~components/ui/Button";

type StatsData = {
    chance: number;
    value: number;
    items: number;
}

type StatsProps = {
    deposits: JackpotDeposit[];
}

const Stats = (props: StatsProps) => {
    const [t] = useI18n();
    const [user] = useUserContext();
    const [stats, setStats] = createSignal<StatsData>({ chance: 0, value: 0, items: 0 });
    const [_, { newDeposit }] = useJackpotContext();

    createEffect(() => {
        let chance = 0, totalValue = 0, value = 0, items = 0;

        let userId = !user.loading && user.authenticated ? user.profile.id : 0;

        for (const deposit of props.deposits) {
            totalValue += deposit.value;
            if (deposit.profile.id === userId) {
                value += deposit.value;
                items += deposit.items.length;
            }
        }

        chance = (value * 100) / totalValue;

        if (value !== stats().value || items !== stats().items) {
            setStats({ chance, value, items });
        }
    });

    function join() {
        console.log('new deposit')
        newDeposit(
            {
                id: +Date(),
                profile: {
                    id: 1,
                    username: "foigjodifgj",
                    avatar: "6293098db568fafd849388410fdb075fd19e577a",
                    steamid: "76561199347663394",
                    level: 109,
                    rank: 0
                },
                color: "rgb(203,32,25)",
                value: 370,
                items: [[378, 370]]
            }
        )
    }

    return (
        <>
            <div class="flex my-4 gap-x-4">
                <div class="flex-1 flex-shrink-0 border-2 border-site-600 rounded h-24 flex flex-col items-center justify-center gap-y-1">
                    <span class="text-gray-50 text-xs font-light uppercase">{t('jackpot.your-chance')}</span>
                    <span class="text-gray-50 font-medium text-xl tracking-wide">{stats().chance.toFixed(2)}%</span>
                </div>
                <div class="flex-1 flex-shrink-0 border-2 border-site-600 rounded h-24 flex flex-col items-center justify-center gap-y-1">
                    <span class="text-gray-50 text-xs font-light uppercase">{t('jackpot.your-items')}</span>
                    <span class="text-gray-50 font-medium text-xl tracking-wide">{stats().items}</span>
                </div>
                <div class="flex-1 flex-shrink-0 border-2 border-site-600 rounded h-24 flex flex-col items-center justify-center gap-y-1">
                    <span class="text-gray-50 text-xs font-light uppercase">{t('jackpot.your-value')}</span>
                    <span class="text-gray-50 font-medium text-xl tracking-wide">{priceFormatter.format(stats().value / 100)}</span>
                </div>
            </div>
            <StylizedButton color="green" onClick={join}>{t('jackpot.join-game')}</StylizedButton>
        </>
    );
};

export default Stats;