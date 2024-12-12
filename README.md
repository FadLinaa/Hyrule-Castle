
# Hyrule-Castle
# Installations:
npm :npm install;
Node.js
tsc: pour compiler le code TypeScript


### RPG Player System
Ce projet implémente un système de gestion de personnages de type RPG avec des fonctionnalités de combat, de soins et de gestion des caractéristiques. Le code est écrit en TypeScript.

 ### Description
Le fichier class contient une classe Player qui représente un joueur, ainsi que des fonctions supplémentaires pour générer des personnages aléatoires avec différentes raretés. Le système de combat permet à un joueur d'attaquer un autre joueur, de se soigner et de gérer ses points de vie.

 ### Principales fonctionnalités
`Gestion des points de vie (HP)` : Un joueur a des points de vie qui peuvent être modifiés par des actions comme les attaques ou les soins.
`Attaque` : Un joueur peut attaquer un autre joueur en réduisant ses points de vie en fonction de sa force d'attaque (SRT).
`Soins`: Un joueur peut se soigner pour restaurer une partie de ses points de vie.
`Génération de personnages aléatoires`: Un personnage est généré aléatoirement avec une rareté attribuée à partir d'une liste de personnages.
Installation
Assurez-vous que vous avez Node.js installé sur votre machine.
Exécutez npm install pour installer les dépendances (si nécessaire).
Compilation du code TypeScript avec tsc.

# Classes et Fonctions
`Player (Classe)`
La classe Player définit un joueur avec les attributs suivants :

name (string) : Le nom du joueur.
HP (number) : Les points de vie actuels du joueur.
SRT (number) : La force d'attaque du joueur.
max_hp (number) : Les points de vie maximum du joueur.

`Méthodes de la classe Player` :
`getHp()` : Retourne les points de vie actuels du joueur.
`getname()` : Retourne le nom du joueur.
`setHp(value: number)`: Définit les points de vie du joueur à une valeur spécifiée.
`greetings() `: Affiche une représentation visuelle des points de vie du joueur (comme une barre de santé).
`Attack(enemy: Player)` : Permet au joueur d'attaquer un autre joueur, réduisant ses points de vie en fonction de la force d'attaque.
``Heal()`: Permet au joueur de se soigner, augmentant ses points de vie de 50% de son maximum, sans dépasser la valeur maximale.
`RecupRarity() (Fonction)`
Cette fonction génère un nombre aléatoire et détermine la rareté d'un personnage en fonction de nombre Rareté.

`RandomPerso(fichier_array: any) (Fonction)`
Cette fonction prend un tableau de personnages (fichier_array), choisit un personnage en fonction de la rareté générée, et retourne un objet Player correspondant à ce personnage.

### RPG Game - Combat System
Ce projet implémente un jeu RPG avec des mécanismes de combat entre un personnage joueur et des ennemis, y compris des boss. Le jeu est écrit en TypeScript et utilise des fichiers JSON pour stocker les données des joueurs, ennemis et boss.

# Description
Le jeu génère un personnage aléatoire en fonction des données fournies dans un fichier JSON et le place dans un scénario de combat contre des ennemis à chaque étage. Le joueur a le choix entre attaquer ou se soigner à chaque tour. Le but est de survivre à tous les étages et de vaincre le boss à la fin du dernier étage.
Le jeu s'arrête dès que le personnage meurt (HP <= 0), et le message "Game Over" apparaît.

# Fonctionnalités
`Génération aléatoire de personnages` : Les personnages sont générés avec des attributs aléatoires tels que les points de vie (HP) et la force d'attaque (SRT).
`Combat contre des ennemis et des boss`: Le joueur combat des ennemis ou un boss à chaque étage.
`Choix entre attaquer ou se soigner` : Le joueur choisit à chaque tour s'il veut attaquer l'ennemi ou se soigner.
`Progression à travers des étages` : Le joueur progresse à travers 10 étages, rencontrant un boss au dernier étage.
`Modes de combat`: Vous pouvez attaquer, vous soigner, vous protéger, ou utiliser des multiplicateurs pour augmenter vos caractéristiques.
`Protection` : Le joueur peut se protéger et réduire les dégâts reçus de l'ennemi en payant un coût en HP.
`Multiplicateurs de caractéristiques `: Le joueur peut utiliser un multiplicateur pour améliorer temporairement ses caractéristiques (HP, SRT).
`Collecte de pièces` : Le joueur gagne des pièces au fur et à mesure du jeu, ce qui peut être utilisé pour acheter des améliorations ou des soins.
# Technologies utilisées
* TypeScript : Le code du jeu est écrit en TypeScript.
* fs (File System) : Utilisé pour lire les fichiers JSON contenant les données des personnages, ennemis et boss.
* ansi-colors : Utilisé pour ajouter des couleurs aux sorties dans la console.
* prompt-sync : Utilisé pour obtenir les entrées de l'utilisateur dans la console.

# Fichiers JSON
Les données des personnages, ennemis et boss sont stockées dans des fichiers JSON :
* players.json : Contient les informations des personnages (nom, points de vie, force d'attaque, rareté).
* ennemies.json : Contient les ennemis contre lesquels le joueur va combattre.
* bosses.json : Contient les boss que le joueur rencontrera à la fin du jeu.

**Comment jouer**

À chaque tour, le joueur peut choisir parmi les options suivantes :

* Attack : Attaque l'ennemi et inflige des dégâts en fonction de la force d'attaque (SRT).
* Heal : Soigne le personnage et restaure une partie de ses points de vie, mais ne peut pas dépasser les points de vie maximaux.
* Protect : Réduit les dégâts reçus de l'ennemi de moitié en sacrifiant des points de vie.
* Multiplier : Applique un multiplicateur aux caractéristiques du personnage pour augmenter ses points de vie (HP), sa force d'attaque (SRT), et ses points de vie maximaux (max_hp).
Progression
**Le jeu est divisé en 10 étages, avec un combat contre un boss à la fin de chaque partie. Le joueur peut gagner des pièces en combattant et les utiliser pour améliorer ses capacités ou acheter des objets.
Explication des nouvelles méthodes
1. Protect(enemy: player)
Le joueur peut utiliser cette méthode pour se protéger pendant le combat. Lorsqu'il active la protection, il réduit les dégâts reçus de l'ennemi de moitié, mais cela coûte une partie de ses points de vie.

2. multiplier(b: number)
Cette méthode permet d'appliquer un multiplicateur aux caractéristiques du joueur :

b = 1 : Pas de changement.
b = 2 : Augmente les caractéristiques de 1.5x.
b = 3 : Augmente les caractéristiques de 2x.
Le multiplicateur affecte les points de vie (HP), la force d'attaque (SRT), et les points de vie maximaux.

3. coins()
Chaque fois que le joueur gagne une pièce, la méthode coins() augmente le nombre de pièces du joueur de 1.

 **Fonctionnement du code**
Game(personnage: player)
La fonction principale du jeu qui gère l'ensemble de la logique du jeu :

Combat : Le joueur combat contre des ennemis ou des boss. À chaque tour, le joueur choisit d'attaquer, de se soigner, de se protéger ou d'utiliser un multiplicateur.
- Progression : Le jeu se poursuit avec 10 étages. À chaque étage, un nouvel ennemi ou un boss est généré.
- Game Over : Le jeu se termine lorsque le joueur perd tous ses points de vie (HP <= 0).
 
 