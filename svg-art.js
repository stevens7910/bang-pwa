// Detailed Wild West SVG artwork for all 22 playing card types, 16 characters, 4 roles, and card back

function getCardArtSVG(type) {
  const s = (inner, bg = '#f4e4c1') =>
    `<svg viewBox="0 0 120 84" class="card-art-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="84" rx="4" fill="${bg}"/>
      <rect x="2" y="2" width="116" height="80" rx="3" fill="none" stroke="#8b5a2b" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.45"/>
      ${inner}
    </svg>`;

  switch (type) {
    case 'bang':
      return s(`
        <circle cx="84" cy="36" r="24" fill="#e67e22" opacity="0.22"/>
        <path d="M84 12 L88 28 L104 24 L92 36 L108 44 L90 44 L94 60 L82 46 L70 56 L76 42 L62 36 L76 32 Z" fill="#d9534f" stroke="#7c2d12" stroke-width="1.5"/>
        <path d="M83 22 L86 32 L96 32 L88 38 L92 48 L82 41 L74 46 L78 37 L70 33 L79 32 Z" fill="#f59e0b"/>
        <!-- Revolver -->
        <g transform="translate(14,24) rotate(-8)">
          <rect x="22" y="14" width="38" height="7" rx="1.5" fill="#4b5563" stroke="#1f2937" stroke-width="1.5"/>
          <rect x="55" y="11" width="4" height="5" fill="#374151"/>
          <rect x="18" y="16" width="16" height="14" rx="2" fill="#6b7280" stroke="#1f2937" stroke-width="1.5"/>
          <circle cx="26" cy="23" r="4.5" fill="#374151"/>
          <path d="M18 22 C10 22 6 32 8 44 L17 45 C16 36 18 31 23 30 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
          <path d="M24 30 C24 37 32 37 32 30" fill="none" stroke="#1f2937" stroke-width="1.8"/>
        </g>
      `, '#fae8c8');

    case 'missed':
      return s(`
        <!-- Cowboy hat flying off + bullet whizzing past -->
        <path d="M15 24 L98 18" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
        <ellipse cx="98" cy="18" rx="5" ry="2.2" fill="#b45309" stroke="#451a03" stroke-width="1"/>
        <path d="M90 15 L102 15 M86 21 L100 21" stroke="#9ca3af" stroke-width="1.2"/>
        <!-- Dodging Hat -->
        <g transform="translate(32,30) rotate(14)">
          <ellipse cx="28" cy="30" rx="30" ry="7" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
          <path d="M12 28 C14 10 20 8 28 11 C36 8 42 10 44 28 Z" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
          <path d="M13 24 Q28 28 43 24" fill="none" stroke="#fef3c7" stroke-width="2.5"/>
        </g>
        <path d="M20 56 Q26 42 36 46" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="2 2"/>
      `, '#f3e7d3');

    case 'beer':
      return s(`
        <!-- Frothy Beer Mug -->
        <rect x="40" y="26" width="34" height="44" rx="4" fill="#d97706" stroke="#78350f" stroke-width="2"/>
        <rect x="44" y="30" width="26" height="36" rx="2" fill="#f59e0b"/>
        <path d="M74 34 C86 34 86 58 74 58" fill="none" stroke="#78350f" stroke-width="4.5"/>
        <path d="M74 34 C86 34 86 58 74 58" fill="none" stroke="#d97706" stroke-width="2"/>
        <!-- Foam -->
        <circle cx="44" cy="24" r="7" fill="#fffbeb" stroke="#d6d3d1" stroke-width="1"/>
        <circle cx="54" cy="21" r="8" fill="#fffbeb" stroke="#d6d3d1" stroke-width="1"/>
        <circle cx="66" cy="23" r="7" fill="#fffbeb" stroke="#d6d3d1" stroke-width="1"/>
        <path d="M48 30 L48 44 Q51 47 52 38 L52 30" fill="#fffbeb"/>
        <line x1="50" y1="36" x2="50" y2="62" stroke="#fde68a" stroke-width="1.5" opacity="0.7"/>
        <line x1="60" y1="36" x2="60" y2="62" stroke="#fde68a" stroke-width="1.5" opacity="0.7"/>
      `, '#fef3c7');

    case 'saloon':
      return s(`
        <!-- Swinging Saloon Doors -->
        <rect x="18" y="10" width="84" height="66" fill="#78350f" stroke="#451a03" stroke-width="2"/>
        <rect x="26" y="18" width="68" height="58" fill="#291709"/>
        <!-- Left Door -->
        <path d="M27 28 L57 32 L57 68 L27 64 Z" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
        <line x1="32" y1="34" x2="52" y2="36" stroke="#78350f" stroke-width="2"/>
        <line x1="32" y1="42" x2="52" y2="44" stroke="#78350f" stroke-width="2"/>
        <line x1="32" y1="50" x2="52" y2="52" stroke="#78350f" stroke-width="2"/>
        <!-- Right Door -->
        <path d="M93 28 L63 32 L63 68 L93 64 Z" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
        <line x1="68" y1="36" x2="88" y2="34" stroke="#78350f" stroke-width="2"/>
        <line x1="68" y1="44" x2="88" y2="42" stroke="#78350f" stroke-width="2"/>
        <line x1="68" y1="52" x2="88" y2="50" stroke="#78350f" stroke-width="2"/>
        <!-- Sign -->
        <rect x="34" y="8" width="52" height="14" rx="2" fill="#fde68a" stroke="#78350f" stroke-width="1.5"/>
        <text x="60" y="18" text-anchor="middle" font-size="9" font-weight="bold" fill="#78350f" font-family="serif">SALOON</text>
      `, '#f5e1be');

    case 'stagecoach':
      return s(`
        <!-- Stagecoach -->
        <line x1="8" y1="68" x2="112" y2="68" stroke="#92400e" stroke-width="2"/>
        <path d="M30 24 L86 24 L92 52 L24 52 Z" fill="#b91c1c" stroke="#451a03" stroke-width="2"/>
        <rect x="38" y="29" width="16" height="14" rx="2" fill="#fef3c7" stroke="#451a03" stroke-width="1.2"/>
        <rect x="62" y="29" width="16" height="14" rx="2" fill="#fef3c7" stroke="#451a03" stroke-width="1.2"/>
        <rect x="26" y="18" width="64" height="6" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
        <!-- Wheels -->
        <circle cx="36" cy="58" r="11" fill="none" stroke="#451a03" stroke-width="2.5"/>
        <circle cx="36" cy="58" r="3" fill="#78350f"/>
        <line x1="25" y1="58" x2="47" y2="58" stroke="#78350f" stroke-width="1.2"/>
        <line x1="36" y1="47" x2="36" y2="69" stroke="#78350f" stroke-width="1.2"/>
        <circle cx="82" cy="58" r="11" fill="none" stroke="#451a03" stroke-width="2.5"/>
        <circle cx="82" cy="58" r="3" fill="#78350f"/>
        <line x1="71" y1="58" x2="93" y2="58" stroke="#78350f" stroke-width="1.2"/>
        <line x1="82" y1="47" x2="82" y2="69" stroke="#78350f" stroke-width="1.2"/>
      `, '#f6e7cb');

    case 'wells_fargo':
      return s(`
        <!-- Armored Gold Chest & Wagon -->
        <rect x="24" y="26" width="72" height="36" rx="3" fill="#1e3a8a" stroke="#172554" stroke-width="2"/>
        <rect x="28" y="30" width="64" height="28" fill="#1d4ed8"/>
        <rect x="24" y="39" width="72" height="5" fill="#fbbf24"/>
        <text x="60" y="22" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#92400e" font-family="serif">WELLS FARGO</text>
        <circle cx="38" cy="64" r="9" fill="#78350f" stroke="#451a03" stroke-width="2"/>
        <circle cx="38" cy="64" r="3" fill="#fbbf24"/>
        <circle cx="82" cy="64" r="9" fill="#78350f" stroke="#451a03" stroke-width="2"/>
        <circle cx="82" cy="64" r="3" fill="#fbbf24"/>
        <rect x="52" y="37" width="16" height="12" rx="2" fill="#f59e0b" stroke="#78350f" stroke-width="1.2"/>
      `, '#f6e7cb');

    case 'panic':
      return s(`
        <!-- Grabbing hand / Lasso -->
        <path d="M16 64 Q40 44 58 46" fill="none" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="76" cy="40" rx="24" ry="16" fill="none" stroke="#b45309" stroke-width="2.5" stroke-dasharray="4 2"/>
        <!-- Card being snatched -->
        <g transform="translate(62,20) rotate(12)">
          <rect x="0" y="0" width="24" height="34" rx="2" fill="#fffbeb" stroke="#78350f" stroke-width="1.5"/>
          <text x="12" y="21" text-anchor="middle" font-size="14" font-weight="bold" fill="#b91c1c">?</text>
        </g>
        <text x="28" y="32" font-size="18" font-weight="bold" fill="#b91c1c" font-family="serif">!</text>
      `, '#fae4c4');

    case 'cat_balou':
      return s(`
        <!-- Lasso & Wanted silhouette -->
        <circle cx="60" cy="30" r="14" fill="#78350f"/>
        <ellipse cx="60" cy="24" rx="24" ry="5" fill="#451a03"/>
        <path d="M40 70 C40 48 80 48 80 70 Z" fill="#991b1b"/>
        <!-- Lasso loop -->
        <ellipse cx="60" cy="46" rx="28" ry="9" fill="none" stroke="#d97706" stroke-width="2.5"/>
        <path d="M88 46 Q104 52 108 72" fill="none" stroke="#d97706" stroke-width="2.2"/>
      `, '#f5dfc0');

    case 'gatling':
      return s(`
        <!-- Gatling Gun on tripod -->
        <line x1="48" y1="46" x2="34" y2="74" stroke="#451a03" stroke-width="3"/>
        <line x1="54" y1="46" x2="68" y2="74" stroke="#451a03" stroke-width="3"/>
        <circle cx="51" cy="48" r="12" fill="none" stroke="#78350f" stroke-width="3"/>
        <!-- Multi-barrels -->
        <rect x="34" y="26" width="54" height="14" rx="2" fill="#4b5563" stroke="#1f2937" stroke-width="1.5"/>
        <line x1="36" y1="30" x2="88" y2="30" stroke="#9ca3af" stroke-width="1.5"/>
        <line x1="36" y1="34" x2="88" y2="34" stroke="#9ca3af" stroke-width="1.5"/>
        <line x1="36" y1="37" x2="88" y2="37" stroke="#9ca3af" stroke-width="1.5"/>
        <!-- Muzzle flashes -->
        <path d="M92 24 L106 20 L98 31 L110 35 L95 39 L102 48 L89 41 Z" fill="#f59e0b" stroke="#dc2626" stroke-width="1"/>
      `, '#f4e0bc');

    case 'indians':
      return s(`
        <!-- Crossed Tomahawk & Feathers -->
        <line x1="30" y1="68" x2="84" y2="18" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
        <path d="M74 16 L94 24 L82 36 L68 24 Z" fill="#6b7280" stroke="#1f2937" stroke-width="1.5"/>
        <!-- Feathers -->
        <path d="M40 20 Q28 36 44 52 Q52 34 40 20 Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.2"/>
        <path d="M52 16 Q42 32 54 46 Q62 30 52 16 Z" fill="#f59e0b" stroke="#78350f" stroke-width="1.2"/>
        <path d="M62 52 L92 68" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <polygon points="24,62 34,58 30,68" fill="#9ca3af"/>
      `, '#f6e3c2');

    case 'duel':
      return s(`
        <!-- Two Crossed Pistols -->
        <g transform="translate(16,18) rotate(22)">
          <rect x="20" y="16" width="42" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.2"/>
          <rect x="14" y="18" width="14" height="10" fill="#4b5563" stroke="#111827" stroke-width="1.2"/>
          <path d="M14 24 C8 26 6 35 8 42 L16 42 C15 34 18 30 22 28 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
        </g>
        <g transform="translate(104,18) scale(-1,1) rotate(22)">
          <rect x="20" y="16" width="42" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.2"/>
          <rect x="14" y="18" width="14" height="10" fill="#4b5563" stroke="#111827" stroke-width="1.2"/>
          <path d="M14 24 C8 26 6 35 8 42 L16 42 C15 34 18 30 22 28 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
        </g>
        <circle cx="60" cy="24" r="6" fill="#f59e0b" opacity="0.7"/>
      `, '#f4e1c1');

    case 'general_store':
      return s(`
        <!-- General Store Goods: Crate, Hat, Bottle -->
        <rect x="22" y="42" width="76" height="30" rx="2" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
        <line x1="22" y1="52" x2="98" y2="52" stroke="#78350f" stroke-width="1.5"/>
        <line x1="22" y1="62" x2="98" y2="62" stroke="#78350f" stroke-width="1.5"/>
        <!-- Items on counter -->
        <rect x="32" y="20" width="12" height="22" rx="2" fill="#15803d" stroke="#14532d" stroke-width="1.2"/>
        <rect x="35" y="14" width="6" height="6" fill="#78350f"/>
        <circle cx="62" cy="30" r="11" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <rect x="78" y="22" width="14" height="20" rx="1" fill="#fef3c7" stroke="#78350f" stroke-width="1.2"/>
      `, '#f5e4c8');

    case 'volcanic':
      return s(`
        <!-- Volcanic Repeating Pistol (fast multi-shot) -->
        <g transform="translate(14,18)">
          <rect x="34" y="16" width="54" height="9" rx="1.5" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <rect x="34" y="25" width="48" height="5" fill="#6b7280" stroke="#111827" stroke-width="1"/>
          <rect x="18" y="16" width="22" height="16" rx="2" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <path d="M18 24 C10 26 8 38 10 48 L20 48 C18 39 21 34 26 32 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
          <circle cx="30" cy="36" r="5" fill="none" stroke="#111827" stroke-width="2"/>
        </g>
        <text x="96" y="24" font-size="15" font-weight="bold" fill="#2b5b84">∞</text>
      `, '#e4ecf4');

    case 'schofield':
      return s(`
        <!-- Schofield Revolver -->
        <g transform="translate(12,18)">
          <rect x="36" y="15" width="56" height="7" rx="1" fill="#4b5563" stroke="#111827" stroke-width="1.5"/>
          <rect x="20" y="16" width="18" height="15" rx="2" fill="#9ca3af" stroke="#111827" stroke-width="1.5"/>
          <circle cx="29" cy="23" r="5" fill="#4b5563"/>
          <path d="M20 23 C12 25 9 38 11 49 L21 49 C19 39 22 34 27 31 Z" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
          <circle cx="32" cy="35" r="4.5" fill="none" stroke="#111827" stroke-width="1.8"/>
        </g>
      `, '#e4ecf4');

    case 'remington':
      return s(`
        <!-- Long-barrel Remington -->
        <g transform="translate(8,20)">
          <rect x="32" y="14" width="70" height="6.5" rx="1" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <path d="M38 20 L82 20 L74 26 L38 24 Z" fill="#6b7280"/>
          <rect x="18" y="15" width="17" height="14" rx="2" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
          <path d="M18 22 C10 25 8 37 10 47 L20 47 C18 37 20 33 25 30 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
        </g>
      `, '#e4ecf4');

    case 'carabine':
      return s(`
        <!-- Rev. Carabine -->
        <g transform="translate(6,22) rotate(-6)">
          <rect x="28" y="16" width="76" height="6" rx="1" fill="#374151" stroke="#111827" stroke-width="1.5"/>
          <path d="M4 26 L30 16 L34 24 L8 38 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
          <circle cx="34" cy="21" r="6" fill="#9ca3af" stroke="#111827" stroke-width="1.5"/>
        </g>
      `, '#e4ecf4');

    case 'winchester':
      return s(`
        <!-- Winchester Lever-Action Rifle -->
        <g transform="translate(4,24) rotate(-8)">
          <rect x="30" y="15" width="80" height="5.5" rx="1" fill="#374151" stroke="#111827" stroke-width="1.4"/>
          <rect x="36" y="20.5" width="54" height="4" fill="#92400e"/>
          <path d="M4 28 L34 15 L36 25 L8 42 Z" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
          <rect x="28" y="15" width="16" height="10" fill="#d97706" stroke="#78350f" stroke-width="1.2"/>
          <ellipse cx="26" cy="29" rx="6" ry="3.5" fill="none" stroke="#111827" stroke-width="1.8"/>
        </g>
      `, '#e4ecf4');

    case 'barrel':
      return s(`
        <!-- Oak Barrel -->
        <ellipse cx="60" cy="42" rx="26" ry="30" fill="#b45309" stroke="#451a03" stroke-width="2"/>
        <ellipse cx="60" cy="18" rx="20" ry="6" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
        <path d="M36 30 Q60 36 84 30" fill="none" stroke="#374151" stroke-width="3.5"/>
        <path d="M35 54 Q60 60 85 54" fill="none" stroke="#374151" stroke-width="3.5"/>
        <line x1="50" y1="23" x2="48" y2="70" stroke="#78350f" stroke-width="1.2"/>
        <line x1="70" y1="23" x2="72" y2="70" stroke="#78350f" stroke-width="1.2"/>
      `, '#e4ecf4');

    case 'mustang':
      return s(`
        <!-- Galloping Mustang Silhouette -->
        <path d="M22 58 Q30 38 50 38 L70 34 Q82 20 92 22 L96 28 L86 34 Q84 44 76 48 L84 68 L76 68 L68 50 L46 50 L36 68 L28 68 L36 52 L22 64 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
        <path d="M74 34 Q78 24 88 22" fill="none" stroke="#451a03" stroke-width="3"/>
        <line x1="14" y1="70" x2="106" y2="70" stroke="#92400e" stroke-width="1.5" stroke-dasharray="6 3"/>
      `, '#e4ecf4');

    case 'scope':
      return s(`
        <!-- Brass Spyglass / Appaloosa Scope -->
        <g transform="translate(14,32) rotate(-14)">
          <rect x="8" y="8" width="24" height="10" rx="2" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <rect x="32" y="6" width="28" height="14" rx="2" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <rect x="60" y="3" width="30" height="20" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
          <ellipse cx="90" cy="13" rx="3" ry="10" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>
        </g>
      `, '#e4ecf4');

    case 'jail':
      return s(`
        <!-- Iron Jail Bars -->
        <rect x="20" y="10" width="80" height="64" fill="#374151" stroke="#111827" stroke-width="2"/>
        <rect x="26" y="16" width="68" height="52" fill="#1f2937"/>
        <line x1="38" y1="14" x2="38" y2="70" stroke="#9ca3af" stroke-width="4"/>
        <line x1="52" y1="14" x2="52" y2="70" stroke="#9ca3af" stroke-width="4"/>
        <line x1="68" y1="14" x2="68" y2="70" stroke="#9ca3af" stroke-width="4"/>
        <line x1="82" y1="14" x2="82" y2="70" stroke="#9ca3af" stroke-width="4"/>
        <line x1="24" y1="42" x2="96" y2="42" stroke="#6b7280" stroke-width="3"/>
      `, '#e4ecf4');

    case 'dynamite':
      return s(`
        <!-- Bundle of Dynamite with Burning Fuse -->
        <rect x="42" y="28" width="11" height="44" rx="2" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"/>
        <rect x="54" y="26" width="11" height="46" rx="2" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.5"/>
        <rect x="66" y="28" width="11" height="44" rx="2" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"/>
        <rect x="40" y="42" width="39" height="6" fill="#1f2937"/>
        <rect x="40" y="56" width="39" height="6" fill="#1f2937"/>
        <!-- Fuse & Spark -->
        <path d="M59 26 Q62 12 78 14" fill="none" stroke="#78350f" stroke-width="2"/>
        <polygon points="80,8 83,13 88,12 84,16 87,21 81,18 76,21 78,16 74,12 79,13" fill="#f59e0b" stroke="#dc2626" stroke-width="0.8"/>
      `, '#fee2e2');

    default:
      return s(`<circle cx="60" cy="42" r="20" fill="#8b5a2b"/>`);
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
  if (c.hatType === 'cowboy') {
    hatSVG = `<ellipse cx="50" cy="28" rx="34" ry="7" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>
              <path d="M30 27 C32 10 42 10 50 13 C58 10 68 10 70 27 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  } else if (c.hatType === 'sombrero') {
    hatSVG = `<ellipse cx="50" cy="29" rx="40" ry="8" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>
              <path d="M34 27 C36 9 64 9 66 27 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>
              <path d="M35 24 Q50 28 65 24" fill="none" stroke="#f59e0b" stroke-width="2"/>`;
  } else if (c.hatType === 'tophat') {
    hatSVG = `<ellipse cx="50" cy="28" rx="28" ry="5" fill="${c.hat}" stroke="#111827" stroke-width="1.5"/>
              <rect x="34" y="6" width="32" height="22" rx="2" fill="${c.hat}" stroke="#111827" stroke-width="1.5"/>
              <rect x="34" y="22" width="32" height="4" fill="#b91c1c"/>`;
  } else if (c.hatType === 'bowler') {
    hatSVG = `<ellipse cx="50" cy="28" rx="28" ry="5" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>
              <path d="M31 28 C31 10 69 10 69 28 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>`;
  } else if (c.hatType === 'bonnet' || c.hatType === 'trapper' || c.hatType === 'cap') {
    hatSVG = `<path d="M26 32 C26 12 74 12 74 32 Z" fill="${c.hat}" stroke="#1c1917" stroke-width="1.5"/>
              <ellipse cx="50" cy="31" rx="26" ry="5" fill="${c.hat}" stroke="#1c1917" stroke-width="1.2"/>`;
  } else {
    hatSVG = `<path d="M28 34 C28 16 72 16 72 34 Z" fill="#57534e"/>`;
  }

  let extraSVG = '';
  if (c.extra === 'bandana') {
    extraSVG = `<path d="M34 54 L66 54 L50 74 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1.2"/>`;
  } else if (c.extra === 'poncho') {
    extraSVG = `<path d="M18 84 L34 56 L66 56 L82 84 Z" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
                <path d="M26 76 L74 76" stroke="#f59e0b" stroke-width="2.5"/>`;
  } else if (c.extra === 'monocle') {
    extraSVG = `<circle cx="58" cy="40" r="5.5" fill="none" stroke="#d97706" stroke-width="1.5"/>
                <line x1="63" y1="42" x2="67" y2="56" stroke="#d97706" stroke-width="1"/>`;
  } else if (c.extra === 'glasses') {
    extraSVG = `<circle cx="42" cy="40" r="5" fill="none" stroke="#374151" stroke-width="1.3"/>
                <circle cx="58" cy="40" r="5" fill="none" stroke="#374151" stroke-width="1.3"/>
                <line x1="47" y1="40" x2="53" y2="40" stroke="#374151" stroke-width="1.3"/>`;
  } else if (c.extra === 'scar') {
    extraSVG = `<path d="M55 34 L63 48" stroke="#991b1b" stroke-width="1.6"/>`;
  } else if (c.extra === 'bandaid') {
    extraSVG = `<rect x="35" y="42" width="10" height="4" rx="1" transform="rotate(-15 40 44)" fill="#fde68a" stroke="#b45309" stroke-width="0.8"/>`;
  } else if (c.extra === 'braids') {
    extraSVG = `<path d="M30 42 L26 68 M70 42 L74 68" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>`;
  }

  let beardSVG = '';
  if (c.beard !== 'none') {
    beardSVG = `<path d="M40 49 Q50 46 60 49 Q56 53 50 51 Q44 53 40 49 Z" fill="${c.beard}"/>`;
  }

  return `<svg viewBox="0 0 100 84" class="char-art-svg" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="84" rx="4" fill="${c.bg}"/>
    <!-- Shoulders -->
    <path d="M18 84 C20 62 34 58 50 58 C66 58 80 62 82 84 Z" fill="#57534e" stroke="#292524" stroke-width="1.5"/>
    <!-- Head -->
    <ellipse cx="50" cy="42" rx="18" ry="20" fill="${c.skin}" stroke="#451a03" stroke-width="1.5"/>
    <!-- Eyes -->
    <circle cx="42" cy="40" r="2.2" fill="#1c1917"/>
    <circle cx="58" cy="40" r="2.2" fill="#1c1917"/>
    <path d="M38 35 L46 36 M54 36 L62 35" stroke="#292524" stroke-width="1.5"/>
    <!-- Mouth -->
    <path d="M45 52 Q50 54 55 52" fill="none" stroke="#78350f" stroke-width="1.4"/>
    ${beardSVG}
    ${extraSVG}
    ${hatSVG}
  </svg>`;
}

function getRoleArtSVG(roleId) {
  const s = (inner, bg) =>
    `<svg viewBox="0 0 100 84" class="role-art-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="84" rx="4" fill="${bg}"/>
      ${inner}
    </svg>`;

  switch (roleId) {
    case 'sheriff':
      return s(`
        <polygon points="50,10 58,31 80,31 62,44 69,66 50,53 31,66 38,44 20,31 42,31" fill="#eab308" stroke="#713f12" stroke-width="2"/>
        <circle cx="50" cy="41" r="9" fill="#fef08a" stroke="#713f12" stroke-width="1.5"/>
      `, '#fef3c7');
    case 'deputy':
      return s(`
        <polygon points="50,12 57,32 78,32 61,44 67,65 50,52 33,65 39,44 22,32 43,32" fill="#60a5fa" stroke="#1e3a8a" stroke-width="2"/>
        <circle cx="50" cy="41" r="8" fill="#dbeafe" stroke="#1e3a8a" stroke-width="1.5"/>
      `, '#dbeafe');
    case 'outlaw':
      return s(`
        <circle cx="50" cy="34" r="14" fill="#292524"/>
        <ellipse cx="50" cy="28" rx="26" ry="5" fill="#1c1917"/>
        <path d="M36 42 L64 42 L50 66 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1.5"/>
        <circle cx="44" cy="35" r="2" fill="#fef3c7"/>
        <circle cx="56" cy="35" r="2" fill="#fef3c7"/>
      `, '#fee2e2');
    case 'renegade':
      return s(`
        <path d="M50 12 L68 44 L50 72 L32 44 Z" fill="#78350f" stroke="#451a03" stroke-width="2"/>
        <path d="M50 18 L60 44 L50 66 L40 44 Z" fill="#f59e0b"/>
        <circle cx="50" cy="44" r="5" fill="#1c1917"/>
      `, '#ede0d4');
    default:
      return s(``, '#f4e4c1');
  }
}
