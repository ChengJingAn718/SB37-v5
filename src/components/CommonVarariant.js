import loadAnimation from "../utils/loadAnimation"


const pictureList = [
    ['SB_37_CI_Kangaroo_1',
        'SB_37_CI_Sea-Horse_1',
        'SB_37_CI_Crocodiles_1',
        'SB_37_CI_Horse_1',
        'SB_37_CI_Dolphin_1',
        'SB_37_CI_Dog_1',
        'SB_37_CI_Lobster_1'],

    ['SB_37_CI_Sheep_1',
        'SB_37_CI_Jellyfish_1',
        'SB_37_CI_Hippopotamus_1',
        'SB_37_CI_Deer_1',
        'SB_37_CI_Stingray_1',
        'SB_37_CI_Cat_1',
        'SB_37_CI_Giraffe_1'],

    ['SB_37_CI_Zebra_1',
        'SB_37_CI_Starfish_1',
        'SB_37_CI_Seal_1',
        'SB_37_CI_Cheetah_1',
        'SB_37_CI_Shark_1',
        'SB_37_CI_Fox_1',
        'SB_37_CI_Turtle_1'],

    ['SB_37_CI_Camel_1',
        'SB_37_CI_Whale_1',
        'SB_37_CI_Sea-Otter',
        'SB_37_CI_Pig_1',
        'SB_37_CI_Crab_1',
        'SB_37_CI_Tortoise_1',
        'SB_37_CI_Giraffe_1'
    ],
    ['SB_37_CI_Camel_1',
        'SB_37_CI_Whale_1',
        'SB_37_CI_Sea-Otter',
        'SB_37_CI_Pig_1',
        'SB_37_CI_Crab_1',
        'SB_37_CI_Tortoise_1',
        'SB_37_CI_Giraffe_1'
    ]
]

