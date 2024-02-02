# Keyboard Kingdom

[Play the Game](https://exevirus.github.io/Keyboard-Kingdom)

```
Build your kingdom,
Defend your kingdom,
Be patient with your kingdom,
Grab a friend for your kingdom,
Do a dance to the rhythm of your kingdom, 
Evolve your kingdom,
Take to the heavens above your kingdom, 
Transcend your kingdom.
```

Or in Haiku form:

```
     Create your great kingdom.
   Defend, cherish, this kingdom.
      Transcend the kingdom.
```

# Rough Idea

The input device of the game is the entire keyboard.

More specifically, none of the function keys, and none of the bottom row of keys. So, roughly 12x4 rows, plus the extra 5 in the top right corner (looking at you `return, +, ], \, and backspace`), and numpad island.

For example, excluding numpad island:
![alt text](keyboard.png)

Enemies will come from the right, down the four lanes of keys.

You start by placing your kingdom on the left half, and can initially, only
click that keyboard key of the kingdom, and any other empty key.
When you click an empty key, a smite from the heavens lands on that key, this ability does have a short cooldown...

To grow your kingdom, you will hold down your kingdom key. Build with spacebar when you have enough [resource_name], and don't let your kingdom fall. Enemies will gradually get stronger. There are difficulty levels.

Each building is unique, die when an enemy touches them (both explode), and must be rebuilt before forward progress can be made. Some buildings are resource generating, others have unique abilities, and others are plain defensive buildings. 

There may be different civilizations, with different tech trees, so you have full defensive - bad econ, great econ - bad defensive, etc. Not every building will be used by every tech tree (except the default tech tree)

#### Note: 

Keyboards do have a physical limit of the number of simultaneous keys they can respond to at once, and each keyboard is different - even in single player you might benefit from multiple keyboards, also keep in mind optimal placement so you don't fry your fingers... you have been warned.

# Backend Design

Tech trees will simply be a text list, everything will be json...

I'll build it in html5 + canvas element. keyboard-js for input, LOTS of timer code, gif2sprite sheet will be used heavily, etc. 

Only needs like 10 different kinds of enemies or something, most of the variety will come from the buildings and their input styles - even though they are single-key...


# Blog

### Day 1

Created this readme and repository.
