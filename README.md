# Memory Game 🎮

Un jeu de memory interactif créé avec HTML, CSS et JavaScript.

## Description

Ce jeu de memory met au défi votre mémoire en vous demandant de trouver toutes les paires de cartes identiques. Retournez deux cartes à la fois et essayez de mémoriser leur position pour trouver toutes les paires !

## Fonctionnalités

- 16 cartes (8 paires d'images)
- Images aléatoires provenant de Picsum Photos
- Animation de retournement des cartes
- Détection automatique des paires
- Message de félicitations à la fin du jeu
- Design responsive avec fond violet

## Comment jouer

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Cliquez sur une carte pour la retourner
3. Cliquez sur une deuxième carte
4. Si les deux cartes correspondent, elles restent retournées
5. Si elles ne correspondent pas, elles se retournent après 1 seconde
6. Continuez jusqu'à trouver toutes les paires !

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)

## Structure du projet

```
Memory-game/
├── index.html      # Page principale
├── script.js       # Logique du jeu
├── style.css       # Styles et animations
└── README.md       # Ce fichier
```

## Installation

Aucune installation nécessaire ! Clonez simplement le projet et ouvrez `index.html` dans votre navigateur.

```bash
git clone https://github.com/EtoileSombre/Memory-game.git
cd Memory-game
```

Puis ouvrez `index.html` dans votre navigateur préféré.

## Pour aller plus loin

Grâce à ce projet, nous avons pu aborder plusieurs aspects clés du développement web, notamment l'utilisation de JavaScript. Cette compétence est particulièrement importante pour ajouter des fonctionnalités engageantes à vos sites, c'est-à-dire pour rendre vos sites plus attractifs et plus fluides pour vos clients. Vous avez pu constater l'utilité de l'API DOM, des tableaux, des boucles, des sélecteurs CSS, et des fonctions en JavaScript.

Même si ce projet ne rentre pas dans un cadre professionnel, il résume très bien les compétences fondamentales en développement front.

Il reste encore beaucoup de fonctionnalités potentielles à implémenter, en voici quelques-unes :

### Mettre un chronomètre
Lancer un chronomètre en JS au début de la partie, et afficher le temps à la fin de la partie pour donner un score à l'utilisateur.

### Ajouter la possibilité de recommencer une partie sans rafraîchir la page
Pour cela, il suffit d'ajouter un bouton permettant de régénérer le plateau et de remettre à 0 toutes vos variables de jeu.

### Bloquer les clics pendant la seconde d'attente
Pendant la seconde d'attente avant de valider une paire, ou de retourner les cartes, on peut encore cliquer sur les autres cartes, c'est un bug qui pourrait compromettre le bon déroulement de la partie.

### Stocker les précédents scores en cookie
Pour faire une moyenne des scores et établir un meilleur score personnel à battre, on pourrait stocker les scores en cookie pour pouvoir faire des statistiques dessus.

---

Bon jeu ! 🎉
