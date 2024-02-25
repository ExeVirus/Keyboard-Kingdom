import keyboard from 'keyboardjs';

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

export const constants = {
    textColors,
    keyColors,
    keyText,
    keySymbols,
    rowLengths,
    rowStartNum
};