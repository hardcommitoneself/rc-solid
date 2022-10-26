import { lazy } from 'solid-js';
import { RouteDefinition, Navigate } from 'solid-app-router';

export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: lazy(() => import('./pages/Jackpot')),
    },
    {
        path: '/coinflip',
        component: lazy(() => import('./pages/Coinflip')),
    }
];