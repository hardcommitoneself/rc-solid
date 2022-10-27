import { lazy, Component } from 'solid-js';
import { RouteDefinition, Navigate, useParams, Outlet } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';

const LangSwitchWrapper: Component = () => {
    const params = useParams();
    const [t, { locale }] = useI18n();

    const lang = params.lang;
    locale(lang);

    // set lang to local storage
    localStorage.setItem("lang", lang);

    return (
        <>
            <Outlet />
        </>
    );
}

const RedirectLangWrapper: Component = () => {
    // get lang from local storage
    const lang = localStorage.getItem("lang");

    return <Navigate href={`/${lang}`} />
}

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: RedirectLangWrapper
    },
    {
        path: "/:lang",
        component: LangSwitchWrapper,
        children: [
            {
                path: '/',
                component: lazy(() => import('./pages/Jackpot')),
            },
            {
                path: '/coinflip',
                component: lazy(() => import('./pages/Coinflip')),
            }
        ]
    }
];