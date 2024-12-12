"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = exports.RecupRarity = exports.RandomPerso = exports.player = void 0;
var c = require('ansi-colors');
var player = /** @class */ (function () {
    function player(name, HP, SRT, max_hp) {
        this.name = name;
        this.HP = HP;
        this.SRT = SRT;
        this.max_hp = max_hp;
        this.coin = 12;
    }
    player.prototype.getHp = function () {
        return this.HP;
    };
    player.prototype.getname = function () {
        return this.name;
    };
    player.prototype.setHp = function (value) {
        this.HP = value;
    };
    player.prototype.greetings = function () {
        var lettre = 'I';
        return (c.cyan("".concat(this.name, "\n-HP: ").concat(lettre.repeat(this.HP)).concat("_".repeat(this.max_hp - this.HP), " ").concat(this.HP, "/ ").concat(this.max_hp)));
    };
    player.prototype.Attack = function (enemy) {
        enemy.HP -= this.SRT;
    };
    player.prototype.Heal = function (personnage) {
        this.HP += (this.max_hp / 2);
        if (this.HP > this.max_hp) {
            this.setHp(this.max_hp);
        }
        ;
        console.log("You used heal!\n");
    };
    player.prototype.Protect = function (enemy) {
        this.HP -= (enemy.SRT) / 2;
    };
    player.prototype.multiplier = function (b) {
        var multiplicateur = 1;
        if (b === 2) {
            multiplicateur = 1.5;
        }
        else if (b === 3) {
            multiplicateur = 2;
        }
        this.HP = this.HP * multiplicateur;
        this.SRT = this.SRT * multiplicateur;
        this.max_hp = this.max_hp * multiplicateur;
    };
    player.prototype.coins = function () {
        this.coin += 1;
    };
    return player;
}());
exports.player = player;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.getRandomInt = getRandomInt;
function RecupRarity() {
    var Number = Math.random() * 100;
    var recup_rarity = 0;
    if (Number >= 50 && Number <= 100) {
        recup_rarity = 1;
    }
    else if (Number >= 30 && Number < 50) {
        recup_rarity = 2;
    }
    else if (Number >= 15 && Number < 30) {
        recup_rarity = 3;
    }
    else if (Number >= 4 && Number < 15) {
        recup_rarity = 4;
    }
    else if (Number >= 1 && Number < 4) {
        recup_rarity = 5;
    }
    else {
        recup_rarity = 0;
    }
    return recup_rarity;
}
exports.RecupRarity = RecupRarity;
function RandomPerso(fichier_array) {
    var rarete = RecupRarity();
    for (var i = 0; i < fichier_array.length; i += 1) {
        if (rarete === fichier_array[i].rarity) {
            var personnage = new player(fichier_array[i].name, fichier_array[i].hp, fichier_array[i].str, fichier_array[i].hp);
            return personnage;
        }
    }
    return new player(fichier_array[0].name, fichier_array[0].HP, fichier_array[0].SRT, fichier_array[0].max_hp);
}
exports.RandomPerso = RandomPerso;
