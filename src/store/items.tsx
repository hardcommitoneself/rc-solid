type SteamItem = {
    name: string;
    price: number;
    image: string;
    color: string;
};

type CompactSteamItem = {
    n: string;
    p: number;
    i: number;
    c: string;
    m: string;
};

/**
 * Contains a tuple for an item
 * @param itemid site item id
 * @param price price in cents
 */
type SiteItem = [number, number];

const ItemDatabase = new Map<number, SteamItem>();

function getItemModel(id: number): SteamItem | undefined {
    const item = ItemDatabase.get(id);
    return item;
}

export { ItemDatabase, getItemModel };
export type { SteamItem, SiteItem, CompactSteamItem };