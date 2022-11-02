import { createContextProvider } from "@solid-primitives/context";
import { Component, createSignal } from "solid-js";
import { createStore } from "solid-utils";
import { SiteItem, SteamItem } from "./items";
import { CompactProfile } from "./user";

/*

{"room":"jackpot","type":"list","data":{
    "rolling":false,
    "current":{
        "id":1150369,
        "expires":1660725678,
        "hash":"7cbcf81f4892e7b5107ed24e100a35adfbbfb67b4b3cf77fbc6c6506d4646db1",
        "deposits":[
            {"id":5785241,"user_id":601460,"name":"? rustchance.com","avatar":"d8e1659736128951135d6e74a99e8705de799c96","steamid":"76561199347663394","color":"rgb(171,200,11)","level":45,"value":675,"items":[[2605,370],[2378,154],[1024,151]]},
            {"id":5785245,"user_id":219904,"name":"poseidon ⚡#****GG","avatar":"6684adef23e4c39ecc8c4fee8e0ad4b957a9a04b","steamid":"76561198857393506","color":"rgb(119,91,168)","level":60,"value":288,"items":[[1498,161],[2706,127]]}]
        },
        "history":[
            {"id":1150364,"expires":1660725188,"winner":"76561199004222440","hash":"dd476133985af6d0528603fa30d30b154410a234c37a451a89be38182db25798","secret":"xW1qRRmZTX","seed":"EL%*QYWMCdNkowQFPr#|","ticketNumber":2900,"serialNumber":7686256,"mod":"xW1qRRmZTX-EL%*QYWMCdNkowQFPr#|","percentage":"85.59622195985833","deposits":[{"id":5785224,"user_id":175604,"name":"cheeKy9 rustchance.com","avatar":"61ceebcc24dd5409e1acdfb3f2417fffa42eccb9","steamid":"76561198973480580","color":"rgb(50,72,245)","level":19,"value":559,"items":[[1800,559]]},{"id":5785225,"user_id":380286,"name":"Broom rustchance.com","avatar":"cd4157d04df12423a05cf2107a9d9143cd7ad182","steamid":"76561199059412651","color":"rgb(139,72,214)","level":38,"value":1211,"items":[[610,631],[2846,290],[2846,290]]},{"id":5785226,"user_id":601460,"name":"? rustchance.com","avatar":"d8e1659736128951135d6e74a99e8705de799c96","steamid":"76561199347663394","color":"rgb(171,200,11)","level":45,"value":370,"items":[[2605,370]]},{"id":5785227,"user_id":185978,"name":"Kabi🍀 rustchance.com","avatar":"fcdc86d8940b34767a8eb46106ffdd43825c494a","steamid":"76561199016922743","color":"rgb(146,39,170)","level":67,"value":338,"items":[[2617,338]]},{"id":5785228,"user_id":444999,"name":"Lil Wayne RustChance.com","avatar":"ca1d952d10b6b6a51865f506a89f0841d5665a45","steamid":"76561197998399247","color":"rgb(84,104,218)","level":29,"value":377,"items":[[1695,377]]},{"id":5785229,"user_id":230710,"name":"Yazan$$","avatar":"95d8f1c00bbdc43e289e494f3dad027a6f930ac4","steamid":"76561199004222440","color":"rgb(214,34,240)","level":23,"value":533,"items":[[2566,533]]}]},{"id":1150366,"expires":1660725329,"winner":"76561199347663394","hash":"b2a983f6200740cb152e29bae87d4d55e86a978348df8b0b2cbc3652c0db9e4d","secret":"7PuKBZ5abj","seed":":tg]%nJj:HWS_p(!oMC%","ticketNumber":963,"serialNumber":7686263,"mod":"7PuKBZ5abj-:tg]%nJj:HWS_p(!oMC%","percentage":"61.73076923076923","deposits":[{"id":5785231,"user_id":601460,"name":"? rustchance.com","avatar":"d8e1659736128951135d6e74a99e8705de799c96","steamid":"76561199347663394","color":"rgb(171,200,11)","level":45,"value":305,"items":[[2378,154],[1024,151]]},{"id":5785233,"user_id":185978,"name":"Kabi🍀 rustchance.com","avatar":"fcdc86d8940b34767a8eb46106ffdd43825c494a","steamid":"76561199016922743","color":"rgb(146,39,170)","level":67,"value":629,"items":[[3470,629]]},{"id":5785235,"user_id":601460,"name":"? rustchance.com","avatar":"d8e1659736128951135d6e74a99e8705de799c96","steamid":"76561199347663394","color":"rgb(171,200,11)","level":45,"value":626,"items":[[2605,370],[2634,256]]}]},{"id":1150368,"expires":1660725421,"winner":"76561197998399247","hash":"29b5e2a54cb3279ce15d6f65159174ca53c92ed39de40a5f210ac820e6332ee8","secret":"XDiRD0zmue","seed":"+LMF_wxYP%nbc:P[l%up","ticketNumber":434,"serialNumber":7686267,"mod":"XDiRD0zmue-+LMF_wxYP%nbc:P[l%up","percentage":"18.128654970760234","deposits":[{"id":5785236,"user_id":444999,"name":"Lil Wayne RustChance.com","avatar":"ca1d952d10b6b6a51865f506a89f0841d5665a45","steamid":"76561197998399247","color":"rgb(84,104,218)","level":29,"value":900,"items":[[2797,900]]},{"id":5785237,"user_id":529329,"name":"HeLL rustchance.com","avatar":"7f1cbca1bdfea768cc39a6c9e9c3b58e237c180d","steamid":"76561198234912376","color":"rgb(213,12,238)","level":44,"value":284,"items":[[3549,167],[3108,117]]},{"id":5785238,"user_id":219904,"name":"poseidon ⚡#****GG","avatar":"6684adef23e4c39ecc8c4fee8e0ad4b957a9a04b","steamid":"76561198857393506","color":"rgb(119,91,168)","level":60,"value":1210,"items":[[893,103],[893,103],[893,103],[2762,97],[2762,97],[2762,97],[2762,97],[2762,97],[2762,97],[2762,97],[2762,97],[896,66],[3077,59]]}]}],
        "settings":
            {"disabled":false,"userMaxItems":20,"userMinItems":1,"userMinValue":150,"userMaxDeposits":2,"minItemValue":20,"gameMaxItems":100,"gameRoundTime":90,"casinoPercentage":10,"secondCasinoPercentage":10,"nameDiscount":5}}}
*/

