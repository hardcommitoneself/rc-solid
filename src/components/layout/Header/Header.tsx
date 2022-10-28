import { useI18n } from "@solid-primitives/i18n";
import { NavLink } from "solid-app-router";
import { Profile, UserBalance } from "~components/layout";
import logo from '../../../assets/logo-01.png';

const Header = () => {
    const [t, { locale }] = useI18n();

    return (
        <header class="flex-shrink-0 h-28 bg-site-900 overflow-hidden flex flex-col">
            <div class="flex h-8 flex-shrink-0">
                <div class="w-full flex space-x-5 items-center px-4">
                    <a href="#" class="text-site-300 text-opacity-60 hover:text-opacity-100 font-semibold text-sm tracking-wide transition-colors">{t('global.terms_of_service')}</a>
                    <a href="#" class="text-site-300 text-opacity-60 hover:text-opacity-100 font-semibold text-sm tracking-wide transition-colors">{t('global.privacy_policy')}</a>
                    <a href="#" class="text-site-300 text-opacity-60 hover:text-opacity-100 font-semibold text-sm tracking-wide transition-colors">{t('global.fairness')}</a>
                    <a href="#" class="text-site-300 text-opacity-60 hover:text-opacity-100 font-semibold text-sm tracking-wide transition-colors">{t('global.affiliates')}</a>
                    <a href="#" class="text-site-300 text-opacity-60 hover:text-opacity-100 font-semibold text-sm tracking-wide transition-colors">{t('global.support')}</a>
                </div>
                {/*<div class="w-[var(--sidebar-width)] flex-shrink-0 border-l border-site-600"></div>*/}
            </div>
            <div class="flex flex-grow border-b border-t border-site-600">
                <div class="flex w-full px-4" style={{ "background": "radial-gradient(at top,#181e2e,#0f1322)" }}>
                    <a href="#" class="w-48 h-full flex items-center">
                        <img src={logo} class="object-contain" />
                    </a>
                    <nav class="ml-4 h-full flex">
                        <NavLink href={`${locale()}/`} class="flex flex-col justify-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="mt-1 text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">{t('global.high_rollers')}</span>
                            <span class="text-primary text-xs font-semibold tracking-wider mt-0.5">$1,235.56</span>
                        </NavLink>
                        <NavLink href={`${locale()}/low-ballers`} class="flex flex-col justify-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="mt-1 text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">{t('global.low_ballers')}</span>
                            <span class="text-primary text-xs font-semibold tracking-wider mt-0.5">$1,235.56</span>
                        </NavLink>
                        <NavLink href={`${locale()}/coinflip`} class="flex flex-col justify-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="mt-1 text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">{t('global.coinflip')}</span>
                            <span class="text-primary text-xs font-semibold tracking-wider mt-0.5">$1,235.56</span>
                        </NavLink>
                        <NavLink href={`${locale()}/roulette`} class="flex flex-col justify-center items-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">{t('global.roulette')}</span>
                        </NavLink>
                        <NavLink href={`${locale()}/crash`} class="flex flex-col justify-center items-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">{t('global.crash')}</span>
                        </NavLink>
                        <NavLink href={`${locale()}/ui`} class="flex flex-col justify-center items-center tracking-wide px-4 group" activeClass="bg-site-600 bg-opacity-30" end>
                            <span class="text-gray-300 capitalize text-xl font-medium group-hover:text-gray-100 transition-colors">UI</span>
                        </NavLink>
                    </nav>
                    {/*<UserBalance />*/}
                </div>
                <div class="ml-auto">
                    <Profile />
                </div>
            </div>
        </header>
    );
}

export default Header;