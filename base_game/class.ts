const c = require('ansi-colors');
// 1console.log(c.red('This is a red string!'));
// console.log(c.green('This is a red string!'));
// console.log(c.cyan('This is a cyan string!'));
// console.log(c.yellow('This is a yellow string!'))
class Player {
  name: string;

  HP: number;

  SRT: number;

  max_hp: number;

  constructor(name: string, HP: number, SRT: number, max_hp: number) {
    this.name = name;
    this.HP = HP;
    this.SRT = SRT;
    this.max_hp = max_hp;
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
    return (c.cyan(`${this.name}\n-HP: ${lettre.repeat(this.HP)}${'_'.repeat(this.max_hp - this.HP)} ${this.HP}/ ${this.max_hp}`));
  }

  Attack(enemy: Player): void {
    enemy.HP -= this.SRT;
  }

  Heal(): void {
    this.HP += (this.max_hp / 2);
    if (this.HP > this.max_hp) {
      this.setHp(this.max_hp);
    }
    console.log(c.cyan('You used heal!\n'));
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function RecupRarity() {
  const Number: number = Math.random() * 100;
  let MyRecupRarity = 0;
  if (Number >= 50 && Number <= 100) {
    MyRecupRarity = 1;
  } else if (Number >= 30 && Number < 50) {
    MyRecupRarity = 2;
  } else if (Number >= 15 && Number < 30) {
    MyRecupRarity = 3;
  } else if (Number >= 4 && Number < 15) {
    MyRecupRarity = 4;
  } else if (Number >= 1 && Number < 4) {
    MyRecupRarity = 5;
  } else { MyRecupRarity = 0; }
  return MyRecupRarity;
}

function RandomPerso(fichier_array: any) {
  const rarete = RecupRarity();
  for (let i = 0; i < fichier_array.length; i += 1) {
    if (rarete === fichier_array[i].rarity) {
      const personnage: Player = new Player(
        fichier_array[i].name,
        fichier_array[i].hp,
        fichier_array[i].str,
        fichier_array[i].hp,
      );
      return personnage;
    }
  }
  return new Player(
    fichier_array[0].name,
    fichier_array[0].HP,
    fichier_array[0].SRT,
    fichier_array[0].max_hp,
  );
}

export {
  Player, RandomPerso, RecupRarity, getRandomInt,
};
