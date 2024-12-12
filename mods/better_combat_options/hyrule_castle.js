"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
var prompt = require('prompt-sync')();
var fs = require('fs');
var c = require('ansi-colors');
var DataPlayers = fs.readFileSync('./players.json', 'utf8');
var DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8');
var DataBosses = fs.readFileSync('./bosses.json', 'utf8');
var PlayersJson = JSON.parse(DataPlayers);
var EnnemiesJson = JSON.parse(DataEnnemie);
var BossesJson = JSON.parse(DataBosses);
function Game(personnage) {
    while (personnage.HP > 0) {
        for (var i = 1; i <= 10; i += 1) {
            console.log(c.bold.green.italic("======================================== Etage ".concat(i, " ========================================\n")));
            var enemy = (i === 10) ? (0, class_1.RandomPerso)(BossesJson) : (0, class_1.RandomPerso)(EnnemiesJson);
            if (i === 10) {
                console.log("You encounter a ".concat((0, class_1.RandomPerso)(BossesJson).name));
            }
            var fight = 1;
            while (personnage.HP >= 0 && enemy.HP > 0) {
                console.log(c.bold.yellow.italic("______________________________________ FIGHT ".concat(fight, " ________________________________________\n")));
                console.log(personnage.greetings());
                console.log(enemy.greetings());
                console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'));
                var answer = prompt('Attack ou Heal ou Escape ou Protect     ');
                if (typeof answer !== 'number') {
                    answer = answer.toUpperCase();
                }
                if (answer === 'ESCAPE' || answer === 3) {
                    console.log('Vous quitter le jeu');
                    return 0;
                }
                if (answer === 'ATTACK' || answer === 1) {
                    personnage.Attack(enemy);
                    console.log("You encounter a ".concat(enemy.name));
                    console.log("You attacked and deal ".concat(personnage.SRT, " d\u00E9g\u00E2ts!"));
                }
                else if (answer === 'HEAL' || answer === 2) {
                    personnage.Heal();
                }
                else if (answer === 'PROTECT' || answer === 4) {
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
var personnage = (0, class_1.RandomPerso)(PlayersJson);
Game(personnage);
