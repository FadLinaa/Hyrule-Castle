"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require('prompt-sync')();
var fs = require("fs");
var DataPlayers = fs.readFileSync('./players.json', 'utf8');
var DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8');
var DataBosses = fs.readFileSync('./bosses.json', 'utf8');
var PlayersJson = JSON.parse(DataPlayers);
var EnnemiesJson = JSON.parse(DataEnnemie);
var BossesJson = JSON.parse(DataBosses);
var better_combat_options_1 = require("./better_combat_options");
//const c = require('ansi-colors');
function Game(personnage) {
    while (personnage.HP > 0) {
        var option = ["Attack", "Heal"];
        for (var i = 1; i <= 10; i += 1) {
            console.log("-----Etage ".concat(i, "------"));
            var enemy = (i === 10) ? (0, better_combat_options_1.RandomPerso)(BossesJson) : (0, better_combat_options_1.RandomPerso)(EnnemiesJson);
            if (i === 10) {
                console.log("You encounter a ".concat((0, better_combat_options_1.RandomPerso)(BossesJson).name));
            }
            var fight = 1;
            while (personnage.HP >= 0 && enemy.HP > 0) {
                console.log("======== FIGHT ".concat(fight, "========"));
                console.log(personnage.greetings());
                console.log(enemy.greetings());
                console.log('----Options----------\n');
                var answer = prompt("Attack ou Heal ou Escape ou Protect ");
                if (typeof answer != "number") {
                    answer = answer.toUpperCase();
                }
                if (answer === 'ESCAPE' || answer === 3) {
                    console.log("Vous quitter le jeu");
                    return 0;
                }
                if (answer === 'ATTACK' || answer === 1) {
                    personnage.Attack(enemy);
                    console.log("You encounter a ".concat(enemy.name));
                    console.log("You attacked and deal ".concat(personnage.SRT, " d\u00E9g\u00E2ts!"));
                }
                else if (answer === 'HEAL' || answer === 2) {
                    personnage.Heal(personnage);
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
            console.log("MORT + GAME OVER");
            return 1;
        }
        console.log("FELICITATION");
    }
}
var personnage = (0, better_combat_options_1.RandomPerso)(PlayersJson);
Game(personnage);
