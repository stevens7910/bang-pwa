// Complete Official BANG! Base Game Engine (Async/Promise-driven for smooth UI & AI)

class BangEngine {
  constructor(ui) {
    this.ui = ui;
    this.players = [];
    this.deck = [];
    this.discard = [];
    this.turnIndex = 0;
    this.bangsPlayedThisTurn = 0;
    this.gameOver = false;
    this.winner = null;
    this.logEntries = [];
    this.phase = 'setup'; // setup, start, draw, play, discard, gameover
  }

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  log(msg, tone = 'info') {
    this.logEntries.unshift({ msg, tone, time: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) });
    if (this.logEntries.length > 60) this.logEntries.pop();
    this.ui.renderLog();
  }

  startNewGame(playerCount, chosenCharId = null) {
    this.gameOver = false;
    this.winner = null;
    this.logEntries = [];
    this.deck = this.shuffle(buildDeck());
    this.discard = [];

    const roleIds = this.shuffle(getRoleDistribution(playerCount));
    const chars = this.shuffle([...CHARACTERS]);

    // Ensure human gets chosenCharId if specified
    let humanChar;
    if (chosenCharId && chosenCharId !== 'random') {
      humanChar = CHARACTERS.find(c => c.id === chosenCharId);
      const rest = chars.filter(c => c.id !== chosenCharId);
      chars.splice(0, chars.length, humanChar, ...rest);
    }

    const aiNames = ['Bill', 'Dakota', 'Cheyenne', 'Wyatt', 'Annie', 'Butch'];
    this.players = [];

    for (let i = 0; i < playerCount; i++) {
      const roleObj = ROLES.find(r => r.id === roleIds[i]);
      const charObj = chars[i];
      const isSheriff = roleObj.id === 'sheriff';
      const maxHp = charObj.hp + (isSheriff ? 1 : 0);

      this.players.push({
        id: i,
        name: i === 0 ? 'Ty' : aiNames[i - 1],
        isHuman: i === 0,
        role: roleObj,
        character: charObj,
        hp: maxHp,
        maxHp,
        hand: [],
        table: [], // blue cards: weapon, barrel, mustang, scope, jail, dynamite
        alive: true,
        revealedRole: isSheriff,
        hostilityToSheriff: 0 // AI memory heuristic
      });
    }

    // Deal initial hands equal to maxHp
    for (const p of this.players) {
      for (let c = 0; c < p.maxHp; c++) {
        const card = this.drawCardRaw();
        if (card) p.hand.push(card);
      }
    }

    // Sheriff starts first
    this.turnIndex = this.players.findIndex(p => p.role.id === 'sheriff');
    this.log(`Nová hra pro ${playerCount} hráčů! Šerifem je ${this.players[this.turnIndex].name} (${this.players[this.turnIndex].character.name}).`, 'important');
    this.ui.renderAll();
    this.runTurnLoop();
  }

  livingPlayers() {
    return this.players.filter(p => p.alive);
  }

  drawCardRaw() {
    if (this.deck.length === 0) {
      if (this.discard.length === 0) return null;
      const top = this.discard.pop();
      this.deck = this.shuffle(this.discard);
      this.discard = top ? [top] : [];
      this.log('Dobírací balíček byl zamíchán z odhazovacího.', 'system');
    }
    return this.deck.pop();
  }

  giveCardToPlayer(player, card) {
    if (!card) return;
    player.hand.push(card);
  }

  discardCard(card) {
    if (!card) return;
    this.discard.push(card);
  }

  checkSuzyLafayette(player) {
    if (player.alive && player.character.id === 'suzy_lafayette' && player.hand.length === 0) {
      const c = this.drawCardRaw();
      if (c) {
        player.hand.push(c);
        this.log(`${player.name} (Suzy Lafayette) má prázdnou ruku a dobírá 1 kartu.`, 'ability');
      }
    }
  }

  // Distance from attacker A to target B
  getDistance(a, b) {
    if (a.id === b.id) return 0;
    const living = this.livingPlayers();
    const idxA = living.findIndex(p => p.id === a.id);
    const idxB = living.findIndex(p => p.id === b.id);
    if (idxA === -1 || idxB === -1) return 99;
    const n = living.length;
    let dist = Math.min((idxB - idxA + n) % n, (idxA - idxB + n) % n);

    if (b.table.some(c => c.type === 'mustang')) dist += 1;
    if (b.character.id === 'paul_regret') dist += 1;
    if (a.table.some(c => c.type === 'scope')) dist -= 1;
    if (a.character.id === 'rose_doolan') dist -= 1;

    return Math.max(1, dist);
  }

  getWeaponRange(player) {
    const weapon = player.table.find(c => c.category === 'weapon');
    return weapon ? weapon.range : 1;
  }

  hasUnlimitedBang(player) {
    if (player.character.id === 'willy_the_kid') return true;
    return player.table.some(c => c.type === 'volcanic');
  }

  hasCardOnTable(player, type) {
    return player.table.some(c => c.type === type);
  }

  // "Draw!" (líznout!) check — supports Lucky Duke!
  async performDrawCheck(player, reason) {
    if (player.character.id === 'lucky_duke') {
      const c1 = this.drawCardRaw();
      const c2 = this.drawCardRaw();
      if (!c1) return null;
      if (!c2) {
        this.discardCard(c1);
        return c1;
      }
      let chosen;
      if (player.isHuman) {
        chosen = await this.ui.promptLuckyDuke(c1, c2, reason);
      } else {
        // AI picks hearts if barrel/jail, or non-2-9-spades if dynamite
        if (reason === 'dynamite') {
          const isBad = c => c.suit === 'S' && ['2','3','4','5','6','7','8','9'].includes(c.rank);
          chosen = !isBad(c1) ? c1 : c2;
        } else {
          chosen = c1.suit === 'H' ? c1 : c2;
        }
      }
      this.discardCard(c1);
      this.discardCard(c2);
      this.log(`${player.name} (Lucky Duke) otočil ${c1.rank}${SUITS[c1.suit].symbol} a ${c2.rank}${SUITS[c2.suit].symbol}, vybral ${chosen.rank}${SUITS[chosen.suit].symbol}.`, 'ability');
      return chosen;
    } else {
      const c = this.drawCardRaw();
      if (!c) return null;
      this.discardCard(c);
      this.log(`${player.name} líznul pro ${reason}: ${c.name} (${c.rank}${SUITS[c.suit].symbol}).`, 'system');
      return c;
    }
  }

  async runTurnLoop() {
    while (!this.gameOver) {
      const p = this.players[this.turnIndex];
      if (!p.alive) {
        this.advanceTurnIndex();
        continue;
      }

      this.bangsPlayedThisTurn = 0;
      this.phase = 'start';
      this.ui.renderAll();

      // 1. DYNAMITE CHECK
      const dynIdx = p.table.findIndex(c => c.type === 'dynamite');
      if (dynIdx !== -1) {
        await this.sleep(450);
        const drawn = await this.performDrawCheck(p, 'Dynamit');
        const exploded = drawn && drawn.suit === 'S' && ['2','3','4','5','6','7','8','9'].includes(drawn.rank);
        const dynCard = p.table.splice(dynIdx, 1)[0];
        if (exploded) {
          this.discardCard(dynCard);
          this.log(`💥 DYNAMIT VYBUCHL u hráče ${p.name}! (-3 životy)`, 'danger');
          this.ui.showToast(p.id, '💥 BOOM! -3 ♥');
          await this.damagePlayer(p, 3, null);
          if (this.gameOver || !p.alive) {
            this.advanceTurnIndex();
            continue;
          }
        } else {
          // Pass to next living player
          const living = this.livingPlayers();
          const curIdx = living.findIndex(lp => lp.id === p.id);
          const nextP = living[(curIdx + 1) % living.length];
          nextP.table.push(dynCard);
          this.log(`Dynamit nevybuchl a posouvá se k hráči ${nextP.name}.`, 'system');
        }
        this.ui.renderAll();
      }

      // 2. JAIL CHECK
      const jailIdx = p.table.findIndex(c => c.type === 'jail');
      if (jailIdx !== -1) {
        await this.sleep(450);
        const drawn = await this.performDrawCheck(p, 'Vězení');
        const jailCard = p.table.splice(jailIdx, 1)[0];
        this.discardCard(jailCard);
        if (drawn && drawn.suit === 'H') {
          this.log(`🔓 ${p.name} utekl z Vězení! (♥ Srdce)`, 'good');
          this.ui.showToast(p.id, '🔓 Útěk!');
        } else {
          this.log(`⛓️ ${p.name} zůstává ve Vězení a vynechává tah.`, 'danger');
          this.ui.showToast(p.id, '⛓️ Vynechává tah');
          this.ui.renderAll();
          await this.sleep(700);
          this.advanceTurnIndex();
          continue;
        }
        this.ui.renderAll();
      }

      // 3. DRAW PHASE (Phase 1)
      this.phase = 'draw';
      this.ui.renderAll();
      await this.executeDrawPhase(p);
      if (this.gameOver) break;

      // 4. PLAY PHASE (Phase 2)
      this.phase = 'play';
      this.ui.renderAll();
      if (p.isHuman) {
        await this.ui.waitForHumanEndTurn();
      } else {
        await this.runAITurn(p);
      }
      if (this.gameOver) break;

      // 5. DISCARD PHASE (Phase 3)
      if (p.alive && p.hand.length > p.hp) {
        this.phase = 'discard';
        this.ui.renderAll();
        if (p.isHuman) {
          await this.ui.waitForHumanDiscard(p);
        } else {
          while (p.hand.length > p.hp) {
            const idx = this.pickAICardToDiscard(p);
            const [rem] = p.hand.splice(idx, 1);
            this.discardCard(rem);
            this.log(`${p.name} odhodil ${rem.name}.`, 'system');
          }
        }
      }

      this.checkSuzyLafayette(p);
      this.advanceTurnIndex();
    }
  }

  advanceTurnIndex() {
    this.turnIndex = (this.turnIndex + 1) % this.players.length;
  }

  async executeDrawPhase(p) {
    if (p.character.id === 'kit_carlson') {
      const c1 = this.drawCardRaw();
      const c2 = this.drawCardRaw();
      const c3 = this.drawCardRaw();
      const pool = [c1, c2, c3].filter(Boolean);
      if (pool.length <= 2) {
        pool.forEach(c => p.hand.push(c));
      } else if (p.isHuman) {
        const { kept, returned } = await this.ui.promptKitCarlson(pool);
        kept.forEach(c => p.hand.push(c));
        this.deck.push(returned);
      } else {
        // AI keeps best 2, returns worst
        const sorted = [...pool].sort((a, b) => this.aiCardValue(b, p) - this.aiCardValue(a, p));
        p.hand.push(sorted[0], sorted[1]);
        this.deck.push(sorted[2]);
      }
      this.log(`${p.name} (Kit Carlson) si vybral 2 ze 3 vrchních karet.`, 'ability');
      return;
    }

    let firstCardDrawn = false;
    if (p.character.id === 'jesse_jones') {
      const candidates = this.livingPlayers().filter(o => o.id !== p.id && o.hand.length > 0);
      if (candidates.length > 0) {
        let target = null;
        if (p.isHuman) {
          target = await this.ui.promptJesseJones(candidates);
        } else if (Math.random() < 0.75) {
          target = candidates[Math.floor(Math.random() * candidates.length)];
        }
        if (target) {
          const rIdx = Math.floor(Math.random() * target.hand.length);
          const [stolen] = target.hand.splice(rIdx, 1);
          p.hand.push(stolen);
          this.checkSuzyLafayette(target);
          this.log(`${p.name} (Jesse Jones) si vzal 1. kartu z ruky hráče ${target.name}.`, 'ability');
          firstCardDrawn = true;
        }
      }
    } else if (p.character.id === 'pedro_ramirez' && this.discard.length > 0) {
      const topDiscard = this.discard[this.discard.length - 1];
      let takeDiscard = false;
      if (p.isHuman) {
        takeDiscard = await this.ui.promptPedroRamirez(topDiscard);
      } else {
        takeDiscard = this.aiCardValue(topDiscard, p) >= 5;
      }
      if (takeDiscard) {
        p.hand.push(this.discard.pop());
        this.log(`${p.name} (Pedro Ramirez) si vzal ${topDiscard.name} z odhazovacího balíčku.`, 'ability');
        firstCardDrawn = true;
      }
    }

    if (!firstCardDrawn) {
      const c1 = this.drawCardRaw();
      if (c1) p.hand.push(c1);
    }

    const c2 = this.drawCardRaw();
    if (c2) {
      p.hand.push(c2);
      if (p.character.id === 'black_jack') {
        this.log(`${p.name} (Black Jack) ukázal 2. kartu: ${c2.name} (${c2.rank}${SUITS[c2.suit].symbol}).`, 'ability');
        if (c2.suit === 'H' || c2.suit === 'D') {
          const c3 = this.drawCardRaw();
          if (c3) p.hand.push(c3);
          this.log(`♦/♥ Červená karta! ${p.name} dobírá 1 kartu navíc.`, 'good');
        }
      }
    }
  }

  // Can player play a specific card from hand during their Play phase?
  canPlayCard(player, card) {
    if (this.gameOver || !player.alive) return false;
    if (this.players[this.turnIndex].id !== player.id || this.phase !== 'play') return false;

    const isBang = card.type === 'bang' || (card.type === 'missed' && player.character.id === 'calamity_janet');
    if (isBang) {
      if (this.bangsPlayedThisTurn >= 1 && !this.hasUnlimitedBang(player)) return false;
      return this.getValidBangTargets(player).length > 0;
    }

    if (card.type === 'missed') return false; // normal Vedle! cannot be played on your turn
    if (card.type === 'beer') {
      if (this.livingPlayers().length <= 2) return false;
      return player.hp < player.maxHp;
    }
    if (card.type === 'panic') {
      return this.getValidPanicTargets(player).length > 0;
    }
    if (card.type === 'cat_balou') {
      return this.getValidCatBalouTargets(player).length > 0;
    }
    if (card.type === 'duel') {
      return this.livingPlayers().some(o => o.id !== player.id);
    }
    if (card.type === 'jail') {
      return this.livingPlayers().some(o => o.id !== player.id && o.role.id !== 'sheriff' && !this.hasCardOnTable(o, 'jail'));
    }
    if (card.type === 'dynamite') {
      return !this.hasCardOnTable(player, 'dynamite');
    }
    if (card.category === 'equipment') {
      return !this.hasCardOnTable(player, card.type);
    }
    return true;
  }

  getValidBangTargets(player) {
    const range = this.getWeaponRange(player);
    return this.livingPlayers().filter(o => o.id !== player.id && this.getDistance(player, o) <= range);
  }

  getValidPanicTargets(player) {
    return this.livingPlayers().filter(o => o.id !== player.id && this.getDistance(player, o) <= 1 && (o.hand.length > 0 || o.table.length > 0));
  }

  getValidCatBalouTargets(player) {
    return this.livingPlayers().filter(o => o.id !== player.id && (o.hand.length > 0 || o.table.length > 0));
  }

  async playCard(player, cardUid, targetPlayer = null, targetCardInfo = null) {
    const idx = player.hand.findIndex(c => c.uid === cardUid);
    if (idx === -1) return false;
    const card = player.hand[idx];

    const isBang = card.type === 'bang' || (card.type === 'missed' && player.character.id === 'calamity_janet');

    // Remove from hand first
    player.hand.splice(idx, 1);

    if (card.border === 'blue') {
      if (card.type === 'jail') {
        targetPlayer.table.push(card);
        this.log(`${player.name} zavřel hráče ${targetPlayer.name} do Vězení!`, 'action');
        this.ui.showToast(targetPlayer.id, '⛓️ Vězení!');
      } else if (card.category === 'weapon') {
        const oldWIdx = player.table.findIndex(c => c.category === 'weapon');
        if (oldWIdx !== -1) {
          const [oldW] = player.table.splice(oldWIdx, 1);
          this.discardCard(oldW);
        }
        player.table.push(card);
        this.log(`${player.name} si vyložil zbraň ${card.name} (dostřel ${card.range}).`, 'action');
      } else {
        player.table.push(card);
        this.log(`${player.name} si vyložil kartu ${card.name}.`, 'action');
      }
      this.checkSuzyLafayette(player);
      this.ui.renderAll();
      return true;
    }

    // Brown action card -> discard pile
    this.discardCard(card);
    this.checkSuzyLafayette(player);

    if (isBang) {
      this.bangsPlayedThisTurn++;
      if (player.role.id !== 'sheriff' && targetPlayer.role.id === 'sheriff') {
        player.hostilityToSheriff += 2;
      }
      this.log(`🔫 ${player.name} vystřelil BANG! na ${targetPlayer.name}!`, 'danger');
      this.ui.showToast(targetPlayer.id, '🎯 BANG!');
      this.ui.renderAll();
      await this.resolveBangAttack(player, targetPlayer);
    } else if (card.type === 'beer') {
      if (this.livingPlayers().length > 2 && player.hp < player.maxHp) {
        player.hp++;
        this.log(`🍺 ${player.name} vypil Pivo (+1 život).`, 'good');
        this.ui.showToast(player.id, '🍺 +1 ♥');
      }
    } else if (card.type === 'saloon') {
      for (const lp of this.livingPlayers()) {
        if (lp.hp < lp.maxHp) lp.hp++;
      }
      this.log(`🍻 ${player.name} zahrál Saloon! Všichni získali +1 život.`, 'good');
    } else if (card.type === 'stagecoach') {
      for (let i = 0; i < 2; i++) this.giveCardToPlayer(player, this.drawCardRaw());
      this.log(`🐎 ${player.name} zahrál Dostavník (+2 karty).`, 'action');
    } else if (card.type === 'wells_fargo') {
      for (let i = 0; i < 3; i++) this.giveCardToPlayer(player, this.drawCardRaw());
      this.log(`💰 ${player.name} zahrál Wells Fargo (+3 karty).`, 'action');
    } else if (card.type === 'panic') {
      await this.resolveStealOrDiscard(player, targetPlayer, true, targetCardInfo);
    } else if (card.type === 'cat_balou') {
      await this.resolveStealOrDiscard(player, targetPlayer, false, targetCardInfo);
    } else if (card.type === 'gatling') {
      this.log(`🔥 ${player.name} spustil palbu z KULOMETU na všechny!`, 'danger');
      for (const lp of this.livingPlayers()) {
        if (lp.id !== player.id) {
          await this.resolveSingleMissedCheck(player, lp, 'Kulomet');
          if (this.gameOver) break;
        }
      }
    } else if (card.type === 'indians') {
      this.log(`🏹 ${player.name} poslal INDIÁNY na všechny ostatní!`, 'danger');
      for (const lp of this.livingPlayers()) {
        if (lp.id !== player.id) {
          await this.resolveIndiansTarget(player, lp);
          if (this.gameOver) break;
        }
      }
    } else if (card.type === 'duel') {
      this.log(`⚔️ ${player.name} vyzval ${targetPlayer.name} na DUEL!`, 'danger');
      await this.resolveDuel(player, targetPlayer);
    } else if (card.type === 'general_store') {
      await this.resolveGeneralStore(player);
    }

    this.ui.renderAll();
    return true;
  }

  async resolveBangAttack(attacker, target) {
    const needed = attacker.character.id === 'slab_the_killer' ? 2 : 1;
    let dodged = 0;

    // 1. Jourdonnais innate Barrel
    if (target.character.id === 'jourdonnais' && dodged < needed) {
      const c = await this.performDrawCheck(target, 'Jourdonnais');
      if (c && c.suit === 'H') {
        dodged++;
        this.log(`🛡️ ${target.name} (Jourdonnais) uhnul díky ♥!`, 'good');
        this.ui.showToast(target.id, '🛡️ Uhnul!');
      }
    }

    // 2. Barrel on table
    if (this.hasCardOnTable(target, 'barrel') && dodged < needed) {
      const c = await this.performDrawCheck(target, 'Barel');
      if (c && c.suit === 'H') {
        dodged++;
        this.log(`🛢️ ${target.name} se schoval za Barel (♥)!`, 'good');
        this.ui.showToast(target.id, '🛢️ Barel!');
      }
    }

    // 3. Play Vedle! from hand
    while (dodged < needed) {
      const played = await this.askForMissedCard(target, `BANG! od ${attacker.name} (zbývá odvrátit: ${needed - dodged})`);
      if (played) {
        dodged++;
      } else {
        break;
      }
    }

    if (dodged >= needed) {
      this.ui.showToast(target.id, '🛡️ Vedle!');
      return;
    }

    await this.damagePlayer(target, 1, attacker);
  }

  async resolveSingleMissedCheck(attacker, target, sourceName) {
    let dodged = false;
    if (target.character.id === 'jourdonnais') {
      const c = await this.performDrawCheck(target, 'Jourdonnais');
      if (c && c.suit === 'H') dodged = true;
    }
    if (!dodged && this.hasCardOnTable(target, 'barrel')) {
      const c = await this.performDrawCheck(target, 'Barel');
      if (c && c.suit === 'H') dodged = true;
    }
    if (!dodged) {
      dodged = await this.askForMissedCard(target, sourceName);
    }
    if (dodged) {
      this.ui.showToast(target.id, '🛡️ Vedle!');
    } else {
      await this.damagePlayer(target, 1, attacker);
    }
  }

  isMissedCard(player, card) {
    return card.type === 'missed' || (card.type === 'bang' && player.character.id === 'calamity_janet');
  }

  isBangCard(player, card) {
    return card.type === 'bang' || (card.type === 'missed' && player.character.id === 'calamity_janet');
  }

  async askForMissedCard(target, reason) {
    const validCards = target.hand.filter(c => this.isMissedCard(target, c));
    if (validCards.length === 0) return false;

    let chosenCard = null;
    if (target.isHuman) {
      chosenCard = await this.ui.promptDefenseCard(target, validCards, `Obrana proti: ${reason}`, 'missed');
    } else {
      chosenCard = validCards[0];
    }

    if (!chosenCard) return false;
    const idx = target.hand.findIndex(c => c.uid === chosenCard.uid);
    target.hand.splice(idx, 1);
    this.discardCard(chosenCard);
    this.log(`🛡️ ${target.name} zahrál ${chosenCard.name} jako obranu.`, 'good');
    this.checkSuzyLafayette(target);
    this.ui.renderAll();
    return true;
  }

  async askForBangCard(target, reason) {
    const validCards = target.hand.filter(c => this.isBangCard(target, c));
    if (validCards.length === 0) return false;

    let chosenCard = null;
    if (target.isHuman) {
      chosenCard = await this.ui.promptDefenseCard(target, validCards, reason, 'bang');
    } else {
      chosenCard = validCards[0];
    }

    if (!chosenCard) return false;
    const idx = target.hand.findIndex(c => c.uid === chosenCard.uid);
    target.hand.splice(idx, 1);
    this.discardCard(chosenCard);
    this.log(`💥 ${target.name} odhodil ${chosenCard.name}.`, 'action');
    this.checkSuzyLafayette(target);
    this.ui.renderAll();
    return true;
  }

  async resolveIndiansTarget(attacker, target) {
    const ok = await this.askForBangCard(target, `Indiáni! od ${attacker.name} — odhoď BANG!`);
    if (!ok) {
      await this.damagePlayer(target, 1, attacker);
    }
  }

  async resolveDuel(challenger, target) {
    let current = target;
    let other = challenger;
    while (true) {
      const ok = await this.askForBangCard(current, `Duel s ${other.name} — odhoď BANG!`);
      if (!ok) {
        this.log(`⚔️ ${current.name} prohrál Duel!`, 'danger');
        await this.damagePlayer(current, 1, other);
        break;
      }
      [current, other] = [other, current];
    }
  }

  async resolveStealOrDiscard(actor, target, isSteal, presetInfo) {
    let choice = presetInfo;
    if (!choice) {
      if (actor.isHuman) {
        choice = await this.ui.promptTargetCard(target, isSteal ? 'Panika! — Vezmi kartu' : 'Cat Balou — Odhoď kartu');
      } else {
        if (target.table.length > 0) {
          choice = { zone: 'table', index: 0 };
        } else {
          choice = { zone: 'hand', index: Math.floor(Math.random() * target.hand.length) };
        }
      }
    }

    let takenCard = null;
    if (choice.zone === 'table' && target.table[choice.index]) {
      takenCard = target.table.splice(choice.index, 1)[0];
    } else if (target.hand.length > 0) {
      const rIdx = choice.index !== undefined && target.hand[choice.index] ? choice.index : Math.floor(Math.random() * target.hand.length);
      takenCard = target.hand.splice(rIdx, 1)[0];
      this.checkSuzyLafayette(target);
    }

    if (!takenCard) return;
    if (isSteal) {
      actor.hand.push(takenCard);
      this.log(`✋ ${actor.name} ukradl kartu hráči ${target.name} (${choice.zone === 'table' ? takenCard.name : 'z ruky'}).`, 'action');
    } else {
      this.discardCard(takenCard);
      this.log(`🗑️ ${actor.name} donutil ${target.name} odhodit ${takenCard.name}.`, 'action');
    }
  }

  async resolveGeneralStore(starter) {
    const living = this.livingPlayers();
    const startIdx = living.findIndex(p => p.id === starter.id);
    const pool = [];
    for (let i = 0; i < living.length; i++) {
      const c = this.drawCardRaw();
      if (c) pool.push(c);
    }
    this.log(`🏪 Hokynářství! Otočeno ${pool.length} karet.`, 'action');

    for (let i = 0; i < living.length && pool.length > 0; i++) {
      const p = living[(startIdx + i) % living.length];
      let chosenIdx = 0;
      if (p.isHuman) {
        chosenIdx = await this.ui.promptGeneralStore(pool);
      } else {
        let best = 0;
        for (let j = 1; j < pool.length; j++) {
          if (this.aiCardValue(pool[j], p) > this.aiCardValue(pool[best], p)) best = j;
        }
        chosenIdx = best;
      }
      const [picked] = pool.splice(chosenIdx, 1);
      p.hand.push(picked);
      this.log(`${p.name} si vybral ${picked.name}.`, 'system');
      this.ui.renderAll();
    }
  }

  async damagePlayer(target, amount, attacker) {
    for (let i = 0; i < amount; i++) {
      if (!target.alive) break;
      target.hp--;
      this.log(`🩸 ${target.name} ztratil 1 život (zbývá ${Math.max(0, target.hp)}/${target.maxHp}).`, 'danger');
      this.ui.showToast(target.id, '🩸 -1 ♥');

      // Auto-Beer save if hp <= 0 and > 2 players remain
      if (target.hp <= 0 && this.livingPlayers().length > 2) {
        const beerIdx = target.hand.findIndex(c => c.type === 'beer');
        if (beerIdx !== -1) {
          const [beer] = target.hand.splice(beerIdx, 1);
          this.discardCard(beer);
          target.hp = 1;
          this.log(`🍺 ${target.name} se zachránil na poslední chvíli kartou Pivo!`, 'good');
          this.ui.showToast(target.id, '🍺 Záchrana!');
          this.checkSuzyLafayette(target);
        }
      }

      if (target.hp > 0) {
        if (target.character.id === 'bart_cassidy') {
          const c = this.drawCardRaw();
          if (c) target.hand.push(c);
          this.log(`${target.name} (Bart Cassidy) si lízl 1 kartu za zranění.`, 'ability');
        }
        if (target.character.id === 'el_gringo' && attacker && attacker.id !== target.id && attacker.hand.length > 0) {
          const rIdx = Math.floor(Math.random() * attacker.hand.length);
          const [stolen] = attacker.hand.splice(rIdx, 1);
          target.hand.push(stolen);
          this.checkSuzyLafayette(attacker);
          this.log(`${target.name} (El Gringo) si vzal 1 kartu od ${attacker.name}.`, 'ability');
        }
      } else {
        await this.eliminatePlayer(target, attacker);
        break;
      }
    }
    this.ui.renderAll();
  }

  async eliminatePlayer(victim, attacker) {
    victim.alive = false;
    victim.hp = 0;
    victim.revealedRole = true;
    this.log(`💀 ${victim.name} byl vyřazen! Jeho role byla: ${victim.role.name}.`, 'important');
    this.ui.showToast(victim.id, `💀 ${victim.role.name}`);

    // Vulture Sam takes all cards
    const vulture = this.livingPlayers().find(p => p.character.id === 'vulture_sam' && p.id !== victim.id);
    if (vulture) {
      const loot = [...victim.hand, ...victim.table];
      victim.hand = [];
      victim.table = [];
      vulture.hand.push(...loot);
      if (loot.length > 0) {
        this.log(`🦅 ${vulture.name} (Vulture Sam) si vzal všech ${loot.length} karet vyřazeného hráče.`, 'ability');
      }
    } else {
      victim.hand.forEach(c => this.discardCard(c));
      victim.table.forEach(c => this.discardCard(c));
      victim.hand = [];
      victim.table = [];
    }

    // Check win condition BEFORE rewards
    if (this.checkWinCondition()) return;

    // Rewards / Penalties
    if (attacker && attacker.alive) {
      if (victim.role.id === 'outlaw') {
        for (let i = 0; i < 3; i++) this.giveCardToPlayer(attacker, this.drawCardRaw());
        this.log(`💰 ${attacker.name} vyřadil Banditu a získává odměnu 3 karty!`, 'good');
      } else if (victim.role.id === 'deputy' && attacker.role.id === 'sheriff') {
        attacker.hand.forEach(c => this.discardCard(c));
        attacker.table.forEach(c => this.discardCard(c));
        attacker.hand = [];
        attacker.table = [];
        this.log(`⚠️ Šerif ${attacker.name} omylem zabil svého Pomocníka a musí odhodit všechny karty!`, 'danger');
      }
    }
  }

  checkWinCondition() {
    const living = this.livingPlayers();
    const sheriffAlive = living.some(p => p.role.id === 'sheriff');
    const outlawsAlive = living.some(p => p.role.id === 'outlaw');
    const renegadeAlive = living.some(p => p.role.id === 'renegade');

    if (!sheriffAlive) {
      this.gameOver = true;
      this.phase = 'gameover';
      if (living.length === 1 && living[0].role.id === 'renegade') {
        this.winner = { title: 'Vítězí Odpadlík!', desc: `${living[0].name} zůstal poslední naživu.`, team: 'renegade' };
      } else {
        this.winner = { title: 'Vítězí Bandité!', desc: 'Šerif byl eliminován.', team: 'outlaw' };
      }
    } else if (!outlawsAlive && !renegadeAlive) {
      this.gameOver = true;
      this.phase = 'gameover';
      this.winner = { title: 'Vítězí Šerif a jeho Pomocníci!', desc: 'Všichni Bandité a Odpadlík byli eliminováni.', team: 'law' };
    }

    if (this.gameOver) {
      this.players.forEach(p => { p.revealedRole = true; });
      this.log(`🏆 KONEC HRY: ${this.winner.title}`, 'important');
      this.ui.renderAll();
      this.ui.showGameOver(this.winner);
      return true;
    }
    return false;
  }

  // Sid Ketchum ability
  useSidKetchum(player, cardUids) {
    if (player.character.id !== 'sid_ketchum' || player.hp >= player.maxHp || cardUids.length !== 2) return false;
    for (const uid of cardUids) {
      const idx = player.hand.findIndex(c => c.uid === uid);
      if (idx !== -1) {
        const [c] = player.hand.splice(idx, 1);
        this.discardCard(c);
      }
    }
    player.hp++;
    this.log(`🩺 ${player.name} (Sid Ketchum) odhodil 2 karty a vyléčil si 1 život.`, 'ability');
    this.checkSuzyLafayette(player);
    this.ui.renderAll();
    return true;
  }

  // --- AI LOGIC ---
  aiCardValue(card, player) {
    if (card.type === 'bang') return 7;
    if (card.type === 'missed') return 7;
    if (card.type === 'beer') return player.hp < player.maxHp ? 8 : 4;
    if (card.type === 'barrel') return this.hasCardOnTable(player, 'barrel') ? 1 : 9;
    if (card.type === 'mustang') return this.hasCardOnTable(player, 'mustang') ? 1 : 8;
    if (card.type === 'scope') return this.hasCardOnTable(player, 'scope') ? 1 : 7;
    if (card.category === 'weapon') return 6;
    if (card.type === 'wells_fargo' || card.type === 'stagecoach') return 9;
    return 5;
  }

  pickAICardToDiscard(p) {
    let worstIdx = 0;
    let worstVal = 999;
    p.hand.forEach((c, idx) => {
      const v = this.aiCardValue(c, p);
      if (v < worstVal) {
        worstVal = v;
        worstIdx = idx;
      }
    });
    return worstIdx;
  }

  pickAITarget(ai, candidates) {
    if (candidates.length === 0) return null;
    const sheriff = this.players.find(p => p.role.id === 'sheriff');
    if (ai.role.id === 'outlaw') {
      if (sheriff && candidates.some(c => c.id === sheriff.id)) return sheriff;
    } else if (ai.role.id === 'deputy' || ai.role.id === 'sheriff') {
      const nonSheriff = candidates.filter(c => c.role.id !== 'sheriff');
      if (nonSheriff.length > 0) {
        nonSheriff.sort((a, b) => b.hostilityToSheriff - a.hostilityToSheriff);
        return nonSheriff[0];
      }
    } else if (ai.role.id === 'renegade') {
      const nonSheriff = candidates.filter(c => c.role.id !== 'sheriff');
      if (nonSheriff.length > 0) return nonSheriff[Math.floor(Math.random() * nonSheriff.length)];
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  async runAITurn(ai) {
    await this.sleep(500);

    // Sid Ketchum AI heal
    while (ai.character.id === 'sid_ketchum' && ai.hp < ai.maxHp && ai.hand.length >= 3) {
      this.useSidKetchum(ai, [ai.hand[0].uid, ai.hand[1].uid]);
      await this.sleep(350);
    }

    let madeMove = true;
    let safety = 0;
    while (madeMove && !this.gameOver && ai.alive && safety++ < 20) {
      madeMove = false;
      for (const card of [...ai.hand]) {
        if (!this.canPlayCard(ai, card)) continue;

        let target = null;
        if (card.type === 'bang' || (card.type === 'missed' && ai.character.id === 'calamity_janet')) {
          target = this.pickAITarget(ai, this.getValidBangTargets(ai));
        } else if (card.type === 'panic') {
          target = this.pickAITarget(ai, this.getValidPanicTargets(ai));
        } else if (card.type === 'cat_balou') {
          target = this.pickAITarget(ai, this.getValidCatBalouTargets(ai));
        } else if (card.type === 'duel') {
          const bangCount = ai.hand.filter(c => this.isBangCard(ai, c)).length;
          if (bangCount < 1) continue;
          target = this.pickAITarget(ai, this.livingPlayers().filter(o => o.id !== ai.id));
        } else if (card.type === 'jail') {
          const jailTargets = this.livingPlayers().filter(o => o.id !== ai.id && o.role.id !== 'sheriff' && !this.hasCardOnTable(o, 'jail'));
          target = this.pickAITarget(ai, jailTargets);
        } else if (card.type === 'indians') {
          if (ai.role.id === 'deputy' && this.players.find(p => p.role.id === 'sheriff')?.hp <= 1) continue;
        } else if (card.type === 'gatling') {
          if (ai.role.id === 'deputy' && this.players.find(p => p.role.id === 'sheriff')?.hp <= 1) continue;
        } else if (card.category === 'weapon') {
          const curRange = this.getWeaponRange(ai);
          if (card.range < curRange && card.type !== 'volcanic') continue;
        }

        await this.playCard(ai, card.uid, target);
        madeMove = true;
        await this.sleep(550);
        break;
      }
    }
  }

  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}
