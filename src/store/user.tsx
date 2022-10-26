import { createContextProvider } from "@solid-primitives/context";
import { Component, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { createStore } from "solid-utils";

export interface CompactProfile {
    id: number;
    steamid: string;
    username: string;
    avatar: string;
    level: number;
    rank: number;
}

export type User = {
    experience: number;
    balance: number;
} & Omit<CompactProfile, "level">;

export type LoadingProfile = {
    loading: true;
}

export type AuthenticatedProfile = {
    loading: false;
    authenticated: true;
    profile: User;
}

export type UnauthenticatedProfile = {
    loading: false;
    authenticated: false;
}

export type CurrentUser = LoadingProfile | AuthenticatedProfile | UnauthenticatedProfile;

export const isAuthenticatedProfile = (p: CurrentUser): p is AuthenticatedProfile => (!p.loading && p.authenticated);
export const isUnauthenticatedProfile = (p: CurrentUser): p is UnauthenticatedProfile => (!p.loading && !p.authenticated);
/*
const [UserProvider, useUserContext] = createContextProvider(
    () => {
        const [user, setUser] = createStore<CurrentUser>({ loading: true });

        const loadUser = () => {
            setUser({
                loading: false,
                authenticated: true,
                profile: {
                    id: 1,
                    steamid: 'sadasd',
                    username: 'foigjodifgj',
                    avatar: 'https://avatars.steamstatic.com/6293098db568fafd849388410fdb075fd19e577a_full.jpg',
                    experience: 5453,
                    rank: 2
                }
            })
        };

        const addExperience = (amount: number) => {
            setUser((prev) => {
                if (isAuthenticatedProfile(prev)) {
                    console.log(`yesa`, prev)
                    const newUser = Object.assign({}, prev);
                    newUser.profile.experience = prev.profile.experience + amount;
                    return newUser
                }
                return prev
            });

            if (!user.loading && user.authenticated) {
                //setUser()
            }
        };

        return {
            user,
            addExperience,
            loadUser
        };
    }
);

export { UserProvider, useUserContext };
*/


interface Actions {
    loadUser: () => void;
    incrementExperience: (amount: number) => void;
    incrementBalance: (amount: number) => void;
}

const [UserProvider, useUserContext] = createStore<CurrentUser, Actions, {}>({
    state: () => ({ loading: true }),

    actions: (set, get) => ({
        loadUser() {
            set({
                loading: false,
                authenticated: true,
                profile: {
                    id: 1,
                    steamid: 'sadasd',
                    username: 'foigjodifgj',
                    avatar: 'https://avatars.steamstatic.com/6293098db568fafd849388410fdb075fd19e577a_full.jpg',
                    experience: 5603,
                    balance: 0,
                    rank: 2
                }
            });
        },
        incrementExperience(amount: number) {
            // @ts-ignore
            set("profile", "experience", e => e + amount);
        },
        incrementBalance(amount: number) {
            // @ts-ignore
            set("profile", "balance", e => e + amount);
        }
    })
});

export { UserProvider, useUserContext };