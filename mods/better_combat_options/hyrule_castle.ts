import { Player, RandomPerso } from './class';

const prompt = require('prompt-sync')();

const fs = require('fs');
const c = require('ansi-colors');

const DataPlayers = fs.readFileSync('./players.json', 'utf8');
const DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8');
const DataBosses = fs.readFileSync('./bosses.json', 'utf8');
const PlayersJson = JSON.parse(DataPlayers);
const EnnemiesJson = JSON.parse(DataEnnemie);
const BossesJson = JSON.parse(DataBosses);

function Game(personnage : Player) {
  while (personnage.HP > 0) {
    for (let i: number = 1; i <= 10; i += 1) {
      console.log(c.bold.green.italic(`======================================== Etage ${i} ========================================\n`));
      const enemy = (i === 10) ? RandomPerso(BossesJson) : RandomPerso(EnnemiesJson);
      if (i === 10) {
        console.log(`You encounter a ${RandomPerso(BossesJson).name}`);
      }
      let fight = 1;
      while (personnage.HP >= 0 && enemy.HP > 0) {
        console.log(c.bold.yellow.italic(`______________________________________ FIGHT ${fight} ________________________________________\n`));
        console.log(personnage.greetings());
        console.log(enemy.greetings());
        console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'));
        let answer: any = prompt('Attack ou Heal ou Escape ou Protect     ');
        if (typeof answer !== 'number') {
          answer = answer.toUpperCase();
        }
        if (answer === 'ESCAPE' || answer === 3) {
          console.log('Vous quitter le jeu');
          return 0;
        }

        if (answer === 'ATTACK' || answer === 1) {
          personnage.Attack(enemy);
          console.log(`You encounter a ${enemy.name}`);
          console.log(`You attacked and deal ${personnage.SRT} dégâts!`);
        } else if (answer === 'HEAL' || answer === 2) {
          personnage.Heal();
        } else if (answer === 'PROTECT' || answer === 4) {
          personnage.Protect(enemy);
        }
        if (enemy.HP > 0) {
          enemy.Attack(personnage);
        }
        fight += 1;
      }
    }
    if (personnage.HP <= 0) {
      console.log('MORT + GAME OVER');
      return 1;
    }
    console.log('FELICITATION');
  }
}
const personnage = RandomPerso(PlayersJson);
Game(personnage);
