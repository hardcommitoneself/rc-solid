import { TbClock } from "solid-icons/tb";
import { Match, Switch } from "solid-js";
import { isAuthenticatedProfile, isUnauthenticatedProfile, useUserContext } from "src/store/user";
import { matches } from "src/utils";

const Footer = () => {
    const [user] = useUserContext()!;

    return (
        <div class="px-3">
            <Switch fallback={<span>Loading...</span>}>
                <Match when={matches(user, isAuthenticatedProfile)}>
                    <div class="flex flex-col w-full">
                        <input placeholder="Write your message.." class="text-sm font-medium bg-site-600 border border-site-600 rounded overflow-hidden w-full p-2 shadow focus:ring-primary" />
                        <div class="h-8 flex items-center">
                            <div class="flex items-center text-site-300 gap-x-2">
                                <TbClock class="w-4 h-4" />
                                <span class="text-xs font-medium">Slowmode enabled</span>
                            </div>
                        </div>
                    </div>
                </Match>
                <Match when={matches(user, isUnauthenticatedProfile)}>
                    <span>login</span>
                </Match>
            </Switch>
        </div>
    )
}

export default Footer;