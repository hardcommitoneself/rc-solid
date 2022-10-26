import { createEffect, createSignal, Match, Switch } from "solid-js";
import { isAuthenticatedProfile, isUnauthenticatedProfile, useUserContext, User } from "src/store/user";
import { formatter, matches } from "src/utils";
import { TbBell, TbLogout } from "solid-icons/tb";
import { experienceToLevel } from "src/experience";
import { darken } from 'polished';
import IconFlame from "../IconFlame";

const NewUserProfile = (props: User) => {
    const [lvl, setLevel] = createSignal(experienceToLevel(props.experience));

    createEffect(() => {
        const lvlData = experienceToLevel(props.experience);
        setLevel(lvlData);
    });

    return (
        <div class="flex items-center gap-x-4 px-3">
            <div class="flex">
                <div class="bg-site-900 border border-site-600 rounded-l h-10 flex items-center min-w-[120px]">
                    <IconFlame class="w-3.5 mx-2.5" />
                    <span class="text-gray-100 mr-3 tracking-wider text-lg font-medium flex-1 text-right">{formatter.format(props.balance / 100)}</span>
                </div>
                <button class="bg-gradient-to-br from-green-600 to-green-700 h-10 rounded-r px-2 text-sm font-semibold uppercase">Deposit</button>
            </div>

            <TbBell class="w-6 h-6 text-site-300 transition-opacity opacity-60 hover:opacity-100" />

            <div class="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <img src={props.avatar} class="rounded-full w-14 h-14 shadow-md m-2 border-4 border-site-900" />
                <span class="absolute tracking-wide font-medium text-sm bottom-0 left-0 ring ring-site-800 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to top, ${darken(0.1, lvl().color)}, ${lvl().color})` }}>{lvl().level}</span>
            </div>
        </div>
    );
}

const UserProfile = (props: User) => {
    const [lvl, setLevel] = createSignal(experienceToLevel(props.experience));

    createEffect(() => {
        const lvlData = experienceToLevel(props.experience);
        setLevel(lvlData);
    });

    return (
        <div class="flex items-center gap-x-4 w-full max-w-xs">
            <img src={props.avatar} class="rounded w-12 h-12 shadow-md border border-site-700" />
            <div class="flex flex-col w-full gap-y-2.5">
                <div class="flex items-center">
                    <span class="flex-1 font-medium tracking-wide">{props.username}</span>
                    <span class="flex-shrink-0 rounded px-1.5 py-0.5 tracking-wide font-medium text-sm" style={{ background: `linear-gradient(to top, ${darken(0.1, lvl().color)}, ${lvl().color})` }}>{lvl().level}</span>
                </div>
                <div class="relative bg-site-600 h-1 rounded-full w-full">
                    <div class="bg-primary h-1 rounded-full transition-all" style={{ width: lvl().percentage + '%' }} />
                </div>
            </div>
            <TbLogout class="w-6 h-6 text-site-300 opacity-60" />
        </div>
    );
}

const Profile = () => {
    //const ctx = useUserContext()!;
    const [user] = useUserContext();

    return (
        <div class="h-full flex items-center justify-center bg-site-800 text-gray-100">
            <Switch fallback={<span>Loading...</span>}>
                <Match when={matches(user, isAuthenticatedProfile)}>
                    {({ profile }) => <NewUserProfile {...profile} />}
                </Match>
                <Match when={matches(user, isUnauthenticatedProfile)}>
                    <span>login</span>
                </Match>
            </Switch>
        </div>
    );
}

export default Profile;