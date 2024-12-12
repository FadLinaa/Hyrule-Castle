// import * as classe from "./class.json";
var Player = /** @class */ (function () {
    function Player() {
        this.name = "link";
        this.HP = 50;
        this.SRT = 50;
        this.max_hp = 500;
        this.def = 40;
        this.res = 40;
    }
    return Player;
}());
var Monster = /** @class */ (function () {
    function Monster() {
        this.name = "bouloulou";
        this.HP = 50;
        this.SRT = 50;
        this.max_hp = 500;
        this.def = 40;
        this.res = 40;
    }
    return Monster;
}());
// class factoryCharacters {
//     function createCharacters(name: string){
//             switch(name) {
//                 case 0:
//             }
//     }
// }
// class class {
//     attack_type: string;
// }
var surname = "";
var entiteFactory = /** @class */ (function () {
    function entiteFactory() {
    }
    entiteFactory.createMonster = function (surname) {
        switch (surname) {
            case "Link":
                return new Player();
                break;
            case "bouloulou":
                return new Monster();
            default:
                console.log("No such day exists!");
                break;
        }
    };
    return entiteFactory;
}());
var hero = entiteFactory.createMonster("Link");
console.log(hero);
