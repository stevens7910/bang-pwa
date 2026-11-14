// Complete official BANG! Base Game Card Definitions (Czech Edition)
// 7 Roles, 16 Characters, 80 Playing Cards = 103 Cards Total

const SUITS = {
  S: { symbol: '♠', name: 'Piky', color: '#1a1816' },
  H: { symbol: '♥', name: 'Srdce', color: '#b91c1c' },
  D: { symbol: '♦', name: 'Kára', color: '#b91c1c' },
  C: { symbol: '♣', name: 'Kříže', color: '#1a1816' }
};

const ROLES = [
  {
    id: 'sheriff',
    name: 'Šerif',
    count: 1,
    color: '#d4a017',
    goal: 'Eliminuj všechny Bandity a Odpadlíka. Hraješ s odkrytou kartou a máš +1 život navíc.',
    team: 'law'
  },
  {
    id: 'deputy',
    name: 'Pomocník šerifa',
    count: 2,
    color: '#2b5b84',
    goal: 'Chraň Šerifa za každou cenu! Eliminuj všechny Bandity a Odpadlíka.',
    team: 'law'
  },
  {
    id: 'outlaw',
    name: 'Bandita',
    count: 3,
    color: '#991b1b',
    goal: 'Zabij Šerifa! (Za eliminaci Bandity dostane útočník odměnu 3 karty.)',
    team: 'outlaw'
  },
  {
    id: 'renegade',
    name: 'Odpadlík',
    count: 1,
    color: '#5b3a29',
    goal: 'Zůstaň poslední naživu! Musíš eliminovat všechny ostatní hráče, Šerifa až jako posledního.',
    team: 'renegade'
  }
];

const CHARACTERS = [
  {
    id: 'bart_cassidy',
    name: 'Bart Cassidy',
    hp: 4,
    ability: 'Pokaždé, když je zraněn (ztratí život), lízne si 1 kartu z dobíracího balíčku.',
    epithet: 'Nezničitelný'
  },
  {
    id: 'black_jack',
    name: 'Black Jack',
    hp: 4,
    ability: 'Ve fázi 1 ukáže druhou líznutou kartu; pokud je ♥ nebo ♦, lízne si ještě 1 kartu navíc.',
    epithet: 'Karetní hráč'
  },
  {
    id: 'calamity_janet',
    name: 'Calamity Janet',
    hp: 4,
    ability: 'Může hrát kartu BANG! jako Vedle! a kartu Vedle! jako BANG!.',
    epithet: 'Ostrostřelkyně'
  },
  {
    id: 'el_gringo',
    name: 'El Gringo',
    hp: 3,
    ability: 'Pokaždé, když je zraněn hráčem, vezme si 1 náhodnou kartu z ruky útočníka.',
    epithet: 'Mstitel'
  },
  {
    id: 'jesse_jones',
    name: 'Jesse Jones',
    hp: 4,
    ability: 'Ve fázi 1 si může první kartu vzít z ruky libovolného hráče místo z balíčku.',
    epithet: 'Zloděj'
  },
  {
    id: 'jourdonnais',
    name: 'Jourdonnais',
    hp: 4,
    ability: 'Kdykoli je cílem BANG!, může si „líznout!“; pokud je ♥, útok mine (jako Barel).',
    epithet: 'Šťastlivec'
  },
  {
    id: 'kit_carlson',
    name: 'Kit Carlson',
    hp: 4,
    ability: 'Ve fázi 1 se podívá na vrchní 3 karty balíčku, 2 si vezme a 1 vrátí zpět na vrch.',
    epithet: 'Stopař'
  },
  {
    id: 'lucky_duke',
    name: 'Lucky Duke',
    hp: 4,
    ability: 'Kdykoli si má „líznout!“ (Barel, Vězení, Dynamit), otočí 2 karty a vybere si jednu.',
    epithet: 'Hazardér'
  },
  {
    id: 'paul_regret',
    name: 'Paul Regret',
    hp: 3,
    ability: 'Všichni ostatní hráči ho vidí na vzdálenost o 1 větší (+1 vzdálenost k němu).',
    epithet: 'Nedostižný'
  },
  {
    id: 'pedro_ramirez',
    name: 'Pedro Ramirez',
    hp: 4,
    ability: 'Ve fázi 1 si může první kartu vzít z vrchu odhazovacího balíčku.',
    epithet: 'Mrchožrout'
  },
  {
    id: 'rose_doolan',
    name: 'Rose Doolan',
    hp: 4,
    ability: 'Vidí všechny ostatní hráče na vzdálenost o 1 menší (-1 vzdálenost od ní).',
    epithet: 'Bystrozraká'
  },
  {
    id: 'sid_ketchum',
    name: 'Sid Ketchum',
    hp: 4,
    ability: 'Kdykoli ve svém tahu může odhodit 2 karty z ruky a přidat si 1 život.',
    epithet: 'Ranhojič'
  },
  {
    id: 'slab_the_killer',
    name: 'Slab the Killer',
    hp: 4,
    ability: 'Hráč potřebuje 2 karty Vedle! k odvrácení jeho karty BANG!.',
    epithet: 'Drsňák'
  },
  {
    id: 'suzy_lafayette',
    name: 'Suzy Lafayette',
    hp: 4,
    ability: 'Jakmile nemá v ruce žádnou kartu, okamžitě si lízne 1 kartu z balíčku.',
    epithet: 'Rychlá ruka'
  },
  {
    id: 'vulture_sam',
    name: 'Vulture Sam',
    hp: 4,
    ability: 'Kdykoli je nějaký hráč vyřazen ze hry, vezme si všechny jeho karty.',
    epithet: 'Sup'
  },
  {
    id: 'willy_the_kid',
    name: 'Willy the Kid',
    hp: 4,
    ability: 'Ve svém tahu může zahrát libovolný počet karet BANG!.',
    epithet: 'Pistolník'
  }
];

