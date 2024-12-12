"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = exports.RecupRarity = exports.RandomPerso = exports.player = void 0;
var player = /** @class */ (function () {
    function player(name, HP, SRT, max_hp) {
        this.name = name;
        this.HP = HP;
        this.SRT = SRT;
        this.max_hp = max_hp;
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
        return ("".concat(this.name, "\n-HP: ").concat(lettre.repeat(this.HP), "  ").concat(this.HP, "/ ").concat(this.max_hp));
    };
    player.prototype.Attack = function (enemy) {
        enemy.HP -= this.SRT;
    };
    player.prototype.Heal = function (personnage) {
        this.HP += (this.max_hp / 2);
        console.log(this.HP);
        console.log(this.max_hp);
        if (this.HP > this.max_hp) {
            this.setHp(this.max_hp);
        }
        ;
        console.log("You used heal!");
    };
    player.prototype.Protect = function (enemy) {
        this.HP -= (enemy.SRT) / 2;
    };
    return player;
}());
exports.player = player;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.getRandomInt = getRandomInt;
// switch case 
function RecupRarity() {
    var Number = Math.random() * 100;
    var recup_rarity = 0;
    switch (Number) {
        case (0):
            return recup_rarity = 0;
            break;
        case (1):
            return recup_rarity = 5;
            break;
        case (4):
            return recup_rarity = 4;
            break;
        case (15):
            return recup_rarity = 3;
            break;
        case (30):
            return recup_rarity = 2;
            break;
        case (50):
            return recup_rarity = 1;
            break;
            Default: break;
    }
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
