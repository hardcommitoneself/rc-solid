import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { isAuthenticatedProfile, isUnauthenticatedProfile, useUserContext, User } from "src/store/user";
import { formatter, matches } from "src/utils";
import { TbLogout } from "solid-icons/tb";
import { experienceToLevel } from "src/experience";
import { darken } from 'polished';
import IconFlame from "../IconFlame";
  

const Balance = () => {
    //const ctx = useUserContext()!;
    const [user] = useUserContext();

    return (
        <>
            <Show when={matches(user, isAuthenticatedProfile)}>
                {({ profile }) => (
                    <div class="ml-auto h-full flex items-center">
                        <div class="bg-site-900 border border-site-600 rounded-l h-10 flex items-center min-w-[120px]">
                            <IconFlame class="w-3.5 mx-2.5" />
                            <span class="text-gray-100 mr-3 tracking-wider text-lg font-medium flex-1 text-right">{formatter.format(profile.balance/100)}</span>
                        </div>
                    </div>
                )}
            </Show>
        </>
    );
}

export default Balance;