type JackpotDeposit = {
  id: number;
  profile: CompactProfile;
  color: string;
  value: number;
  items: SiteItem[];
};

type JackpotGame = {
  id: number;
  deposits: JackpotDeposit[];
};

type JackpotState = {
  current: JackpotGame;
  history: JackpotGame[];
};

type Actions = {
  newDeposit: (deposit: JackpotDeposit) => void;
};

const [JackpotProvider, useJackpotContext] = createStore<
  JackpotState,
  Actions,
  {}
>({
  state: () => ({
    current: {
      id: 34,
      deposits: [
        {
          id: 5785241,
          profile: {
            id: 601460,
            username: "? rustchance.com",
            avatar: "d8e1659736128951135d6e74a99e8705de799c96",
            steamid: "76561199347663394",
            level: 34,
            rank: 0,
          },
          color: "rgb(171,200,11)",
          value: 675,
          items: [
            [2605, 370],
            [2378, 154],
            [1024, 151],
          ],
        },
        {
          id: 5785241,
          profile: {
            id: 353453,
            username: "poseidon ⚡#****GG",
            avatar: "6684adef23e4c39ecc8c4fee8e0ad4b957a9a04b",
            steamid: "76561199347663394",
            level: 89,
            rank: 0,
          },
          color: "rgb(119,91,168)",
          value: 675,
          items: [
            [2605, 370],
            [1024, 151],
          ],
        },
        {
          id: 5785241,
          profile: {
            id: 601460,
            username: "cheeKy9 rustchance.com",
            avatar: "61ceebcc24dd5409e1acdfb3f2417fffa42eccb9",
            steamid: "76561199347663394",
            level: 34,
            rank: 0,
          },
          color: "rgb(50,72,245)",
          value: 675,
          items: [[2605, 370]],
        },
        {
          id: 534534,
          profile: {
            id: 1,
            username: "foigjodifgj",
            avatar: "6293098db568fafd849388410fdb075fd19e577a",
            steamid: "76561199347663394",
            level: 109,
            rank: 0,
          },
          color: "rgb(203,32,25)",
          value: 370,
          items: [[378, 370]],
        },
      ],
    },
    history: [],
  }),

  actions: (set) => ({
    newDeposit(deposit: JackpotDeposit) {
      set("current", "deposits", (deposits) => [deposit, ...deposits]);
    },
  }),
});

export { JackpotProvider, useJackpotContext };
export type { JackpotDeposit, JackpotGame };