const backgroundList = [
    ['SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1'],

    ['SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Land_2'],

    ['SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Snow_2',
        'SB_37_FG_Cutout_Land_1',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Land-and-Water_1'],

    ['SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2'],

    ['SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land-and-Water_1',
        'SB_37_FG_Cutout_Land_2'],
]

const roundBackList = [
    ['SB_37_FG_Cutout_Land_1a',
        'SB_37_FG_Cutout_Land_2a',
        'SB_37_FG_Cutout_Land_2a'],

    ['SB_37_FG_Cutout_Land_2a',
        'SB_37_FG_Cutout_Water_1a',
        'SB_37_FG_Cutout_Land_2a'
    ],
    ['SB_37_FG_Cutout_Land_1a',
        'SB_37_FG_Cutout_Land_2a',
        'SB_37_FG_Cutout_Land_1a'],


    ['SB_37_FG_Cutout_Water_1a',
        'SB_37_FG_Cutout_Land_1a',
        'SB_37_FG_Cutout_Snow_1a'],

    ['SB_37_FG_Cutout_Water_1a',
        'SB_37_FG_Cutout_Snow_2a',
        'SB_37_FG_Cutout_Water_1a',]
]

const dangerAnimallist = [
    ['SB_37_CI_Tiger_1',
        'SB_37_CI_Rhinoceros',
        'SB_37_CI_Grey-Parrots'],

    ['SB_37_CI_Elephant',
        'SB_37_CI_Blue-Whale',
        'SB_37_CI_Chimpanzee'],

    ['SB_37_CI_Orangutans',
        'SB_37_CI_Panda',
        'SB_37_CI_Lemur'],

    ['SB_37_CI_Sea-Turtle',
        'SB_37_CI_Pangolin',
        'SB_37_CI_Polar-Bear'],

    ['SB_37_CI_Sea-Otter',
        'SB_37_CI_Penguin_1',
        'SB_37_CI_Blue-Whale']
]

const introBoyOrderList = [
    [2, 1, 2, 2, 1, 2, 1],
    [2, 1, 1, 2, 1, 2, 2],
    [2, 1, 2, 2, 1, 2, 2],
    [1, 1, 2, 2, 2, 2, 1],
    [2, 1, 2]
]

const introAudioList = [
    ['29', '61', '73', '30', '62', '51', '63'],
    ['32', '64', '82', '35', '65', '54', '28'],
    ['41', '66', '85', '42', '67', '58', '76'],
    ['43', '68', '88', '46', '90', '79', '28']
]

const dangerAudioList = [
    ['92', '91', '95'],
    ['98', '97', '103'],
    ['94', '93', '102'],
    ['96', '99', '100'],
    ['101', '104', '97'] //audio missing...
]

const pictureInfoList = [
    [
        { s: 0.45, l: 0.28, t: 0.85 },
        { s: 0.5, l: 0.3, t: 0.8 },
        { s: 0.4, l: 0.2, t: 0.9 },
        { s: 0.5, l: 0.3, t: 0.83 },
        { s: 0.35, l: 0.3, t: 0.95 },
        { s: 0.45, l: 0.3, t: 0.95 },
        { s: 0.25, l: 0.3, t: 0.95 }
    ],
    [
        { s: 0.5, l: 0.22, t: 0.9 },
        { s: 0.45, l: 0.25, t: 0.85 },
        { s: 0.5, l: 0.12, t: 0.85 },
        { s: 0.5, l: 0.25, t: 0.83 },
        { s: 0.45, l: 0.25, t: 0.9 },
        { s: 0.45, l: 0.3, t: 0.95 },
        { s: 0.4, l: 0.28, t: 0.92 }
    ],

    [
        { s: 0.5, l: 0.25, t: 0.85 },
        { s: 0.45, l: 0.275, t: 0.85 },
        { s: 0.42, l: 0.25, t: 0.95 },
        { s: 0.45, l: 0.325, t: 0.83 },
        { s: 0.6, l: 0.2, t: 0.7 },
        { s: 0.5, l: 0.32, t: 0.89 },
        { s: 0.4, l: 0.15, t: 0.9 }
    ],

    [
        { s: 0.6, l: 0.25, t: 0.75 },
        { s: 0.6, l: 0.2, t: 0.75 },
        { s: 0.5, l: 0.15, t: 1.05 },
        { s: 0.55, l: 0.25, t: 0.83 },
        { s: 0.4, l: 0.2, t: 0.9 },
        { s: 0.5, l: 0.15, t: 0.8 },
        { s: 0.4, l: 0.28, t: 0.92 }
    ]
]

const dangerAnimalInfolist = [
    [
        { s: 0.56, l: 0.27, t: 0.73 },
        { s: 0.58, l: 0.21, t: 0.9 },
        { s: 0.5, l: 0.3, t: 0.79 }
    ],

    [
        { s: 0.5, l: 0.25, t: 0.91 },
        { s: 0.65, l: 0.18, t: 1 },
        { s: 0.45, l: 0.3, t: 0.85 }
    ],


    [
        { s: 0.33, l: 0.3, t: 0.85 },
        { s: 0.45, l: 0.275, t: 0.95 },
        { s: 0.35, l: 0.325, t: 0.87 }
    ],

    [
        { s: 0.6, l: 0.2, t: 0.88 },
        { s: 0.5, l: 0.275, t: 1.2 },
        { s: 0.5, l: 0.25, t: 0.9 }
    ],

    [
        { s: 0.6, l: 0.2, t: 1 },
        { s: 0.42, l: 0.25, t: 0.85 },
        { s: 0.6, l: 0.22, t: 1.1 },
    ]

]





const optionAudioList = [
    ['15', '16', '17', '18', '19', '20', '21'],
    ['25', '26', '27', '31', '33', '63', '34'],
    ['44', '45', '47', '49', '50', '52', '53'],
    ['71', '72', '74', '41', '77', '78', '80'], //41
    ['81', '83', '84', '86', '87', '89', '49']

]



const optionFullScreenList = [
    [
        'SB_37_Land-and-Water_BG',
        'SB_37_Water_BG',
        'SB_37_Land_BG_2',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Land-and-Water_BG_2',
        'SB_37_Land_BG_2'
    ],
    [
        'SB_37_Land-and-Water_BG',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1'
    ],
    [
        'SB_37_Land-and-Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Land_BG_1',
        'SB_37_Water_BG',
        'SB_37_Land_BG_1'
    ],
    [
        'SB_37_Land_BG_2',
        'SB_37_Water_BG',
        'SB_37_Snow_BG',
        'SB_37_Land_BG_1',
        'SB_37_Land_BG_1',
        'SB_37_Land-and-Water_BG',
        'SB_37_Water_BG'
    ],
    [
        'SB_37_Land-and-Water_BG',
        'SB_37_Land_BG_1',
        'SB_37_Land-and-Water_BG',
        'SB_37_Land_BG_3',
        'SB_37_Water_BG',
        'SB_37_Land-and-Water_BG',
        'SB_37_Land_BG_1',
    ]
]

const optionThreePartList = [
    [
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_3',
        'SB_37_Layout_BG_1',
    ],
    [
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
    ],
    [
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2'
    ],
    [
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_1',
        'SB_37_Layout_BG_3',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2'
    ],
    [
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_4',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
        'SB_37_Layout_BG_2',
    ]
]


const optionPosInfoList = [
    [
        { s: 0.15, l: 0.25, t: 0.5 },
        { s: 0.18, l: 0.4, t: 0.35 },
        { s: 0.4, l: 0.32, t: 0.2 },
        { s: 0.25, l: 0.4, t: 0.25 },
        { s: 0.4, l: 0.3, t: 0.23 },
        { s: 0.2, l: 0.4, t: 0.38 },
        { s: 0.3, l: 0.37, t: 0.22 }    //tiger
    ],
    [
        { s: 0.25, l: 0.14, t: 0.45 },
        { s: 0.12, l: 0.45, t: 0.3 },     //sea horse
        { s: 0.4, l: 0.32, t: 0.2 },
        { s: 0.2, l: 0.4, t: 0.25 },
        { s: 0.3, l: 0.4, t: 0.33 },
        { s: 0.2, l: 0.45, t: 0.6 },
        { s: 0.4, l: 0.32, t: 0.15 }
    ],
    [
        { s: 0.3, l: 0.14, t: 0.25 },
        { s: 0.35, l: 0.38, t: 0.3 },
        { s: 0.4, l: 0.35, t: 0.15 },
        { s: 0.35, l: 0.35, t: 0.25 },
        { s: 0.35, l: 0.32, t: 0.23 },
        { s: 0.3, l: 0.3, t: 0.28 },
        { s: 0.35, l: 0.3, t: 0.28 }
    ],
    [
        { s: 0.23, l: 0.43, t: 0.25 },
        { s: 0.15, l: -0.45, t: 0.63 },
        { s: 0.4, l: 0.35, t: 0.15 },
        { s: 0.3, l: 0.37, t: 0.2 },
        { s: 0.35, l: 0.38, t: 0.3 },
        { s: 0.3, l: 0.15, t: 0.28 },
        { s: 0.4, l: 0.3, t: 0.1 }
    ],
    [
        { s: 0.2, l: 0.2, t: 0.4 },
        { s: 0.3, l: 0.35, t: 0.35 },
        { s: 0.25, l: 0.21, t: 0.5 },
        { s: 0.45, l: 0.28, t: 0.1 },
        { s: 0.45, l: 0.25, t: 0.1 },
        { s: 0.2, l: 0.2, t: 0.42 },
        { s: 0.2, l: 0.4, t: 0.25 },
    ]
]

const optionEyePosInfoList = [
    [
        { s: 0.15, l: 0.25, t: 0.5 },
        { s: 0.18, l: 0.4, t: 0.35 },
        { s: 0.4, l: 0.32, t: 0.2 },
        { s: 0.25, l: 0.4, t: 0.25 },
        { s: 0.4, l: 0.3, t: 0.23 },
        { s: 0.2, l: 0.4, t: 0.38 },
        { s: 0.067, l: 0.388, t: 0.278 } //tiger
    ],
    [
        { s: 0.25, l: 0.14, t: 0.45 },
        { s: 0.02, l: 0.495, t: 0.33 },
        { s: 0.4, l: 0.32, t: 0.2 },
        { s: 0.028, l: 0.486, t: 0.283 },
        { s: 0.3, l: 0.4, t: 0.33 },
        { s: 0.032, l: 0.549, t: 0.692 },
        { s: 0.4, l: 0.32, t: 0.15 }
    ],
    [
        { s: 0.3, l: 0.14, t: 0.25 },
        { s: 0.35, l: 0.38, t: 0.3 },
        { s: 0.4, l: 0.35, t: 0.15 },
        { s: 0.35, l: 0.35, t: 0.25 },
        { s: 0.35, l: 0.32, t: 0.23 },
        { s: 0.3, l: 0.3, t: 0.28 },
        { s: 0.35, l: 0.3, t: 0.28 }
    ],
    [
        { s: 0.075, l: 0.45, t: 0.301 },
        { s: 0.15, l: 0.41, t: 0.43 },
        { s: 0.4, l: 0.35, t: 0.15 },
        { s: 0.04, l: 0.388, t: 0.288 },

        { s: 0.35, l: 0.38, t: 0.3 },
        { s: 0.3, l: 0.15, t: 0.28 },
        { s: 0.4, l: 0.3, t: 0.1 }
    ],
    [
        { s: 0.08, l: 0.247, t: 0.39 },
        { s: 0.3, l: 0.35, t: 0.35 },
        { s: 0.032, l: 0.229, t: 0.515 },
        { s: 0.45, l: 0.28, t: 0.1 },
        { s: 0.45, l: 0.25, t: 0.1 },
        { s: 0.2, l: 0.2, t: 0.42 },
        { s: 0.2, l: 0.2, t: 0.42 }
    ]
]

const optionCorrectAnswerList = [
    [2, 3, 1, 3, 1, 2, 1],
    [2, 3, 2, 3, 1, 3, 1],
    [2, 1, 3, 1, 1, 3, 1],
    [1, 3, 2, 1, 1, 2, 3],
    [2, 1, 2, 1, 3, 2, 1]
]


const optionCharacterList = [
    [
        'SB_37_CI_Frog_1',
        'SB_37_CI_Fish_1',
        'SB_37_CI_Lion_1',
        'SB_37_CI_Octopus_1',
        'SB_37_CI_Cow_1',
        'SB_37_CI_Penguin_1',
        'SB_37_CI_Tiger_3',
    ],
    [
        'SB_37_CI_Crocodiles_1',
        'SB_37_CI_Sea-Horse_3',
        'SB_37_CI_Horse_1',
        'SB_37_CI_Dolphin_3',
        'SB_37_CI_Dog_1',
        'SB_37_CI_Lobster_3',
        'SB_37_CI_Kangaroo_1',
    ],
    [
        'SB_37_CI_Hippopotamus_1',
        'SB_37_CI_Cat_1',
        'SB_37_CI_Stingray_1',
        'SB_37_CI_Giraffe_1',
        'SB_37_CI_Deer_1',
        'SB_37_CI_Jellyfish_1',
        'SB_37_CI_Sheep_1'
    ],
    [
        'SB_37_CI_Cheetah_3',
        'SB_37_CI_Starfish_3',
        'SB_37_CI_Seal_1',
        'SB_37_CI_Zebra_3',
        'SB_37_CI_Fox_1',
        'SB_37_CI_Turtle_1',
        'SB_37_CI_Shark_1'
    ],
    [
        'SB_37_CI_Crab_3',
        'SB_37_CI_Pig_1',
        'SB_37_CI_Otter_3',
        'SB_37_CI_Camel_1',
        'SB_37_CI_Whale_1',
        'SB_37_CI_Tortoise_1',
        'SB_37_CI_Giraffe_1'
    ]
]

const optionAnimationInfoList = [
    [
        { w: 0.12, l: 0.28, t: 0.48 },
        { w: 0.25, l: 0.35, t: 0.35 },
        { w: 0.5, l: 0.28, t: 0.3 },
        { w: 0.2, l: 0.4, t: 0.3 },
        { w: 0.5, l: 0.25, t: 0.25 },
        { w: 0.15, l: 0.45, t: 0.25 },
        { w: 0.5, l: 0.25, t: 0.3 }
    ],
    [
        { w: 0.25, l: 0.18, t: 0.5 },
        { w: 0.25, l: 0.35, t: 0.35 },
        { w: 0.4, l: 0.3, t: 0.26 },
        { w: 0.2, l: 0.4, t: 0.3 },     //
        { w: 0.2, l: 0.4, t: 0.43 },   //
        { w: 0.1, l: 0.45, t: 0.3 },//
        { w: 0.3, l: 0.38, t: 0.25 }
    ],
    [
        { w: 0.25, l: 0.18, t: 0.4 },
        { w: 0.25, l: 0.38, t: 0.35 },
        { w: 0.35, l: 0.35, t: 0.35 },
        { w: 0.22, l: 0.38, t: 0.15 },     //
        { w: 0.2, l: 0.4, t: 0.2 },   //
        { w: 0.3, l: 0.35, t: 0.25 },//
        { w: 0.25, l: 0.375, t: 0.42 }

    ],
    [
        { w: 0.25, l: 0.18, t: 0.4 },
        { w: 0.25, l: 0.38, t: 0.35 },
        { w: 0.25, l: 0.4, t: 0.4 },
        { w: 0.22, l: 0.38, t: 0.15 },     //
        { w: 0.4, l: 0.3, t: 0.31 },
        { w: 0.12, l: 0.28, t: 0.48 },//
        { w: 0.4, l: 0.3, t: 0.25 }
    ],
    [
        { w: 0.15, l: 0.25, t: 0.5 },
        { w: 0.25, l: 0.38, t: 0.4 },
        { w: 0.4, l: 0.3, t: 0.26 },
        { w: 0.35, l: 0.33, t: 0.27 },     //
        { w: 0.45, l: 0.25, t: 0.15 },   //
        { w: 0.17, l: 0.23, t: 0.5 },
        { w: 0.22, l: 0.38, t: 0.15 },     //
    ]
]

let fileNameList = {
    crocodile: 'SB_37_Character-Interactive_Alligator_1',
    camel: 'SB_37_Character-Interactive_Camel_1',
    cat: 'SB_37_Character-Interactive_Cat_1',
    redFish: 'SB_37_Character-Interactive_ClownFish_1',
    cow: 'SB_37_Character-Interactive_Cow_1',
    crab: 'SB_37_Character-Interactive_Crab_1',
    dog: 'SB_37_Character-Interactive_dog_1',
    elephant: 'SB_37_Character-Interactive_elephantBoy_1',
    fox: 'SB_37_Character-Interactive_fox_1',
    frog: 'SB_37_Character-Interactive_Frog_1',
    giraffe: 'SB_37_Character-Interactive_Giraffe_1',

    turtle: 'SB_37_Character-Interactive_Turtle_1',    //
    tortoise: 'SB_37_Character-Interactive_Tortoise_1',    //
    whale: 'SB_37_Character-Interactive_Whale_1',  //
    shark: 'SB_37_Character-Interactive_Shark_1',  //
    seal: 'SB_37_Character-Interactive_Seal_1',    //
    stingray: 'SB_37_Character-Interactive_Stingray_1',//
    goat: 'SB_37_Character-Interactive_Goat_1',

    hip: 'SB_37_Character-Interactive_Hippopotamus_1',
    horse: 'SB_37_Character-Interactive_Horse_1',
    jelly: 'SB_37_Character-Interactive_JellyFish_1',
    kangaroo: 'SB_37_Character-Interactive_Kangaroo_1',
    leopard: 'SB_37_Character-Interactive_Leopard_1',
    lion: 'SB_37_Character-Interactive_Lion_1',
    mongoose: 'SB_37_Character-Interactive_Mongoose_1',
    octopus: 'SB_37_Character-Interactive_Octopus_1',
    penguin: 'SB_37_Character-Interactive_Penguin_1',
    pig: 'SB_37_Character-Interactive_Pig_1',
    deer: 'SB_37_Character-Interactive_Reindeer_1',
}

const optionAnimationList = [
    ['frog', 'redFish', 'lion', 'octopus', 'cow', 'penguin', 'empty'],  //last lion - tiger
    ['crocodile', 'empty', 'horse', 'empty', 'dog', 'empty', 'kangaroo'],  //2 - sea horse, 4- dolphin ,  6 -lobster
    ['hip', 'cat', 'stingray', 'giraffe', 'deer', 'jelly', 'goat'],
    ['empty', 'empty', 'seal', 'empty', 'fox', 'turtle', 'shark'], //1-chita , 2-starFish  ,4- zebra 
    ['empty', 'pig', 'empty', 'camel', 'whale', 'tortoise', 'giraffe'], //3-otter
]

const varJson = {
    pictureList, backgroundList,
    roundBackList, dangerAnimallist,
    introBoyOrderList, introAudioList,
    dangerAudioList, pictureInfoList, dangerAnimalInfolist,
    optionAudioList, optionCharacterList, optionFullScreenList,
    optionThreePartList, optionPosInfoList, optionCorrectAnswerList,
    optionAnimationList, optionAnimationInfoList, optionEyePosInfoList, turnList
}


const turnList = [
    [2, 6, 0, 1, 4, 3, 5],
    [6, 1, 0, 2, 3, 4, 5],
    [6, 5, 0, 4, 2, 1, 3],
    [3, 1, 2, 0, 6, 4, 5],
    [3, 4, 2, 1, 0, 5, 6]
]

export function getGameInfoState(key, index, isOrder = false) {

    let defaultArray = varJson[key][index]
    if (!isOrder)
        return defaultArray;

    else {
        let newArray = []
        turnList[index].map(turn => {
            newArray.push(defaultArray[turn])
        })

        return newArray;
    }
}

export function getCharacterAnimation(key) {
    return animationList[key]
}

const animationList = {}


let allkeys = Object.keys(fileNameList)

allkeys.map(key => {
    new loadAnimation('main/' + fileNameList[key] + '.json').then(result => {
        animationList[key] = result;
    }, () => { });
})




