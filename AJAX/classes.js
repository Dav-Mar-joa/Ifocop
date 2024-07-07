class Player {
  posX = undefined;
  posY = undefined;
  static lore = 'Just a simple classless Player.';

  constructor(nickname, weapon) {
    this.nickname = nickname;
    this.weapon = weapon;
  };

  jump(value) {
    this.posY += value;
    return this.posY;
  };

  loseHp(damage) {
    this.hp = this.hp - damage;

    if (this.hp < 0) {
      this.hp = 0;
    }

    return this.hp;
  };

  gainHp(healing) {
    this.hp += healing;

    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
    return this.hp;
  };

  attack(enemy, damage) {
    if (this.hp <= 0) {
      return `You cannot take any more action, you are dead...`;
    }

    if (enemy.hp <= 0) {
      return `${enemy.nickname} is already dead... come on!`;
    }

    if (enemy.hp > 0) {
      enemy.loseHp(damage);

      return `${this.nickname} attacks ${enemy.nickname} with ${this.weapon} for ${damage}hp! ${enemy.nickname} still has ${enemy.hp}hp left. ${enemy.hp <= 0 ? enemy.nickname + ' has been defeated!' : ''}`;
    }    
  };

  static get lore() {
    return this.lore;
  };

  get posX() {
    return this.posX;
  };

  get posY() {
    return this.posY;
  };

  set posX(value) {
    this.posX += value;
    return this.posX;
  };

  set posY(value) {
    this.posX += value;
    return this.posX;
  };
}

class Warrior extends Player {
  type = 'Fighter';
  maxHp = 100;
  hp = this.maxHp;
  
  constructor(nickname, rage) {
    super(nickname);
    this.rage = rage;
  };
}

class Mage extends Player {
  type = 'Spellcaster';
  maxHp = 70;
  hp = this.maxHp;
  
  constructor(nickname, mana) {
    super(nickname);
    this.mana = mana;
  };
}

class Priest extends Player {
  type = 'Spellcaster';
  maxHp = 60;
  hp = this.maxHp;
  
  constructor(nickname, mana) {
    super(nickname);
    this.mana = mana;
  };
}

Priest.prototype.heal = function(ally, healing) {
  if (this.hp <= 0) {
    return `You cannot take any more action, you are dead...`;
  }

  if (ally.hp <= ally.maxHp) {
    if (ally.hp <= 0) {
      return `${ally.nickname}'s current hp is ${ally.hp}. They require resurrection, at this point, not healing...`;
    }
    ally.gainHp(healing);
  } else {
    return `${ally.nickname} is already at full health! ${ally.nickname} now has ${ally.hp}/${ally.maxHp}hp.`;
  }

  return `${this.nickname} heals ${ally.nickname} for ${healing}hp.`;
}

Mage.prototype.fireball = function (enemy, damage) {
  if (this.hp <= 0) {
    return `You cannot take any more action, you are dead...`;
  }

  if (enemy.hp <= 0) {
    return `${enemy.nickname} is already dead... come on!`;
  }

  if (enemy.hp > 0) {
    enemy.loseHp(damage);

    return `${this.nickname} throw fireball at ${enemy.nickname} with ${this.weapon} for ${damage}hp! ${enemy.nickname} still has ${enemy.hp}hp left. ${enemy.hp <= 0 ? enemy.nickname + ' has been defeated!' : ''}`;
  }  
}

const william = new Warrior('William', 100, 'Greatsword');

const melody = new Mage('Melody', 100, 'Fire staff');

const olivier = new Priest('Olivier', 120, 'Healing wand');

console.log(melody.fireball(william, 51));
console.log(william.attack(melody, 59));
console.log(melody.fireball(william, 50));
console.log(melody.fireball(william, 49));
console.log(olivier.heal(william, 75));


// On utilise les setter de posX et posY pour modifier le positionnement horizontal des personnages...
william.posX = -32;
melody.posY = 25;

// On utilise le getter pour récupérer leurs positions x ou y :
william.posX;
melody.posY;

// On utilise un getter static de la classe 'Player'
Player.lore; // Retourne 'Just a simple classless player.'

// On tente d'utiliser le même getter sur 'william'...
william.lore; // Renvoie une erreur 'lore is undefined' car lore est un getter static de Player...

// ---------------------------------------------

// AUTRE EXEMPLE, sans utiliser le sucre syntaxique 'class' :

// Initialize constructor functions
function Hero(name, level) {
  this.name = name;
  this.level = level;
}

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);

  this.weapon = weapon;
}

function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}

// Pour lier les prototypes de Warrior et Healer à celui de Hero (opération qui n'est PAS effectuée de base),
// il existe deux méthodes: Object.setPrototypeOf() ou Object.create().
// Il se dit qu'au niveau des performances, il est préférable d'utiliser Object.create() pour cette opération, bien que la différence
// soit somme toute assez marginale en réalité...

// On peut donc soit écrire :
Object.setPrototypeOf(Warrior.prototype, Hero.prototype); // Pas recommandé car mute le prototype de Warrior...
Object.setPrototypeOf(Healer.prototype, Hero.prototype); // Pas recommandé car mute le prototype de Healer...

// Ou bien :
Warrior.prototype = Object.create(Hero.prototype); // Meilleure solution !
Healer.prototype = Object.create(Hero.prototype); // Meilleure solution !

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
}

Warrior.prototype.attack = function (target) {
  return `${this.name} attacks ${target} with the ${this.weapon}.`;
}

Healer.prototype.heal = function (target) {
  return `${this.name} casts ${this.spell} on ${target}.`;
}

// Initialize individual character instances
const warrior = new Warrior('Crom', 3, 'Greatsword');
const healer = new Healer('Karen', 4, 'Cura');

warrior.attack('Ratling');
healer.heal(warrior.name);

// ----------------------------------------------------------

// La même chose en utilisant cette fois-ci le sucre syntaxique 'class' (méthode à préférer dans l'écrasante majorité des cas) :

class Hero {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

Hero.prototype.greet = function () {
  return `${this.name} greets you!`;
}

class Warrior extends Hero {
  constructor(weapon, name, level) {
    super(name, level);
    this.weapon = weapon;
  }
}

class Healer extends Hero {
  constructor(spell, name, level) {
    super(name, level);
    this.spell = spell;
  }
}

const warrior2 = new Warrior('Greatsword', 'Crom', 3);
const healer2 = new Healer('Cura', 'Karen', 4);

Warrior.prototype.attack = function (target) {
  return `${this.name} attacks ${target} with the ${this.weapon}.`;
}

Healer.prototype.heal = function (target) {
  return `${this.name} casts ${this.spell} on ${target}.`;
}
warrior2.attack('Ratling');
healer2.heal(warrior2.name);