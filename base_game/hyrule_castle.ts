import { Player, RandomPerso } from './class';

const prompt = require('prompt-sync')();
const fs = require('fs');

const DataPlayers = fs.readFileSync('./players.json', 'utf8');
const DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8');
const DataBosses = fs.readFileSync('./bosses.json', 'utf8');
const PlayersJson = JSON.parse(DataPlayers);
const EnnemiesJson = JSON.parse(DataEnnemie);
const BossesJson = JSON.parse(DataBosses);

const c = require('ansi-colors');

// console.log(c.red('This is a red string!'));
// console.log(c.green('This is a green string!'));
// console.log(c.cyan('This is a cyan string!'));
// console.log(c.yellow('This is a yellow string!'));

function Game(personnage: Player) {
  while (personnage.HP > 0) {
    for (let i: number = 1; i <= 10; i += 1) {
      console.log(c.bold.green.italic(`======================================== Etage ${i} ========================================\n`));
      const enemy = (i === 10) ? RandomPerso(BossesJson) : RandomPerso(EnnemiesJson);
      if (i === 10) {
        console.log(c.red(`You encounter a  BOSS ${RandomPerso(BossesJson).name}`));
      }
      let fight = 1;
      while (personnage.HP >= 0 && enemy.HP > 0) {
        console.log(c.bold.yellow.italic(`______________________________________ FIGHT ${fight} ________________________________________\n`));
        console.log(personnage.greetings());
        console.log(enemy.greetings());
        console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'));
        let answer: any = prompt('  Attack  ou   Heal   ');
        if (typeof answer !== 'number') {
          answer = answer.toUpperCase();
        }
        if (answer === 'ATTACK' || answer === '1') {
          personnage.Attack(enemy);
          console.log(c.yellow(`                                  You encounter a ${enemy.name}                                 \n `));
          console.log(c.green(`                               You attacked and deal ${personnage.SRT} dégâts!                        \n `));
        } else if (answer === 'HEAL' || answer === '2') {
          personnage.Heal();
        }
        if (enemy.HP > 0) {
          enemy.Attack(personnage);
        }
        fight += 1;
        if (personnage.HP <= 0) {
          console.log(c.yellow('                      ----------------------GAME OVER---------------------                       '));
          return 1;
        }
      }
    }
    console.log(c.yellow("  ____ __    __   ___ __ ______  ___  ______ __   ___   __  __"))
    console.log(c.yellow(" ||    ||    ||  //   || | || | // \\ | || | ||  // \\  ||\ ||"))
    console.log(c.yellow(" ||==  ||    || ((    ||   ||   ||=||   ||   || ((   )) ||\\||"))
    console.log(c.yellow(" ||    ||__| ||  \\__ ||   ||   || ||   ||   ||  \\_//  || \||"))
  }
}
const personnage: Player = RandomPerso(PlayersJson);
Game(personnage);
