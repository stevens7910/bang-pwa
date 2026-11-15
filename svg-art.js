// Authentic BANG! Western Ink-Sketch & Sepia Card Artwork
// Matches the real Czech/dV Games BANG! card aesthetic

function getCardArtSVG(type, range = null) {
  const s = (inner, tint = '#efe0c1') =>
    `<svg viewBox="0 0 120 88" class="card-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vg_${type}" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="${tint}"/>
          <stop offset="100%" stop-color="#d9c29c"/>
        </radialGradient>
      </defs>
      <rect width="120" height="88" fill="url(#vg_${type})"/>
      <rect x="2" y="2" width="116" height="84" fill="none" stroke="#5c3d28" stroke-width="0.9" opacity="0.5"/>
      ${inner}
    </svg>`;

  const sightBadge = (r) => r ? `
    <g transform="translate(96, 20)">
      <circle cx="0" cy="0" r="13" fill="#f8f1e0" stroke="#2c527a" stroke-width="2"/>
      <circle cx="0" cy="0" r="9.5" fill="none" stroke="#2c527a" stroke-width="1" stroke-dasharray="2 1.5"/>
      <line x1="-15" y1="0" x2="-8" y2="0" stroke="#2c527a" stroke-width="1.5"/>
      <line x1="8" y1="0" x2="15" y2="0" stroke="#2c527a" stroke-width="1.5"/>
      <line x1="0" y1="-15" x2="0" y2="-8" stroke="#2c527a" stroke-width="1.5"/>
      <line x1="0" y1="8" x2="0" y2="15" stroke="#2c527a" stroke-width="1.5"/>
      <text x="0" y="5" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="900" fill="#1e3a5f">${r}</text>
    </g>` : '';

  switch (type) {
    case 'bang':
      return s(`
        <!-- Starburst Explosion -->
        <path d="M84 14 L89 29 L105 24 L93 37 L110 46 L91 47 L96 63 L83 49 L70 59 L76 44 L61 38 L76 33 Z" fill="#c2410c" stroke="#3b2618" stroke-width="1.5"/>
        <path d="M84 23 L87 33 L97 32 L89 39 L93 49 L83 42 L74 47 L78 38 L70 34 L79 33 Z" fill="#f59e0b"/>
        <!-- Detailed Colt Revolver -->
        <g transform="translate(10,26) rotate(-7)">
          <rect x="22" y="13" width="40" height="7" rx="1" fill="#4b5563" stroke="#1c1917" stroke-width="1.5"/>
          <rect x="57" y="10" width="4" height="5" fill="#1c1917"/>
          <rect x="17" y="15" width="17" height="14" rx="2" fill="#6b7280" stroke="#1c1917" stroke-width="1.5"/>
          <circle cx="25.5" cy="22" r="4.5" fill="#374151" stroke="#1c1917" stroke-width="1"/>
          <path d="M17 21 C9 21 5 32 7 45 L17 46 C15 36 18 30 23 29 Z" fill="#6b3e26" stroke="#2c1810" stroke-width="1.5"/>
          <path d="M23 29 C23 37 32 37 32 29" fill="none" stroke="#1c1917" stroke-width="1.8"/>
        </g>
      `);

    case 'missed':
      return s(`
        <!-- Bullet trajectory & flying cowboy hat -->
        <path d="M12 24 L102 17" stroke="#991b1b" stroke-width="1.4" stroke-dasharray="4 3"/>
        <ellipse cx="102" cy="17" rx="5.5" ry="2.2" fill="#78350f" stroke="#2c1810" stroke-width="1"/>
        <g transform="translate(28,31) rotate(13)">
          <ellipse cx="30" cy="30" rx="31" ry="7.5" fill="#7c4d25" stroke="#2c1810" stroke-width="1.5"/>
          <path d="M13 28 C15 9 22 7 30 11 C38 7 45 9 47 28 Z" fill="#925b2d" stroke="#2c1810" stroke-width="1.5"/>
          <path d="M14 24 Q30 28 46 24" fill="none" stroke="#f5e6c8" stroke-width="2.5"/>
        </g>
        <path d="M18 58 Q25 43 35 47" fill="none" stroke="#5c3d28" stroke-width="1.4" stroke-dasharray="2 2"/>
      `);

    case 'beer':
      return s(`
        <!-- Classic Wooden/Glass Beer Mug -->
        <rect x="40" y="27" width="34" height="46" rx="4" fill="#d97706" stroke="#3b2618" stroke-width="2"/>
        <rect x="44" y="31" width="26" height="38" rx="2" fill="#f59e0b"/>
        <path d="M74 35 C87 35 87 60 74 60" fill="none" stroke="#3b2618" stroke-width="4.5"/>
        <path d="M74 35 C87 35 87 60 74 60" fill="none" stroke="#d97706" stroke-width="2"/>
        <circle cx="44" cy="24" r="7.5" fill="#fffbeb" stroke="#78502b" stroke-width="1"/>
        <circle cx="55" cy="21" r="8.5" fill="#fffbeb" stroke="#78502b" stroke-width="1"/>
        <circle cx="67" cy="23" r="7.5" fill="#fffbeb" stroke="#78502b" stroke-width="1"/>
        <path d="M48 31 L48 46 Q51 49 53 39 L53 31" fill="#fffbeb"/>
      `);

    case 'saloon':
      return s(`
        <rect x="16" y="10" width="88" height="68" fill="#5c3a1e" stroke="#2c1810" stroke-width="2"/>
        <rect x="24" y="18" width="72" height="60" fill="#241409"/>
        <path d="M25 28 L57 32 L57 70 L25 66 Z" fill="#9c6130" stroke="#2c1810" stroke-width="1.5"/>
        <path d="M95 28 L63 32 L63 70 L95 66 Z" fill="#9c6130" stroke="#2c1810" stroke-width="1.5"/>
        <line x1="30" y1="36" x2="52" y2="38" stroke="#451a03" stroke-width="1.8"/>
        <line x1="30" y1="45" x2="52" y2="47" stroke="#451a03" stroke-width="1.8"/>
        <line x1="68" y1="38" x2="90" y2="36" stroke="#451a03" stroke-width="1.8"/>
        <line x1="68" y1="47" x2="90" y2="45" stroke="#451a03" stroke-width="1.8"/>
        <rect x="33" y="8" width="54" height="14" rx="2" fill="#f4e4c1" stroke="#3b2618" stroke-width="1.5"/>
        <text x="60" y="18" text-anchor="middle" font-size="9" font-weight="900" fill="#3b2618" font-family="Georgia,serif">SALOON</text>
      `);

    case 'stagecoach':
      return s(`
        <line x1="8" y1="70" x2="112" y2="70" stroke="#5c3d28" stroke-width="2"/>
        <path d="M28 24 L88 24 L94 54 L22 54 Z" fill="#8b261d" stroke="#2c1810" stroke-width="2"/>
        <rect x="36" y="29" width="17" height="14" rx="2" fill="#f4e4c1" stroke="#2c1810" stroke-width="1.2"/>
        <rect x="63" y="29" width="17" height="14" rx="2" fill="#f4e4c1" stroke="#2c1810" stroke-width="1.2"/>
        <rect x="24" y="18" width="68" height="6" rx="2" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.2"/>
        <circle cx="35" cy="60" r="11" fill="none" stroke="#2c1810" stroke-width="2.5"/>
        <circle cx="35" cy="60" r="3" fill="#5c3a1e"/>
        <circle cx="83" cy="60" r="11" fill="none" stroke="#2c1810" stroke-width="2.5"/>
        <circle cx="83" cy="60" r="3" fill="#5c3a1e"/>
      `);

    case 'wells_fargo':
      return s(`
        <rect x="22" y="27" width="76" height="36" rx="3" fill="#2c4a70" stroke="#1a2c42" stroke-width="2"/>
        <rect x="22" y="40" width="76" height="5" fill="#d4a017"/>
        <text x="60" y="21" text-anchor="middle" font-size="8.5" font-weight="900" fill="#3b2618" font-family="Georgia,serif">WELLS FARGO</text>
        <circle cx="37" cy="65" r="9" fill="#5c3a1e" stroke="#2c1810" stroke-width="2"/>
        <circle cx="83" cy="65" r="9" fill="#5c3a1e" stroke="#2c1810" stroke-width="2"/>
        <rect x="52" y="38" width="16" height="12" rx="2" fill="#eab308" stroke="#5c3a1e" stroke-width="1.2"/>
      `);

    case 'panic':
      return s(`
        <path d="M16 66 Q40 46 58 48" fill="none" stroke="#5c3a1e" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="76" cy="42" rx="25" ry="17" fill="none" stroke="#7c4d25" stroke-width="2.5" stroke-dasharray="4 2"/>
        <g transform="translate(62,20) rotate(12)">
          <rect x="0" y="0" width="24" height="35" rx="2" fill="#f8f1e0" stroke="#3b2618" stroke-width="1.5"/>
          <text x="12" y="22" text-anchor="middle" font-size="15" font-weight="900" fill="#991b1b">?</text>
        </g>
        <text x="26" y="34" font-size="20" font-weight="900" fill="#991b1b" font-family="Georgia,serif">!</text>
      `);

    case 'cat_balou':
      return s(`
        <circle cx="60" cy="30" r="14" fill="#4a3120"/>
        <ellipse cx="60" cy="24" rx="25" ry="5" fill="#2c1810"/>
        <path d="M38 72 C38 49 82 49 82 72 Z" fill="#7f1d1d" stroke="#2c1810" stroke-width="1.5"/>
        <ellipse cx="60" cy="47" rx="29" ry="9" fill="none" stroke="#b45309" stroke-width="2.5"/>
        <path d="M89 47 Q105 53 108 74" fill="none" stroke="#b45309" stroke-width="2.2"/>
      `);

    case 'gatling':
      return s(`
        <line x1="48" y1="48" x2="34" y2="76" stroke="#2c1810" stroke-width="3"/>
        <line x1="54" y1="48" x2="68" y2="76" stroke="#2c1810" stroke-width="3"/>
        <circle cx="51" cy="50" r="12" fill="none" stroke="#5c3a1e" stroke-width="3"/>
        <rect x="32" y="26" width="56" height="14" rx="2" fill="#374151" stroke="#111827" stroke-width="1.5"/>
        <line x1="34" y1="30" x2="88" y2="30" stroke="#9ca3af" stroke-width="1.5"/>
        <line x1="34" y1="34" x2="88" y2="34" stroke="#9ca3af" stroke-width="1.5"/>
        <path d="M92 24 L108 20 L99 31 L111 36 L95 40 L103 49 L89 42 Z" fill="#f59e0b" stroke="#991b1b" stroke-width="1"/>
      `);

    case 'indians':
      return s(`
        <line x1="28" y1="70" x2="86" y2="18" stroke="#5c3a1e" stroke-width="4" stroke-linecap="round"/>
        <path d="M74 16 L96 24 L83 37 L68 25 Z" fill="#6b7280" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M40 20 Q28 36 44 52 Q52 34 40 20 Z" fill="#b91c1c" stroke="#451a03" stroke-width="1.2"/>
        <path d="M52 16 Q42 32 54 46 Q62 30 52 16 Z" fill="#d97706" stroke="#451a03" stroke-width="1.2"/>
        <path d="M62 54 L94 70" stroke="#5c3a1e" stroke-width="3" stroke-linecap="round"/>
      `);

    case 'duel':
      return s(`
        <g transform="translate(14,20) rotate(22)">
          <rect x="20" y="16" width="42" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.2"/>
          <path d="M14 24 C8 26 6 35 8 42 L16 42 C15 34 18 30 22 28 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.2"/>
        </g>
        <g transform="translate(106,20) scale(-1,1) rotate(22)">
          <rect x="20" y="16" width="42" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.2"/>
          <path d="M14 24 C8 26 6 35 8 42 L16 42 C15 34 18 30 22 28 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.2"/>
        </g>
        <circle cx="60" cy="24" r="6" fill="#d97706" opacity="0.75"/>
      `);

    case 'general_store':
      return s(`
        <rect x="22" y="44" width="76" height="30" rx="2" fill="#8b5a2b" stroke="#2c1810" stroke-width="1.5"/>
        <rect x="32" y="21" width="12" height="23" rx="2" fill="#166534" stroke="#14532d" stroke-width="1.2"/>
        <circle cx="62" cy="32" r="11" fill="#b45309" stroke="#2c1810" stroke-width="1.5"/>
        <rect x="78" y="23" width="14" height="21" rx="1" fill="#f8f1e0" stroke="#5c3a1e" stroke-width="1.2"/>
      `);

    case 'volcanic':
      return s(`
        <g transform="translate(8,22)">
          <rect x="30" y="16" width="52" height="9" rx="1.5" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <rect x="30" y="25" width="46" height="5" fill="#6b7280" stroke="#111827" stroke-width="1"/>
          <rect x="14" y="16" width="22" height="16" rx="2" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
          <path d="M14 24 C6 26 4 38 6 48 L16 48 C14 39 17 34 22 32 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.5"/>
        </g>
        ${sightBadge(1)}
      `, '#e5ecf2');

    case 'schofield':
      return s(`
        <g transform="translate(8,22)">
          <rect x="32" y="15" width="52" height="7" rx="1" fill="#4b5563" stroke="#111827" stroke-width="1.5"/>
          <rect x="16" y="16" width="18" height="15" rx="2" fill="#9ca3af" stroke="#111827" stroke-width="1.5"/>
          <path d="M16 23 C8 25 5 38 7 49 L17 49 C15 39 18 34 23 31 Z" fill="#6b3e26" stroke="#2c1810" stroke-width="1.5"/>
        </g>
        ${sightBadge(2)}
      `, '#e5ecf2');

    case 'remington':
      return s(`
        <g transform="translate(4,24)">
          <rect x="28" y="14" width="66" height="6.5" rx="1" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <rect x="14" y="15" width="17" height="14" rx="2" fill="#92400e" stroke="#2c1810" stroke-width="1.5"/>
          <path d="M14 22 C6 25 4 37 6 47 L16 47 C14 37 16 33 21 30 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.5"/>
        </g>
        ${sightBadge(3)}
      `, '#e5ecf2');

    case 'carabine':
      return s(`
        <g transform="translate(4,26) rotate(-6)">
          <rect x="24" y="16" width="70" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <path d="M2 26 L26 16 L30 24 L6 38 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.5"/>
          <circle cx="30" cy="21" r="6" fill="#9ca3af" stroke="#111827" stroke-width="1.5"/>
        </g>
        ${sightBadge(4)}
      `, '#e5ecf2');

    case 'winchester':
      return s(`
        <g transform="translate(2,28) rotate(-8)">
          <rect x="26" y="15" width="74" height="5.5" rx="1" fill="#374151" stroke="#111827" stroke-width="1.4"/>
          <rect x="32" y="20.5" width="50" height="4" fill="#6b3e26"/>
          <path d="M2 28 L30 15 L32 25 L6 42 Z" fill="#6b3e26" stroke="#2c1810" stroke-width="1.5"/>
          <rect x="24" y="15" width="15" height="10" fill="#b45309" stroke="#451a03" stroke-width="1.2"/>
        </g>
        ${sightBadge(5)}
      `, '#e5ecf2');

    case 'barrel':
      return s(`
        <ellipse cx="60" cy="44" rx="26" ry="31" fill="#925b2d" stroke="#2c1810" stroke-width="2"/>
        <ellipse cx="60" cy="19" rx="20" ry="6" fill="#b45309" stroke="#2c1810" stroke-width="1.5"/>
        <path d="M36 32 Q60 38 84 32" fill="none" stroke="#374151" stroke-width="3.5"/>
        <path d="M35 56 Q60 62 85 56" fill="none" stroke="#374151" stroke-width="3.5"/>
      `, '#e5ecf2');

    case 'mustang':
      return s(`
        <path d="M22 60 Q30 40 50 40 L70 36 Q82 22 92 24 L96 30 L86 36 Q84 46 76 50 L84 70 L76 70 L68 52 L46 52 L36 70 L28 70 L36 54 L22 66 Z" fill="#5c3a1e" stroke="#2c1810" stroke-width="1.5"/>
      `, '#e5ecf2');

    case 'scope':
      return s(`
        <g transform="translate(14,34) rotate(-14)">
          <rect x="8" y="8" width="24" height="10" rx="2" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
          <rect x="32" y="6" width="28" height="14" rx="2" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
          <rect x="60" y="3" width="30" height="20" rx="2" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
          <ellipse cx="90" cy="13" rx="3" ry="10" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>
        </g>
      `, '#e5ecf2');

    case 'jail':
      return s(`
        <rect x="20" y="10" width="80" height="68" fill="#374151" stroke="#111827" stroke-width="2"/>
        <rect x="26" y="16" width="68" height="56" fill="#1f2937"/>
        <line x1="38" y1="14" x2="38" y2="74" stroke="#9ca3af" stroke-width="4"/>
        <line x1="52" y1="14" x2="52" y2="74" stroke="#9ca3af" stroke-width="4"/>
        <line x1="68" y1="14" x2="68" y2="74" stroke="#9ca3af" stroke-width="4"/>
        <line x1="82" y1="14" x2="82" y2="74" stroke="#9ca3af" stroke-width="4"/>
      `, '#e5ecf2');

    case 'dynamite':
      return s(`
        <rect x="42" y="30" width="11" height="44" rx="2" fill="#b91c1c" stroke="#450a0a" stroke-width="1.5"/>
        <rect x="54" y="28" width="11" height="46" rx="2" fill="#dc2626" stroke="#450a0a" stroke-width="1.5"/>
        <rect x="66" y="30" width="11" height="44" rx="2" fill="#b91c1c" stroke="#450a0a" stroke-width="1.5"/>
        <rect x="40" y="44" width="39" height="6" fill="#1f2937"/>
        <path d="M59 28 Q62 14 78 16" fill="none" stroke="#451a03" stroke-width="2"/>
        <polygon points="80,10 83,15 88,14 84,18 87,23 81,20 76,23 78,18 74,14 79,15" fill="#f59e0b" stroke="#b91c1c" stroke-width="0.8"/>
      `, '#f6dddd');

    default:
      return s(`<circle cx="60" cy="44" r="20" fill="#8b5a2b"/>`);
  }
}

