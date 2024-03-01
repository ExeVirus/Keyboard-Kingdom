import keyboard from 'keyboardjs';
import { AllBuildings } from '../buildings/AllBuildings.js';

const textColors = [
    '#000000',
    '#FFFFFF',
    '#FBA834',
    '#333A73',
    '#50C4ED',
    '#F38181',
    '#FCE38A',
    '#95E1D3',
    '#F94C10',
    '#FFD0EC',
    '#81689D',
    '#76453B',
    '#FF55BB',
    '#9BCF53'
];

const keyColors = ['key_dark','key_light','key_red','key_blue'];

const rowLengths = [14,14,13,11];
const rowStartNum = [0,14,28,41];

//The key displayed text
const keyText = [
    '~','1','2','3','4','5','6','7','8','9','0','-','=','⌫',
    'TAB','Q','W','E','R','T','Y','U','I','O','P','[',']','\\',
    'CAPS','A','S','D','F','G','H','J','K','L',';','"','ENTER',
    'SHFT','Z','X','C','V','B','N','M',',','.','/'
]

//keyboardJS named keys
const keyNames = [
    '`','1','2','3','4','5','6','7','8','9','0','-','equal','backspace',
    'tab','q','w','e','r','t','y','u','i','o','p','[',']','\\',
    'capslock','a','s','d','f','g','h','j','k','l',';','\'','enter',
    'shift','z','x','c','v','b','n','m','comma','period','forwardslash'
];

//Need the actual keycode we'll receive in the keydown event list
const keySymbols = [];
for (let i = 0; i < keyNames.length; i++) {
    keySymbols.push(keyboard.getLocale().getKeyCodes(keyNames[i]));
}

const spacebar = keyboard.getLocale().getKeyCodes('space');
const esc = keyboard.getLocale().getKeyCodes('escape');


const gameProgression = [
    {'b': AllBuildings['Blacksmith'], 'c': 300},
    {'b': AllBuildings['Blacksmith'], 'c': 700},
    {'b': AllBuildings['Blacksmith'], 'c': 1400},
    {'b': AllBuildings['Blacksmith'], 'c': 1800},
    {'b': AllBuildings['Blacksmith'], 'c': 2400},
    {'b': AllBuildings['Blacksmith'], 'c': 2800},
    {'b': AllBuildings['Blacksmith'], 'c': 3200},
    {'b': AllBuildings['Blacksmith'], 'c': 3600},
    {'b': AllBuildings['Blacksmith'], 'c': 3800},
    {'b': AllBuildings['Blacksmith'], 'c': 4200},
    {'b': AllBuildings['Blacksmith'], 'c': 4600},
    {'b': AllBuildings['Blacksmith'], 'c': 5000},
    {'b': AllBuildings['Blacksmith'], 'c': 5500},
    {'b': AllBuildings['Blacksmith'], 'c': 6000},
    {'b': AllBuildings['Blacksmith'], 'c': 6500},
    {'b': AllBuildings['Blacksmith'], 'c': 7000},
    {'b': AllBuildings['Blacksmith'], 'c': 7500},
    {'b': AllBuildings['Blacksmith'], 'c': 8000},
    {'b': AllBuildings['Blacksmith'], 'c': 8500},
    {'b': AllBuildings['Blacksmith'], 'c': 9000},
    {'b': AllBuildings['Blacksmith'], 'c': 9500},
    {'b': AllBuildings['Blacksmith'], 'c': 10000},
    {'b': AllBuildings['Blacksmith'], 'c': 50000},
    {'b': AllBuildings['Blacksmith'], 'c': 500000000},
]

const Rounds = [
    { //Round 1 - Mice
        totalTime: 10000,
        enemies: [
            {
                timePoint: 5000,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 7500,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 9500,
                enemy: 'Mouse',
                howMany: 1,
            },
        ]
    },{ //Round 2 - Microphones
        totalTime: 20000,
        enemies: [
            {
                timePoint: 0,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 5000,
                enemy: 'Microphone',
                howMany: 1,
            },{
                timePoint: 10000,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 15000,
                enemy: 'Microphone',
                howMany: 2,
            },{
                timePoint: 16000,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 16500,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 17000,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 18000,
                enemy: 'Mouse',
                howMany: 2,
            },
        ]
    },{ //Round 3 - Joystick
        totalTime: 20000,
        enemies: [
            {
                timePoint: 0,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 5000,
                enemy: 'Mouse',
                howMany: 3,
            },{
                timePoint: 6000,
                enemy: 'Microphone',
                howMany: 2,
            },{
                timePoint: 8000,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 12000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 16500,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 17000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 18000,
                enemy: 'Joystick',
                howMany: 1,
            },
        ]
    },{ //Round 4 - Speaker
        totalTime: 40000,
        enemies: [
            {
                timePoint: 20000,
                enemy: 'Speaker',
                howMany: 1,
            },{
                timePoint: 21000,
                enemy: 'Mouse',
                howMany: 3,
            },{
                timePoint: 22000,
                enemy: 'Joystick',
                howMany: 2,
            },{
                timePoint: 23000,
                enemy: 'Microphone',
                howMany: 2,
            },{
                timePoint: 24000,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 25000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 26000,
                enemy: 'Microphone',
                howMany: 1,
            },{
                timePoint: 27000,
                enemy: 'Mouse',
                howMany: 2,
            },
        ]
    },{ //Round 5 - Controller
        totalTime: 30000,
        enemies: [
            {
                timePoint: 0,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 1000,
                enemy: 'Microphone',
                howMany: 2,
            },{
                timePoint: 3000,
                enemy: 'Joystick',
                howMany: 2,
            },{
                timePoint: 7000,
                enemy: 'Controller',
                howMany: 2,
            },{
                timePoint: 8000,
                enemy: 'Speaker',
                howMany: 1,
            },{
                timePoint: 9000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 10000,
                enemy: 'Microphone',
                howMany: 1,
            },{
                timePoint: 11000,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 12000,
                enemy: 'Controller',
                howMany: 1,
            },{
                timePoint: 13000,
                enemy: 'Controller',
                howMany: 1,
            },{
                timePoint: 14000,
                enemy: 'Mouse',
                howMany: 1,
            },{
                timePoint: 14500,
                enemy: 'Joystick',
                howMany: 2,
            },{
                timePoint: 15000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 15500,
                enemy: 'Speaker',
                howMany: 1,
            },{
                timePoint: 16000,
                enemy: 'Microphone',
                howMany: 1,
            },{
                timePoint: 17000,
                enemy: 'Controller',
                howMany: 1,
            },{
                timePoint: 17500,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 18000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 19000,
                enemy: 'Controller',
                howMany: 1,
            },{
                timePoint: 20000,
                enemy: 'Controller',
                howMany: 1,
            },{
                timePoint: 21000,
                enemy: 'Mouse',
                howMany: 3,
            },{
                timePoint: 23000,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 23500,
                enemy: 'Joystick',
                howMany: 1,
            },{
                timePoint: 24000,
                enemy: 'Microphone',
                howMany: 1,
            },{
                timePoint: 25000,
                enemy: 'Mouse',
                howMany: 2,
            },{
                timePoint: 26000,
                enemy: 'Speaker',
                howMany: 1,
            },{
                timePoint: 28000,
                enemy: 'Controller',
                howMany: 2,
            },{
                timePoint: 29000,
                enemy: 'Speaker',
                howMany: 1,
            },
        ]
    },
]

export const constants = {
    textColors,
    keyColors,
    keyText,
    keySymbols,
    rowLengths,
    rowStartNum,
    gameProgression,
    spacebar,
    esc,
    Rounds
};