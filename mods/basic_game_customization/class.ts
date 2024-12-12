var c = require('ansi-colors');
class player {
  name: string;
  HP: number;
  SRT: number;
  max_hp: number;
  coin: number;

  constructor(name: string, HP: number, SRT: number, max_hp: number) {
    this.name = name;
    this.HP = HP;
    this.SRT = SRT;
    this.max_hp = max_hp;
    this.coin = 12;
  }

  public getHp() {
    return this.HP;
  }
  public getname() {
    return this.name;
  }

  public setHp(value: number) {
    this.HP = value;
  }


  greetings() {
    const lettre: string = 'I';
    return (c.cyan(`${this.name}\n-HP: ${lettre.repeat(this.HP)}${"_".repeat(this.max_hp - this.HP)} ${this.HP}/ ${this.max_hp}`));
  }

  Attack(enemy: player): void {
    enemy.HP -= this.SRT;

  }

  Heal(personnage: player): void {
    this.HP += (this.max_hp / 2);
    if (this.HP > this.max_hp) {
      this.setHp(this.max_hp);
    };
    console.log(`You used heal!\n`);

  }

  Protect(enemy: player): void {
    this.HP -= (enemy.SRT) / 2
  }

  multiplier(b: number) {
    let multiplicateur = 1;
    if (b === 2) {
      multiplicateur = 1.5
    } else if (b === 3) {
      multiplicateur = 2
    }
    this.HP = this.HP * multiplicateur
    this.SRT = this.SRT * multiplicateur
    this.max_hp = this.max_hp * multiplicateur
  }
  coins() {
    this.coin += 1;
  }

}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function RecupRarity() {
  let Number: number = Math.random() * 100
  let recup_rarity = 0;
  if (Number >= 50 && Number <= 100) {
    recup_rarity = 1;
  } else if (Number >= 30 && Number < 50) {
    recup_rarity = 2;
  } else if (Number >= 15 && Number < 30) {
    recup_rarity = 3
  } else if (Number >= 4 && Number < 15) {
    recup_rarity = 4
  } else if (Number >= 1 && Number < 4) {
    recup_rarity = 5
  } else { recup_rarity = 0 }
  return recup_rarity
}

function RandomPerso(fichier_array: any) {
  const rarete = RecupRarity();
  for (let i = 0; i < fichier_array.length; i += 1) {
    if (rarete === fichier_array[i].rarity) {
      const personnage: player = new player(fichier_array[i].name, fichier_array[i].hp, fichier_array[i].str, fichier_array[i].hp);
      return personnage;
    }
  }
  return new player(fichier_array[0].name, fichier_array[0].HP, fichier_array[0].SRT, fichier_array[0].max_hp)
}

export { player, RandomPerso, RecupRarity, getRandomInt }