function getCharacterPortraitSVG(charId) {
  const configs = {
    bart_cassidy:    { skin: '#f3c6a5', hat: '#451a03', hatType: 'bowler', beard: '#78350f', extra: 'bandaid', bg: '#e8d5b5' },
    black_jack:      { skin: '#eec09d', hat: '#1f2937', hatType: 'tophat', beard: '#111827', extra: 'cards', bg: '#dfd0b8' },
    calamity_janet:  { skin: '#f8d5bd', hat: '#92400e', hatType: 'cowboy', beard: 'none', extra: 'braids', bg: '#f1dfc1' },
    el_gringo:       { skin: '#d9a077', hat: '#78350f', hatType: 'sombrero', beard: '#1f2937', extra: 'poncho', bg: '#ead4b0' },
    jesse_jones:     { skin: '#eec09d', hat: '#57534e', hatType: 'cowboy', beard: '#44403c', extra: 'bandana', bg: '#e4d3b5' },
    jourdonnais:     { skin: '#f3c6a5', hat: '#292524', hatType: 'cap', beard: '#292524', extra: 'mustache', bg: '#ead9bd' },
    kit_carlson:     { skin: '#e8b490', hat: '#78350f', hatType: 'trapper', beard: '#92400e', extra: 'scar', bg: '#e5d3b3' },
    lucky_duke:      { skin: '#f3c6a5', hat: '#1e3a8a', hatType: 'tophat', beard: 'none', extra: 'monocle', bg: '#e6d7bd' },
    paul_regret:     { skin: '#f5cfb3', hat: '#44403c', hatType: 'none', beard: '#78350f', extra: 'cigarette', bg: '#e8d7bc' },
    pedro_ramirez:   { skin: '#d49a70', hat: '#78350f', hatType: 'sombrero', beard: '#1c1917', extra: 'bandana', bg: '#e5d0ae' },
    rose_doolan:     { skin: '#f8d8c0', hat: '#7f1d1d', hatType: 'cowboy', beard: 'none', extra: 'earrings', bg: '#f2e0c4' },
    sid_ketchum:     { skin: '#f3c6a5', hat: '#92400e', hatType: 'bowler', beard: '#d6d3d1', extra: 'glasses', bg: '#eae0cc' },
    slab_the_killer: { skin: '#e5ae87', hat: '#292524', hatType: 'cowboy', beard: '#292524', extra: 'scar', bg: '#dfd0b6' },
    suzy_lafayette:  { skin: '#fae0cb', hat: '#b45309', hatType: 'bonnet', beard: 'none', extra: 'braids', bg: '#f4e4ca' },
    vulture_sam:     { skin: '#deb08e', hat: '#1c1917', hatType: 'tophat', beard: '#57534e', extra: 'coat', bg: '#dfd4be' },
    willy_the_kid:   { skin: '#f5cfb3', hat: '#92400e', hatType: 'cowboy', beard: 'none', extra: 'bandana', bg: '#ecdcc0' }
  };
  const c = configs[charId] || configs.willy_the_kid;
  let hatSVG = '';
  if (c.hatType === 'cowboy') hatSVG = `<ellipse cx="50" cy="28" rx="34" ry="7" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/><path d="M30 27 C32 10 42 10 50 13 C58 10 68 10 70 27 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  else if (c.hatType === 'sombrero') hatSVG = `<ellipse cx="50" cy="29" rx="40" ry="8" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/><path d="M34 27 C36 9 64 9 66 27 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  else if (c.hatType === 'tophat') hatSVG = `<ellipse cx="50" cy="28" rx="28" ry="5" fill="${c.hat}" stroke="#111827" stroke-width="1.5"/><rect x="34" y="6" width="32" height="22" rx="2" fill="${c.hat}" stroke="#111827" stroke-width="1.5"/><rect x="34" y="22" width="32" height="4" fill="#991b1b"/>`;
  else if (c.hatType === 'bowler') hatSVG = `<ellipse cx="50" cy="28" rx="28" ry="5" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/><path d="M31 28 C31 10 69 10 69 28 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  else if (c.hatType !== 'none') hatSVG = `<path d="M26 32 C26 12 74 12 74 32 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  else hatSVG = `<path d="M28 34 C28 16 72 16 72 34 Z" fill="#57534e"/>`;
  let extraSVG = '';
  if (c.extra === 'bandana') extraSVG = `<path d="M34 54 L66 54 L50 74 Z" fill="#991b1b" stroke="#450a0a" stroke-width="1.2"/>`;
  else if (c.extra === 'monocle') extraSVG = `<circle cx="58" cy="40" r="5.5" fill="none" stroke="#b45309" stroke-width="1.5"/>`;
  else if (c.extra === 'glasses') extraSVG = `<circle cx="42" cy="40" r="5" fill="none" stroke="#374151" stroke-width="1.3"/><circle cx="58" cy="40" r="5" fill="none" stroke="#374151" stroke-width="1.3"/><line x1="47" y1="40" x2="53" y2="40" stroke="#374151" stroke-width="1.3"/>`;
  else if (c.extra === 'scar') extraSVG = `<path d="M55 34 L63 48" stroke="#991b1b" stroke-width="1.6"/>`;
  else if (c.extra === 'bandaid') extraSVG = `<rect x="35" y="42" width="10" height="4" rx="1" transform="rotate(-15 40 44)" fill="#fde68a" stroke="#b45309" stroke-width="0.8"/>`;
  else if (c.extra === 'braids') extraSVG = `<path d="M30 42 L26 68 M70 42 L74 68" stroke="#5c3a1e" stroke-width="4" stroke-linecap="round"/>`;
  const beardSVG = c.beard !== 'none' ? `<path d="M40 49 Q50 46 60 49 Q56 53 50 51 Q44 53 40 49 Z" fill="${c.beard}"/>` : '';
  return `<svg viewBox="0 0 100 84" class="char-art-svg" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="84" fill="${c.bg}"/><path d="M18 84 C20 62 34 58 50 58 C66 58 80 62 82 84 Z" fill="#57534e" stroke="#292524" stroke-width="1.5"/><ellipse cx="50" cy="42" rx="18" ry="20" fill="${c.skin}" stroke="#451a03" stroke-width="1.5"/><circle cx="42" cy="40" r="2.2" fill="#1c1917"/><circle cx="58" cy="40" r="2.2" fill="#1c1917"/><path d="M45 52 Q50 54 55 52" fill="none" stroke="#78350f" stroke-width="1.4"/>${beardSVG}${extraSVG}${hatSVG}</svg>`;
}

