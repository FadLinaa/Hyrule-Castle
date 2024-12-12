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
var class_1 = require("./class");
var c = require('ansi-colors');
function ImpriTitle() {
    console.log(" ▄█        ▄█  ███▄▄▄▄      ▄████████          ███        ▄████████  ▄█          ▄████████");
    console.log('███       ███  ███▀▀▀██▄   ███    ███      ▀█████████▄   ███    ███ ███         ███    ███');
    console.log('███       ███▌ ███   ███   ███    ███         ▀███▀▀██   ███    ███ ███         ███    █▀ ');
    console.log('███       ███▌ ███   ███   ███    ███          ███   ▀   ███    ███ ███        ▄███▄▄▄    ');
    console.log('███       ███▌ ███   ███ ▀███████████          ███     ▀███████████ ███       ▀▀███▀▀▀    ');
    console.log('███       ███  ███   ███   ███    ███          ███       ███    ███ ███         ███    █▄ ');
    console.log('███▌    ▄ ███  ███   ███   ███    ███          ███       ███    ███ ███▌    ▄   ███    ███');
    console.log('█████▄▄██ █▀    ▀█   █▀    ███    █▀          ▄████▀     ███    █▀  █████▄▄██   ██████████');
    console.log('▀                                                                   ▀                     ');
}
function quit() {
    console.log(c.black(" ██████  ██    ██ ██ ████████"));
    console.log(c.black("██    ██ ██    ██ ██    ██    "));
    console.log(c.black("██    ██ ██    ██ ██    ██   "));
    console.log(c.black("██ ▄▄ ██ ██    ██ ██    ██   "));
    console.log(c.black(" ██████   ██████  ██    ██   "));
    console.log(c.black("    ▀▀                       "));
}
function newgame() {
    console.log(c.yellow("                                                                    "));
    console.log(c.yellow("███    ██ ███████ ██     ██      ██████   █████  ███    ███ ███████"));
    console.log(c.yellow("████   ██ ██      ██     ██     ██       ██   ██ ████  ████ ██     "));
    console.log(c.yellow("██ ██  ██ █████   ██  █  ██     ██   ███ ███████ ██ ████ ██ █████  "));
    console.log(c.yellow("██  ██ ██ ██      ██ ███ ██     ██    ██ ██   ██ ██  ██  ██ ██     "));
    console.log(c.yellow("██   ████ ███████  ███ ███       ██████  ██   ██ ██      ██ ███████"));
    console.log(c.yellow("                                                                    "));
}
function InitGame() {
    //console.clear()
    quit();
    newgame();
    var answer = prompt(c.yellow("- Quel est votre choix ? -    "));
    answer = answer.toUpperCase();
    if (answer === 'QUIT') {
        return 0;
    }
    answer = prompt(c.green(" choose the diffeculty: Normal , Hard , Extreme -    "));
    answer = answer.toUpperCase();
    if (answer === 'NORMAL') {
        return 1;
    }
    else if (answer === 'HARD') {
        return 2;
    }
    else if (answer === 'EXTREME') {
        return 3;
    }
    return 0;
}
function InitEtage() {
    var answer = prompt(c.white("-Please set your number of battles ? :  10 , 20 , 50 , 100"));
    var nombre = parseInt(answer);
    return nombre;
}
function Game(personnage) {
    while (personnage.HP > 0) {
        ImpriTitle();
        var diffeculty = InitGame();
        if (diffeculty == 0) {
            return;
        }
        var option = ["Attack", "Heal"];
        var etageMax = InitEtage();
        for (var i = 1; i <= etageMax; i += 1) {
            console.clear();
            console.log(c.bold.green.italic("======================================== Etage ".concat(i, " ========================================\n")));
            var enemy = (i % 10 === 0) ? (0, class_1.RandomPerso)(BossesJson) : (0, class_1.RandomPerso)(EnnemiesJson);
            enemy.multiplier(diffeculty);
            if (i === 10) {
                console.log(c.red("You encounter a  BOSS ".concat((0, class_1.RandomPerso)(BossesJson).name)));
            }
            var fight = 1;
            while (personnage.HP >= 0 && enemy.HP > 0) {
                console.log(c.bold.yellow.italic("______________________________________ FIGHT ".concat(fight, " ________________________________________\n")));
                console.log(personnage.greetings());
                console.log(enemy.greetings());
                console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'));
                var answer = prompt(c.yellow("Attack ou Heal        "));
                if (typeof answer != "number") {
                    answer = answer.toUpperCase();
                }
                if (answer === 'ATTACK' || answer === '1') {
                    personnage.Attack(enemy);
                    console.log(c.red("You encounter a ".concat(enemy.name)));
                    console.log(c.red("You attacked and deal ".concat(personnage.SRT, " d\u00E9g\u00E2ts!")));
                }
                else if (answer === 'HEAL' || answer === '2') {
                    personnage.Heal(personnage);
                }
                if (enemy.HP > 0) {
                    enemy.Attack(personnage);
                }
                if (personnage.HP <= 0) {
                    console.log("MORT + GAME OVER");
                    return 1;
                }
                fight += 1;
            }
            personnage.coins();
            console.log("vous avez gagn\u00E9 1 coin ! Vous avez d\u00E9sormais ".concat(personnage.coin));
            prompt(c.yellow("Voulez vous continuer le jeu ?"));
            console.clear();
        }
        console.log(c.yellow("  ____ __    __   ___ __ ______  ___  ______ __   ___   __  __"));
        console.log(c.yellow(" ||    ||    ||  //   || | || | // \\ | || | ||  // \\  ||\ ||"));
        console.log(c.yellow(" ||==  ||    || ((    ||   ||   ||=||   ||   || ((   )) ||\\||"));
        console.log(c.yellow(" ||    ||__| ||  \\__ ||   ||   || ||   ||   ||  \\_//  || \||"));
    }
}
var personnage = (0, class_1.RandomPerso)(PlayersJson);
Game(personnage);
