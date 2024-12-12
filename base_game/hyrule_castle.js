"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
var prompt = require('prompt-sync')();
var fs = require('fs');
var DataPlayers = fs.readFileSync('./players.json', 'utf8');
var DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8');
var DataBosses = fs.readFileSync('./bosses.json', 'utf8');
var PlayersJson = JSON.parse(DataPlayers);
var EnnemiesJson = JSON.parse(DataEnnemie);
var BossesJson = JSON.parse(DataBosses);
var c = require('ansi-colors');
// console.log(c.red('This is a red string!'));
// console.log(c.green('This is a green string!'));
// console.log(c.cyan('This is a cyan string!'));
// console.log(c.yellow('This is a yellow string!'));
function Game(personnage) {
    while (personnage.HP > 0) {
        for (var i = 1; i <= 10; i += 1) {
            console.log(c.bold.green.italic("======================================== Etage ".concat(i, " ========================================\n")));
            var enemy = (i === 10) ? (0, class_1.RandomPerso)(BossesJson) : (0, class_1.RandomPerso)(EnnemiesJson);
            if (i === 10) {
                console.log(c.red("You encounter a  BOSS ".concat((0, class_1.RandomPerso)(BossesJson).name)));
            }
            var fight = 1;
            while (personnage.HP >= 0 && enemy.HP > 0) {
                console.log(c.bold.yellow.italic("______________________________________ FIGHT ".concat(fight, " ________________________________________\n")));
                console.log(personnage.greetings());
                console.log(enemy.greetings());
                console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'));
                var answer = prompt('  Attack  ou   Heal   ');
                if (typeof answer !== 'number') {
                    answer = answer.toUpperCase();
                }
                if (answer === 'ATTACK' || answer === '1') {
                    personnage.Attack(enemy);
                    console.log(c.yellow("                                  You encounter a ".concat(enemy.name, "                                 \n ")));
                    console.log(c.green("                               You attacked and deal ".concat(personnage.SRT, " d\u00E9g\u00E2ts!                        \n ")));
                }
                else if (answer === 'HEAL' || answer === '2') {
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
        console.log(c.yellow("  ____ __    __   ___ __ ______  ___  ______ __   ___   __  __"));
        console.log(c.yellow(" ||    ||    ||  //   || | || | // \\ | || | ||  // \\  ||\ ||"));
        console.log(c.yellow(" ||==  ||    || ((    ||   ||   ||=||   ||   || ((   )) ||\\||"));
        console.log(c.yellow(" ||    ||__| ||  \\__ ||   ||   || ||   ||   ||  \\_//  || \||"));
    }
}
var personnage = (0, class_1.RandomPerso)(PlayersJson);
Game(personnage);