function getRoleArtSVG(roleId) {
  const s = (inner, bg) => `<svg viewBox="0 0 100 84" class="role-art-svg" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="84" fill="${bg}"/>${inner}</svg>`;
  switch (roleId) {
    case 'sheriff': return s(`<polygon points="50,10 58,31 80,31 62,44 69,66 50,53 31,66 38,44 20,31 42,31" fill="#eab308" stroke="#713f12" stroke-width="2"/><circle cx="50" cy="41" r="9" fill="#fef08a" stroke="#713f12" stroke-width="1.5"/>`, '#fef3c7');
    case 'deputy': return s(`<polygon points="50,12 57,32 78,32 61,44 67,65 50,52 33,65 39,44 22,32 43,32" fill="#60a5fa" stroke="#1e3a8a" stroke-width="2"/><circle cx="50" cy="41" r="8" fill="#dbeafe" stroke="#1e3a8a" stroke-width="1.5"/>`, '#dbeafe');
    case 'outlaw': return s(`<circle cx="50" cy="34" r="14" fill="#292524"/><ellipse cx="50" cy="28" rx="26" ry="5" fill="#1c1917"/><path d="M36 42 L64 42 L50 66 Z" fill="#991b1b" stroke="#450a0a" stroke-width="1.5"/>`, '#fee2e2');
    case 'renegade': return s(`<path d="M50 12 L68 44 L50 72 L32 44 Z" fill="#78350f" stroke="#451a03" stroke-width="2"/><path d="M50 18 L60 44 L50 66 L40 44 Z" fill="#f59e0b"/>`, '#ede0d4');
    default: return s(``, '#f4e4c1');
  }
}
