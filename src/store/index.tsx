import {
  ParentComponent,
  createContext,
  createEffect,
  createResource,
  useContext,
  createSignal,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Meta, Title } from "solid-meta";
import { useLocation } from "solid-app-router";
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { ChatProvider } from "./chat";
import { UserProvider } from "./user";
import { JackpotProvider } from "./jackpot";
import { CoinFlipProvider } from "./coinflip";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const langs: { [lang: string]: () => Promise<any> } = {
  en: async () => (await import("../../lang/en/en")).default(),
  ru: async () => (await import("../../lang/ru/ru")).default(),
};

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = {
  fil: "tl",
};

type DataParams = {
  locale: string;
};

const AppContextProvider: ParentComponent = (props) => {
  /* i18n */
  const i18n = createI18nContext({}, "en" as string);
  const [t, { add, locale }] = i18n;
  const params = (): DataParams => {
    const locale = i18n[1].locale();

    if (locale in langAliases) {
      return { locale: langAliases[locale] };
    }

    return { locale };
  };

  const [lang] = createResource(params, ({ locale }) => langs[locale]());

  createEffect(() => {
    if (!lang.loading) add(i18n[1].locale(), lang() as Record<string, any>);
  });

  createEffect(() => {
    document.documentElement.lang = locale();
  });

  return (
    <UserProvider>
      <JackpotProvider>
        <CoinFlipProvider>
          <ChatProvider>
            <I18nContext.Provider value={i18n}>
              <Title>fdgdfg</Title>
              <Meta name="lang" content={locale()} />
              {props.children}
            </I18nContext.Provider>
          </ChatProvider>
        </CoinFlipProvider>
      </JackpotProvider>
    </UserProvider>
  );
};

export default AppContextProvider;
