"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = exports.RecupRarity = exports.RandomPerso = exports.Player = void 0;
var c = require('ansi-colors');
// 1console.log(c.red('This is a red string!'));
// console.log(c.green('This is a red string!'));
// console.log(c.cyan('This is a cyan string!'));
// console.log(c.yellow('This is a yellow string!'))
var Player = /** @class */ (function () {
    function Player(name, HP, SRT, max_hp) {
        this.name = name;
        this.HP = HP;
        this.SRT = SRT;
        this.max_hp = max_hp;
    }
    Player.prototype.getHp = function () {
        return this.HP;
    };
    Player.prototype.getname = function () {
        return this.name;
    };
    Player.prototype.setHp = function (value) {
        this.HP = value;
    };
    Player.prototype.greetings = function () {
        var lettre = 'I';
        return (c.cyan("".concat(this.name, "\n-HP: ").concat(lettre.repeat(this.HP)).concat('_'.repeat(this.max_hp - this.HP), " ").concat(this.HP, "/ ").concat(this.max_hp)));
    };
    Player.prototype.Attack = function (enemy) {
        enemy.HP -= this.SRT;
    };
    Player.prototype.Heal = function () {
        this.HP += (this.max_hp / 2);
        if (this.HP > this.max_hp) {
            this.setHp(this.max_hp);
        }
        console.log(c.cyan('You used heal!\n'));
    };
    return Player;
}());
exports.Player = Player;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.getRandomInt = getRandomInt;
function RecupRarity() {
    var Number = Math.random() * 100;
    var MyRecupRarity = 0;
    if (Number >= 50 && Number <= 100) {
        MyRecupRarity = 1;
    }
    else if (Number >= 30 && Number < 50) {
        MyRecupRarity = 2;
    }
    else if (Number >= 15 && Number < 30) {
        MyRecupRarity = 3;
    }
    else if (Number >= 4 && Number < 15) {
        MyRecupRarity = 4;
    }
    else if (Number >= 1 && Number < 4) {
        MyRecupRarity = 5;
    }
    else {
        MyRecupRarity = 0;
    }
    return MyRecupRarity;
}
exports.RecupRarity = RecupRarity;
function RandomPerso(fichier_array) {
    var rarete = RecupRarity();
    for (var i = 0; i < fichier_array.length; i += 1) {
        if (rarete === fichier_array[i].rarity) {
            var personnage = new Player(fichier_array[i].name, fichier_array[i].hp, fichier_array[i].str, fichier_array[i].hp);
            return personnage;
        }
    }
    return new Player(fichier_array[0].name, fichier_array[0].HP, fichier_array[0].SRT, fichier_array[0].max_hp);
}
exports.RandomPerso = RandomPerso;