// Card templates (22 distinct playing card types)
const CARD_TYPES = {
  bang: {
    name: 'BANG!',
    border: 'brown',
    category: 'action',
    symbols: ['🎯 Dostřel', '💥 -1 život'],
    desc: 'Vystřel na hráče v dostřelu. Cíl musí zahrát Vedle!, jinak ztratí 1 život.'
  },
  missed: {
    name: 'Vedle!',
    border: 'brown',
    category: 'action',
    symbols: ['🛡️ Obrana'],
    desc: 'Zruší účinek karty BANG! zahrané proti tobě (mimo svůj tah).'
  },
  beer: {
    name: 'Pivo',
    border: 'brown',
    category: 'action',
    symbols: ['🍺 +1 život'],
    desc: 'Přidá ti 1 život (max. do tvého počtu životů). Lze hrát i při smrtelném zásahu.'
  },
  saloon: {
    name: 'Saloon',
    border: 'brown',
    category: 'action',
    symbols: ['👥 Všichni', '🍺 +1 život'],
    desc: 'Všichni hráči ve hře si přidají 1 život.'
  },
  stagecoach: {
    name: 'Dostavník',
    border: 'brown',
    category: 'action',
    symbols: ['🃏 +2 karty'],
    desc: 'Lízni si 2 karty z dobíracího balíčku.'
  },
  wells_fargo: {
    name: 'Wells Fargo',
    border: 'brown',
    category: 'action',
    symbols: ['🃏 +3 karty'],
    desc: 'Lízni si 3 karty z dobíracího balíčku.'
  },
  panic: {
    name: 'Panika!',
    border: 'brown',
    category: 'action',
    symbols: ['📏 Vzdál. 1', '✋ Vezmi kartu'],
    desc: 'Vezmi si 1 kartu od hráče ve vzdálenosti 1 (z ruky náhodně nebo ze stolu).'
  },
  cat_balou: {
    name: 'Cat Balou',
    border: 'brown',
    category: 'action',
    symbols: ['🌐 Kdekoli', '🗑️ Odhoď kartu'],
    desc: 'Nech libovolného hráče odhodit 1 kartu (z ruky náhodně nebo ze stolu).'
  },
  gatling: {
    name: 'Kulomet',
    border: 'brown',
    category: 'action',
    symbols: ['👥 Všichni ostatní', '💥 BANG!'],
    desc: 'Všichni ostatní hráči musí zahrát Vedle!, jinak ztratí 1 život.'
  },
  indians: {
    name: 'Indiáni!',
    border: 'brown',
    category: 'action',
    symbols: ['👥 Všichni ostatní', '🔥 Odhoď BANG!'],
    desc: 'Všichni ostatní hráči musí odhodit BANG!, jinak ztratí 1 život.'
  },
  duel: {
    name: 'Duel',
    border: 'brown',
    category: 'action',
    symbols: ['🌐 Kdekoli', '⚔️ Přestřelka'],
    desc: 'Vyzvi hráče na souboj. Střídavě odhazujete BANG! (začíná vyzvaný). Kdo nemá, ztrácí 1 život.'
  },
  general_store: {
    name: 'Hokynářství',
    border: 'brown',
    category: 'action',
    symbols: ['👥 Všichni', '🃏 Výběr'],
    desc: 'Otoč tolik karet, kolik je hráčů. Každý si postupně jednu vybere.'
  },
  volcanic: {
    name: 'Volcanic',
    border: 'blue',
    category: 'weapon',
    range: 1,
    unlimitedBang: true,
    symbols: ['🔫 Dostřel 1', '∞ BANG!'],
    desc: 'Dostřel 1. Můžeš hrát libovolný počet karet BANG! za tah.'
  },
  schofield: {
    name: 'Schofield',
    border: 'blue',
    category: 'weapon',
    range: 2,
    symbols: ['🔫 Dostřel 2'],
    desc: 'Zbraň s dostřelem 2.'
  },
  remington: {
    name: 'Remington',
    border: 'blue',
    category: 'weapon',
    range: 3,
    symbols: ['🔫 Dostřel 3'],
    desc: 'Zbraň s dostřelem 3.'
  },
  carabine: {
    name: 'Rev. Carabine',
    border: 'blue',
    category: 'weapon',
    range: 4,
    symbols: ['🔫 Dostřel 4'],
    desc: 'Zbraň s dostřelem 4.'
  },
  winchester: {
    name: 'Winchester',
    border: 'blue',
    category: 'weapon',
    range: 5,
    symbols: ['🔫 Dostřel 5'],
    desc: 'Zbraň s dostřelem 5.'
  },
  barrel: {
    name: 'Barel',
    border: 'blue',
    category: 'equipment',
    symbols: ['🛡️ ♥ = Vedle!'],
    desc: 'Kdykoli jsi cílem BANG!, „lízni si!“; pokud je ♥, útok mine.'
  },
  mustang: {
    name: 'Mustang',
    border: 'blue',
    category: 'equipment',
    symbols: ['🐎 +1 vzdál. k tobě'],
    desc: 'Ostatní hráči tě vidí na vzdálenost o 1 větší.'
  },
  scope: {
    name: 'Hledí',
    border: 'blue',
    category: 'equipment',
    symbols: ['🔭 -1 vzdál. od tebe'],
    desc: 'Vidíš ostatní hráče na vzdálenost o 1 menší.'
  },
  jail: {
    name: 'Vězení',
    border: 'blue',
    category: 'hazard',
    symbols: ['⛓️ ♥ = Útěk'],
    desc: 'Vylož před hráče (ne Šerifa). Na začátku tahu si „lízne!“; bez ♥ vynechá tah.'
  },
  dynamite: {
    name: 'Dynamit',
    border: 'blue',
    category: 'hazard',
    symbols: ['🧨 2-9♠ = -3 ♥'],
    desc: 'Na začátku tahu si „lízni!“; 2–9♠ = výbuch (-3 životy), jinak jde dál.'
  }
};

