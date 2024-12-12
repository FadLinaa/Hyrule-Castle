const prompt = require('prompt-sync')();
import { exit } from "process";
import * as joueurs from "./players.json";
import { Console } from "console";
const fs = require(`fs`)
import * as ennemies from "./ennemies.json";
import * as Bosses from "./bosses.json";
const DataPlayers = fs.readFileSync('./players.json', 'utf8')
const DataEnnemie = fs.readFileSync('./ennemies.json', 'utf8')
const DataBosses = fs.readFileSync('./bosses.json', 'utf8')
const PlayersJson = JSON.parse(DataPlayers)
const EnnemiesJson = JSON.parse(DataEnnemie)
const BossesJson = JSON.parse(DataBosses)
import { player, RandomPerso, RecupRarity, getRandomInt } from "./class"
const c = require('ansi-colors');

function ImpriTitle() {
  console.log(" ▄█        ▄█  ███▄▄▄▄      ▄████████          ███        ▄████████  ▄█          ▄████████")
  console.log('███       ███  ███▀▀▀██▄   ███    ███      ▀█████████▄   ███    ███ ███         ███    ███')
  console.log('███       ███▌ ███   ███   ███    ███         ▀███▀▀██   ███    ███ ███         ███    █▀ ')
  console.log('███       ███▌ ███   ███   ███    ███          ███   ▀   ███    ███ ███        ▄███▄▄▄    ')
  console.log('███       ███▌ ███   ███ ▀███████████          ███     ▀███████████ ███       ▀▀███▀▀▀    ')
  console.log('███       ███  ███   ███   ███    ███          ███       ███    ███ ███         ███    █▄ ')
  console.log('███▌    ▄ ███  ███   ███   ███    ███          ███       ███    ███ ███▌    ▄   ███    ███')
  console.log('█████▄▄██ █▀    ▀█   █▀    ███    █▀          ▄████▀     ███    █▀  █████▄▄██   ██████████')
  console.log('▀                                                                   ▀                     ')
}

function quit() {
  console.log(c.black(" ██████  ██    ██ ██ ████████"))
  console.log(c.black("██    ██ ██    ██ ██    ██    "))
  console.log(c.black("██    ██ ██    ██ ██    ██   "))
  console.log(c.black("██ ▄▄ ██ ██    ██ ██    ██   "))
  console.log(c.black(" ██████   ██████  ██    ██   "))
  console.log(c.black("    ▀▀                       "))
}

function newgame() {
  console.log(c.yellow("                                                                    "))
  console.log(c.yellow("███    ██ ███████ ██     ██      ██████   █████  ███    ███ ███████"))
  console.log(c.yellow("████   ██ ██      ██     ██     ██       ██   ██ ████  ████ ██     "))
  console.log(c.yellow("██ ██  ██ █████   ██  █  ██     ██   ███ ███████ ██ ████ ██ █████  "))
  console.log(c.yellow("██  ██ ██ ██      ██ ███ ██     ██    ██ ██   ██ ██  ██  ██ ██     "))
  console.log(c.yellow("██   ████ ███████  ███ ███       ██████  ██   ██ ██      ██ ███████"))
  console.log(c.yellow("                                                                    "))
}

function InitGame(): number {
  //console.clear()
  quit()
  newgame()
  let answer: any = prompt(c.yellow("- Quel est votre choix ? -    "))
  answer = answer.toUpperCase();
  if (answer === 'QUIT') {
    return 0;
  }
  answer = prompt(c.green(" choose the diffeculty: Normal , Hard , Extreme -    "))
  answer = answer.toUpperCase();

  if (answer === 'NORMAL') {
    return 1
  } else if (answer === 'HARD') {
    return 2
  } else if (answer === 'EXTREME') {
    return 3
  }
  return 0
}

function InitEtage() {
  let answer: any = prompt(c.white("-Please set your number of battles ? :  10 , 20 , 50 , 100"))
  let nombre = parseInt(answer);
  return nombre;
}

function Game(personnage: player) {
  while (personnage.HP > 0) {
    ImpriTitle()
    let diffeculty: number = InitGame()
    if (diffeculty == 0) {
      return
    }
    const option = [`Attack`, `Heal`];
    let etageMax = InitEtage()
    for (let i: number = 1; i <= etageMax; i += 1) {
      console.clear()
      console.log(c.bold.green.italic(`======================================== Etage ${i} ========================================\n`));
      const enemy = (i % 10 === 0) ? RandomPerso(BossesJson) : RandomPerso(EnnemiesJson);
      enemy.multiplier(diffeculty)
      if (i === 10) {
        console.log(c.red(`You encounter a  BOSS ${RandomPerso(BossesJson).name}`));
      }
      let fight = 1;
      while (personnage.HP >= 0 && enemy.HP > 0) {
        console.log(c.bold.yellow.italic(`______________________________________ FIGHT ${fight} ________________________________________\n`))
        console.log(personnage.greetings());
        console.log(enemy.greetings());
        console.log(c.bold.red.italic('                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~                \n'))
        let answer: any = prompt(c.yellow("Attack ou Heal        "))
        if (typeof answer != "number") {
          answer = answer.toUpperCase();
        }
        if (answer === 'ATTACK' || answer === '1') {
          personnage.Attack(enemy);
          console.log(c.red(`You encounter a ${enemy.name}`));
          console.log(c.red(`You attacked and deal ${personnage.SRT} dégâts!`));

        } else if (answer === 'HEAL' || answer === '2') {

          personnage.Heal(personnage);
        }
        if (enemy.HP > 0) {

          enemy.Attack(personnage)

        }
        if (personnage.HP <= 0) {
          console.log("MORT + GAME OVER")
          return 1
        }
        fight += 1;
      }
      personnage.coins()
      console.log(`vous avez gagné 1 coin ! Vous avez désormais ${personnage.coin}`)
      prompt(c.yellow("Voulez vous continuer le jeu ?"))
      console.clear()

    }
    console.log(c.yellow("  ____ __    __   ___ __ ______  ___  ______ __   ___   __  __"))
    console.log(c.yellow(" ||    ||    ||  //   || | || | // \\ | || | ||  // \\  ||\ ||"))
    console.log(c.yellow(" ||==  ||    || ((    ||   ||   ||=||   ||   || ((   )) ||\\||"))
    console.log(c.yellow(" ||    ||__| ||  \\__ ||   ||   || ||   ||   ||  \\_//  || \||"))
  }
}
const personnage: player = RandomPerso(PlayersJson)
Game(personnage)