import { useI18n } from "@solid-primitives/i18n";
import { createEffect, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-meta";
import { JackpotGame, useJackpotContext } from "src/store/jackpot";
import { Game, Items, Stats, Wheel } from "~components/jackpot";
import { Announcement } from "~components/layout";

interface CurrentJackpotGame extends JackpotGame {
    totalValue: number;
    totalItems: number;
}

const Jackpot = () => {
    const [t] = useI18n();
    //const Routes = useRoutes(routes);
  
    //preventSmoothScrollOnTabbing();

    const [state] = useJackpotContext();

    const [currentGame, setCurrentGame] = createStore<CurrentJackpotGame>({
        totalItems: 0,
        totalValue: 0,
        ...state.current
    });

    createEffect(() => {
        
    });
  
    return (
        <>
            <Title>{t('global.jackpot', {}, 'Jackpot')}</Title>
        
            <Items deposits={state.current.deposits} />
            <div class="flex w-full p-5">
                <Wheel deposits={state.current.deposits} />
                <div class="w-full ml-6">
                    <Announcement />
                    <Stats deposits={state.current.deposits} />
                    <Game
                        id={state.current.id}
                        deposits={state.current.deposits}
                    />
                </div>
            </div>
        </>
    );
  };
  
  export default Jackpot;