// Exact 80-card deck specification (type, rank, suit)
const DECK_SPEC = [
  // BANG! (25)
  ['bang', 'A', 'S'], ['bang', 'Q', 'H'], ['bang', 'K', 'H'], ['bang', 'A', 'H'],
  ['bang', '2', 'D'], ['bang', '3', 'D'], ['bang', '4', 'D'], ['bang', '5', 'D'],
  ['bang', '6', 'D'], ['bang', '7', 'D'], ['bang', '8', 'D'], ['bang', '9', 'D'],
  ['bang', '10', 'D'], ['bang', 'J', 'D'], ['bang', 'Q', 'D'], ['bang', 'K', 'D'],
  ['bang', 'A', 'D'], ['bang', '2', 'C'], ['bang', '3', 'C'], ['bang', '4', 'C'],
  ['bang', '5', 'C'], ['bang', '6', 'C'], ['bang', '7', 'C'], ['bang', '8', 'C'],
  ['bang', '9', 'C'],
  // Vedle! (12)
  ['missed', '2', 'S'], ['missed', '3', 'S'], ['missed', '4', 'S'], ['missed', '5', 'S'],
  ['missed', '6', 'S'], ['missed', '7', 'S'], ['missed', '8', 'S'],
  ['missed', '10', 'C'], ['missed', 'J', 'C'], ['missed', 'Q', 'C'], ['missed', 'K', 'C'],
  ['missed', 'A', 'C'],
  // Pivo (6)
  ['beer', '6', 'H'], ['beer', '7', 'H'], ['beer', '8', 'H'],
  ['beer', '9', 'H'], ['beer', '10', 'H'], ['beer', 'J', 'H'],
  // Saloon (1)
  ['saloon', '5', 'H'],
  // Dostavník (2)
  ['stagecoach', '9', 'S'], ['stagecoach', '9', 'S'],
  // Wells Fargo (1)
  ['wells_fargo', '3', 'H'],
  // Panika! (4)
  ['panic', 'J', 'H'], ['panic', 'Q', 'H'], ['panic', 'A', 'H'], ['panic', '8', 'D'],
  // Cat Balou (4)
  ['cat_balou', 'K', 'H'], ['cat_balou', '9', 'D'], ['cat_balou', '10', 'D'], ['cat_balou', 'J', 'D'],
  // Kulomet (1)
  ['gatling', '10', 'H'],
  // Indiáni! (2)
  ['indians', 'K', 'D'], ['indians', 'A', 'D'],
  // Duel (3)
  ['duel', 'J', 'S'], ['duel', 'Q', 'D'], ['duel', '8', 'C'],
  // Hokynářství (2)
  ['general_store', 'Q', 'S'], ['general_store', '9', 'C'],
  // Zbraně (8)
  ['volcanic', '10', 'S'], ['volcanic', '10', 'C'],
  ['schofield', 'K', 'S'], ['schofield', 'J', 'C'], ['schofield', 'Q', 'C'],
  ['remington', 'K', 'C'],
  ['carabine', 'A', 'C'],
  ['winchester', '8', 'S'],
  // Barel (2)
  ['barrel', 'Q', 'S'], ['barrel', 'K', 'S'],
  // Mustang (2)
  ['mustang', '8', 'H'], ['mustang', '9', 'H'],
  // Hledí (1)
  ['scope', 'A', 'S'],
  // Vězení (3)
  ['jail', '10', 'S'], ['jail', 'J', 'S'], ['jail', '4', 'H'],
  // Dynamit (1)
  ['dynamite', '2', 'H']
];

function buildDeck() {
  return DECK_SPEC.map(([type, rank, suit], idx) => {
    const tpl = CARD_TYPES[type];
    return {
      uid: `card_${idx}_${type}_${rank}${suit}`,
      type,
      rank,
      suit,
      ...tpl
    };
  });
}

function getRoleDistribution(playerCount) {
  switch (playerCount) {
    case 4: return ['sheriff', 'renegade', 'outlaw', 'outlaw'];
    case 5: return ['sheriff', 'renegade', 'outlaw', 'outlaw', 'deputy'];
    case 6: return ['sheriff', 'renegade', 'outlaw', 'outlaw', 'outlaw', 'deputy'];
    case 7: return ['sheriff', 'renegade', 'outlaw', 'outlaw', 'outlaw', 'deputy', 'deputy'];
    default: return ['sheriff', 'renegade', 'outlaw', 'outlaw'];
  }
}
