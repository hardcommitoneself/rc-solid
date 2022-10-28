import { Suspense, createSignal, createResource, Switch, Match, createReaction, Component, lazy } from 'solid-js';
import { useRoutes, Router } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';

import { Header } from '~components/layout';
import { Chat } from '~components/chat';

import AppContextProvider from '~store';
import { useChat } from './store/chat';
import { CompactSteamItem, ItemDatabase, SteamItem } from './store/items';
import { routes } from './routes';

async function fetchData() {
  const response = await fetch(`https://rustchance.com/items.json`)
  const data = await response.json();
  return data;
}

const Main: Component = () => {
  const AppRoutes = useRoutes(routes);
  const { opened } = useChat()!;

  return (
    <div class="h-full flex overflow-hidden">
      <main class="w-full overflow-hidden transition-[margin-right]" classList={{ "mr-[var(--sidebar-width)]": opened() }}>
        <Suspense>
          <AppRoutes />
        </Suspense>
      </main>
      <Chat />
    </div>
  );
}

const App = () => {
  const [items] = createResource<CompactSteamItem[]>(fetchData);

  const track = createReaction(() => {
    let list = items();
    if (list) {
      for (const item of list) {
        ItemDatabase.set(item.i, {
          image: item.m,
          name: item.n,
          price: item.p,
          color: item.c
        });
      }
    }
  });

  track(() => items());

  return (
    <MetaProvider>
      <main class="flex h-full flex-col overflow-hidden">
        <Switch>
          <Match when={items.loading}>
            <span>loading</span>
          </Match>
          <Match when={!items.loading}>
            <Router>
              <AppContextProvider>
                <Header />
                <Main />
              </AppContextProvider>
            </Router>
          </Match>
        </Switch>
      </main>
    </MetaProvider>
  );
};

export default App;
