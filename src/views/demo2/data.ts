export const data = {
    "nodes": [
        { "id": "frontend", "name": "前端开发", "symbolSize": 60, "category": 0 },
        { "id": "framework", "name": "前端框架", "symbolSize": 50, "category": 1 },
        {
            id: "vue",
            name: "Vue.js",
            category: 1,
            symbolSize: 150,
            itemStyle: {
                color: "red",          // 节点颜色
                borderColor: "#000",    // 边框颜色
                borderWidth: 2,
                shadowBlur: 10,
                shadowColor: "rgba(0,0,0,0.2)"
            },
            label: {
                show: true,
                color: "#333",
                fontSize: 16,
                fontWeight: "bold"
            }
        },
        { "id": "react", "name": "React", "symbolSize": 35, "category": 1 },
        { "id": "svelte", "name": "Svelte", "symbolSize": 30, "category": 1 },
        { "id": "build", "name": "构建工具", "symbolSize": 45, "category": 2 },
        { "id": "vite", "name": "Vite", "symbolSize": 30, "category": 2 },
        { "id": "webpack", "name": "Webpack", "symbol0Size": 30, "category": 2 },
        { "id": "rollup", "name": "Rollup", "symbolSize": 30, "category": 2 },
        { "id": "language", "name": "编程语言", "symbolSize": 45, "category": 3 },
        { "id": "js", "name": "JavaScript", "symbolSize": 35, "category": 3 },
        { "id": "ts", "name": "TypeScript", "symbolSize": 35, "category": 3 },
        { "id": "tool", "name": "开发工具", "symbolSize": 40, "category": 4 },
        { "id": "vscode", "name": "VSCode", "symbolSize": 30, "category": 4 },
        { "id": "chrome", "name": "Chrome DevTools", "symbolSize": 30, "category": 4 }
    ],
    "links": [
        { "source": "frontend", "target": "framework" },
        { "source": "frontend", "target": "build" },
        { "source": "frontend", "target": "language" },
        { "source": "frontend", "target": "tool" },

        { "source": "framework", "target": "vue" },
        { "source": "framework", "target": "react" },
        { "source": "framework", "target": "svelte" },

        { "source": "build", "target": "vite" },
        { "source": "build", "target": "webpack" },
        { "source": "build", "target": "rollup" },

        { "source": "language", "target": "js" },
        { "source": "language", "target": "ts" },

        { "source": "tool", "target": "vscode" },
        { "source": "tool", "target": "chrome" }
    ],
    "categories": [
        { "name": "主类" },
        { "name": "框架" },
        { "name": "构建工具" },
        { "name": "语言" },
        { "name": "工具" }
    ]
}

export const fullData = {
    "1": {
        "包含": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ]
    },
    "2": {
        "前导": [
            1
        ],
        "包含": [
            10,
            11
        ]
    },
    "3": {
        "前导": [
            1,
            7
        ],
        "包含": [
            50,
            51,
            52,
            53,
            54
        ]
    },
    "4": {
        "前导": [
            1,
            76
        ],
        "包含": [
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70
        ]
    },
    "5": {
        "前导": [
            1,
            8
        ],
        "包含": [
            67,
            68,
            71,
            72,
            73,
            74,
            75,
            76,
            146
        ]
    },
    "6": {
        "前导": [
            1
        ],
        "包含": [
            97,
            98,
            99
        ]
    },
    "7": {
        "前导": [
            1,
            129,
            9
        ],
        "包含": [
            103,
            104,
            105,
            106,
            107,
            3
        ]
    },
    "8": {
        "前导": [
            1
        ],
        "包含": [
            116,
            117,
            118,
            5,
            147,
            148,
            149
        ]
    },
    "9": {
        "前导": [
            1
        ],
        "包含": [
            125,
            126,
            127,
            128,
            7
        ]
    },
    "10": {
        "前导": [
            2
        ],
        "包含": [
            12,
            13,
            14,
            15
        ]
    },
    "11": {
        "前导": [
            2
        ],
        "包含": [
            36,
            37
        ]
    },
    "12": {
        "前导": [
            10
        ],
        "包含": [
            16,
            17,
            18,
            19,
            20
        ]
    },
    "13": {
        "前导": [
            10,
            84,
            85,
            86
        ],
        "包含": [
            21,
            22,
            23,
            24,
            25,
            139
        ]
    },
    "14": {
        "前导": [
            10
        ],
        "包含": [
            26,
            27,
            28,
            29,
            30
        ]
    },
    "15": {
        "前导": [
            10
        ],
        "包含": [
            31,
            32,
            33,
            34,
            35
        ]
    },
    "16": {
        "前导": [
            12
        ]
    },
    "17": {
        "前导": [
            12
        ]
    },
    "18": {
        "前导": [
            12
        ]
    },
    "19": {
        "前导": [
            12
        ]
    },
    "20": {
        "前导": [
            12
        ]
    },
    "21": {
        "前导": [
            13
        ]
    },
    "22": {
        "前导": [
            13
        ]
    },
    "23": {
        "前导": [
            13
        ]
    },
    "24": {
        "前导": [
            13
        ]
    },
    "25": {
        "前导": [
            13
        ]
    },
    "26": {
        "前导": [
            14,
            60,
            56
        ],
        "包含": [
            139,
            140
        ]
    },
    "27": {
        "前导": [
            14,
            59,
            55,
            40
        ]
    },
    "28": {
        "前导": [
            14,
            63,
            76
        ]
    },
    "29": {
        "前导": [
            14
        ]
    },
    "30": {
        "前导": [
            14,
            63,
            76
        ]
    },
    "31": {
        "前导": [
            15
        ]
    },
    "32": {
        "前导": [
            15
        ]
    },
    "33": {
        "前导": [
            15
        ]
    },
    "34": {
        "前导": [
            15
        ]
    },
    "35": {
        "前导": [
            15
        ]
    },
    "36": {
        "前导": [
            11
        ],
        "包含": [
            38,
            39,
            40,
            41,
            42,
            43
        ]
    },
    "37": {
        "前导": [
            11
        ],
        "包含": [
            44,
            45,
            46,
            47,
            48,
            49
        ]
    },
    "38": {
        "前导": [
            36
        ]
    },
    "39": {
        "前导": [
            36
        ]
    },
    "40": {
        "前导": [
            36
        ],
        "包含": [
            27
        ]
    },
    "41": {
        "前导": [
            36
        ],
        "包含": [
            146
        ]
    },
    "42": {
        "前导": [
            36
        ],
        "包含": [
            147,
            149
        ]
    },
    "43": {
        "前导": [
            36
        ]
    },
    "44": {
        "前导": [
            37
        ]
    },
    "45": {
        "前导": [
            37
        ]
    },
    "46": {
        "前导": [
            37
        ]
    },
    "47": {
        "前导": [
            37
        ]
    },
    "48": {
        "前导": [
            37
        ]
    },
    "49": {
        "前导": [
            37
        ]
    },
    "50": {
        "前导": [
            3
        ]
    },
    "51": {
        "前导": [
            3
        ],
        "包含": [
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62
        ]
    },
    "52": {
        "前导": [
            3
        ]
    },
    "53": {
        "前导": [
            3
        ],
        "包含": [
            138
        ]
    },
    "54": {
        "前导": [
            3
        ]
    },
    "55": {
        "前导": [
            51
        ],
        "包含": [
            27
        ]
    },
    "56": {
        "前导": [
            51
        ],
        "包含": [
            26
        ]
    },
    "57": {
        "前导": [
            51
        ]
    },
    "58": {
        "前导": [
            51
        ],
        "包含": [
            141
        ]
    },
    "59": {
        "前导": [
            51
        ],
        "包含": [
            27,
            141
        ]
    },
    "60": {
        "前导": [
            51
        ],
        "包含": [
            26,
            141
        ]
    },
    "61": {
        "前导": [
            51
        ],
        "包含": [
            139,
            140,
            141
        ]
    },
    "62": {
        "前导": [
            51,
            88
        ],
        "包含": [
            139,
            140,
            141
        ]
    },
    "63": {
        "前导": [
            4
        ],
        "包含": [
            28,
            30
        ]
    },
    "64": {
        "前导": [
            4
        ]
    },
    "65": {
        "前导": [
            4
        ]
    },
    "66": {
        "前导": [
            4
        ]
    },
    "67": {
        "前导": [
            4,
            5,
            108
        ]
    },
    "68": {
        "前导": [
            4,
            5,
            109
        ]
    },
    "69": {
        "前导": [
            4
        ]
    },
    "70": {
        "前导": [
            4
        ]
    },
    "71": {
        "前导": [
            5
        ]
    },
    "72": {
        "前导": [
            5,
            117
        ]
    },
    "73": {
        "前导": [
            5
        ],
        "包含": [
            77,
            78,
            79,
            80
        ]
    },
    "74": {
        "前导": [
            5
        ]
    },
    "75": {
        "前导": [
            5
        ],
        "包含": [
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93
        ]
    },
    "76": {
        "前导": [
            5,
            99
        ],
        "包含": [
            30,
            28,
            94,
            95,
            96,
            4
        ]
    },
    "77": {
        "前导": [
            73
        ]
    },
    "78": {
        "前导": [
            73
        ]
    },
    "79": {
        "前导": [
            73
        ]
    },
    "80": {
        "前导": [
            73
        ]
    },
    "81": {
        "前导": [
            75
        ]
    },
    "82": {
        "前导": [
            75,
            118
        ]
    },
    "83": {
        "前导": [
            75
        ]
    },
    "84": {
        "前导": [
            75,
            118
        ],
        "包含": [
            13
        ]
    },
    "85": {
        "前导": [
            75,
            118
        ],
        "包含": [
            13
        ]
    },
    "86": {
        "前导": [
            75,
            118
        ],
        "包含": [
            13
        ]
    },
    "87": {
        "前导": [
            75,
            99
        ],
        "包含": [
            143,
            144
        ]
    },
    "88": {
        "前导": [
            75,
            118,
            106
        ],
        "包含": [
            62
        ]
    },
    "89": {
        "前导": [
            75,
            118
        ],
        "包含": [
            147,
            148
        ]
    },
    "90": {
        "前导": [
            75,
            118
        ],
        "包含": [
            147
        ]
    },
    "91": {
        "前导": [
            75
        ]
    },
    "92": {
        "前导": [
            75
        ]
    },
    "93": {
        "前导": [
            75
        ]
    },
    "94": {
        "前导": [
            76
        ]
    },
    "95": {
        "前导": [
            76
        ]
    },
    "96": {
        "前导": [
            76
        ]
    },
    "97": {
        "前导": [
            6
        ],
        "包含": [
            135
        ]
    },
    "98": {
        "前导": [
            6
        ],
        "包含": [
            136
        ]
    },
    "99": {
        "前导": [
            6
        ],
        "包含": [
            100,
            101,
            102,
            76,
            87
        ]
    },
    "100": {
        "前导": [
            99
        ]
    },
    "101": {
        "前导": [
            99
        ]
    },
    "102": {
        "前导": [
            99
        ]
    },
    "103": {
        "前导": [
            7
        ],
        "包含": [
            108,
            109
        ]
    },
    "104": {
        "前导": [
            7
        ]
    },
    "105": {
        "前导": [
            7
        ],
        "包含": [
            110,
            111,
            112,
            113,
            137
        ]
    },
    "106": {
        "前导": [
            7
        ],
        "包含": [
            114,
            115,
            88
        ]
    },
    "107": {
        "前导": [
            7
        ]
    },
    "108": {
        "前导": [
            103
        ],
        "包含": [
            67,
            142,
            129
        ]
    },
    "109": {
        "前导": [
            103
        ],
        "包含": [
            68,
            142,
            129
        ]
    },
    "110": {
        "前导": [
            105
        ],
        "包含": [
            142,
            144
        ]
    },
    "111": {
        "前导": [
            105
        ],
        "包含": [
            142
        ]
    },
    "112": {
        "前导": [
            105
        ],
        "包含": [
            142
        ]
    },
    "113": {
        "前导": [
            105
        ]
    },
    "114": {
        "前导": [
            106
        ],
        "包含": [
            143
        ]
    },
    "115": {
        "前导": [
            106
        ],
        "包含": [
            144
        ]
    },
    "116": {
        "前导": [
            8
        ]
    },
    "117": {
        "前导": [
            8
        ],
        "包含": [
            119,
            120,
            72
        ]
    },
    "118": {
        "前导": [
            8
        ],
        "包含": [
            82,
            84,
            85,
            86,
            89,
            90,
            88,
            121,
            122,
            123,
            124
        ]
    },
    "119": {
        "前导": [
            117
        ]
    },
    "120": {
        "前导": [
            117
        ]
    },
    "121": {
        "前导": [
            118
        ]
    },
    "122": {
        "前导": [
            118
        ]
    },
    "123": {
        "前导": [
            118
        ]
    },
    "124": {
        "前导": [
            118
        ]
    },
    "125": {
        "前导": [
            9
        ]
    },
    "126": {
        "前导": [
            9
        ],
        "包含": [
            129
        ]
    },
    "127": {
        "前导": [
            9
        ],
        "包含": [
            130,
            131,
            132,
            133,
            134
        ]
    },
    "128": {
        "前导": [
            9
        ]
    },
    "129": {
        "前导": [
            126,
            108,
            109
        ],
        "包含": [
            7
        ]
    },
    "130": {
        "前导": [
            127
        ]
    },
    "131": {
        "前导": [
            127
        ]
    },
    "132": {
        "前导": [
            127
        ]
    },
    "133": {
        "前导": [
            127
        ]
    },
    "134": {
        "前导": [
            127
        ]
    },
    "135": {
        "前导": [
            97
        ]
    },
    "136": {
        "前导": [
            98
        ]
    },
    "137": {
        "前导": [
            105
        ]
    },
    "138": {
        "前导": [
            53
        ],
        "包含": [
            148
        ]
    },
    "139": {
        "前导": [
            62,
            13,
            26,
            61
        ]
    },
    "140": {
        "前导": [
            62,
            26,
            61
        ]
    },
    "141": {
        "前导": [
            62,
            61,
            58,
            59,
            60
        ]
    },
    "142": {
        "前导": [
            108,
            109,
            150,
            110,
            111,
            112
        ]
    },
    "143": {
        "前导": [
            114,
            87
        ]
    },
    "144": {
        "前导": [
            115,
            87,
            110
        ]
    },
    "145": {
        "前导": [
            146,
            147,
            151,
            152
        ]
    },
    "146": {
        "包含": [
            145
        ],
        "前导": [
            153,
            41,
            5
        ]
    },
    "147": {
        "包含": [
            145
        ],
        "前导": [
            89,
            90,
            42,
            148,
            149,
            8
        ]
    },
    "148": {
        "包含": [
            147
        ],
        "前导": [
            138,
            89,
            8
        ]
    },
    "149": {
        "包含": [
            147
        ],
        "前导": [
            42,
            8
        ]
    },
    "150": {
        "包含": [
            142
        ]
    },
    "151": {
        "包含": [
            145
        ]
    },
    "152": {
        "包含": [
            145
        ]
    },
    "153": {
        "包含": [
            146
        ]
    }
}

export const graphNameList = {
    1: { name: "信号与系统", type: "知识点" },
    2: { name: "基本概念", type: "知识点" },
    3: { name: "线性系统时域分析", type: "知识点" },
    4: { name: "周期信号傅里叶级数", type: "知识点" },
    5: { name: "傅里叶变换", type: "知识点" },
    6: { name: "抽样", type: "知识点" },
    7: { name: "线性系统频域分析", type: "知识点" },
    8: { name: "拉普拉斯变换", type: "知识点" },
    9: { name: "线性系统复频域分析", type: "知识点" },
    10: { name: "信号", type: "知识点" },
    11: { name: "系统", type: "知识点" },
    12: { name: "信号分类", type: "知识点" },
    13: { name: "信号基本运算", type: "知识点" },
    14: { name: "基本信号", type: "知识点" },
    15: { name: "信号分解", type: "知识点" },
    16: { name: "连续性分类", type: "知识点" },
    17: { name: "周期性分类", type: "知识点" },
    18: { name: "虚实分类", type: "知识点" },
    19: { name: "能量功率分类", type: "知识点" },
    20: { name: "确定性分类", type: "知识点" },
    21: { name: "加法", type: "知识点" },
    22: { name: "乘法", type: "知识点" },
    23: { name: "反转", type: "知识点" },
    24: { name: "平移", type: "知识点" },
    25: { name: "尺度变换", type: "知识点" },
    26: { name: "阶跃信号", type: "知识点" },
    27: { name: "冲激信号", type: "知识点" },
    28: { name: "三角信号", type: "知识点" },
    29: { name: "实指数信号", type: "知识点" },
    30: { name: "复指数信号", type: "知识点" },
    31: { name: "直流交流分解", type: "知识点" },
    32: { name: "偶奇分解", type: "知识点" },
    33: { name: "实虚分解", type: "知识点" },
    34: { name: "正交分解", type: "知识点" },
    35: { name: "脉冲分解", type: "知识点" },
    36: { name: "系统表示", type: "知识点" },
    37: { name: "系统特性", type: "知识点" },
    38: { name: "数学模型（微分方程）", type: "知识点" },
    39: { name: "框图", type: "知识点" },
    40: { name: "时域系统函数", type: "知识点" },
    41: { name: "频域域系统函数", type: "知识点" },
    42: { name: "复频域系统函数", type: "知识点" },
    43: { name: "信号流图", type: "知识点" },
    44: { name: "线性", type: "知识点" },
    45: { name: "时不变性", type: "知识点" },
    46: { name: "因果性", type: "知识点" },
    47: { name: "稳定性", type: "知识点" },
    48: { name: "记忆性", type: "知识点" },
    49: { name: "可逆性", type: "知识点" },
    50: { name: "零输入响应", type: "知识点" },
    51: { name: "零状态响应", type: "知识点" },
    52: { name: "强迫响应", type: "知识点" },
    53: { name: "自由响应", type: "知识点" },
    54: { name: "全响应", type: "知识点" },
    55: { name: "冲激响应", type: "知识点" },
    56: { name: "阶跃响应", type: "知识点" },
    57: { name: "卷积代数性质", type: "知识点" },
    58: { name: "卷积计算性质", type: "知识点" },
    59: { name: "与冲激信号及其各阶导数卷积", type: "知识点" },
    60: { name: "与阶跃信号卷积", type: "知识点" },
    61: { name: "卷积计算公式", type: "知识点" },
    62: { name: "卷积计算方法", type: "知识点" },
    63: { name: "周期信号分解", type: "知识点" },
    64: { name: "频谱离散性", type: "知识点" },
    65: { name: "频谱谐波性", type: "知识点" },
    66: { name: "频谱收敛性", type: "知识点" },
    67: { name: "幅度频谱", type: "知识点" },
    68: { name: "相位频谱", type: "知识点" },
    69: { name: "周期信号对称性与级数关系", type: "知识点" },
    70: { name: "周期矩形脉冲频谱", type: "知识点" },
    71: { name: "频谱密度函数", type: "知识点" },
    72: { name: "傅里叶变换存在条件", type: "知识点" },
    73: { name: "常用傅里叶变换", type: "知识点" },
    74: { name: "频率分量分析", type: "分析方法" },
    75: { name: "傅里叶变换性质", type: "知识点" },
    76: { name: "周期信号傅里叶变换", type: "知识点" },
    77: { name: "直流信号傅里叶变换", type: "知识点" },
    78: { name: "单边指数信号傅里叶变换", type: "知识点" },
    79: { name: "矩形信号傅里叶变换", type: "知识点" },
    80: { name: "符号函数傅里叶变换", type: "知识点" },
    81: { name: "奇偶虚实性", type: "知识点" },
    82: { name: "线性", type: "知识点" },
    83: { name: "对偶性", type: "知识点" },
    84: { name: "尺度变换", type: "知识点" },
    85: { name: "时移特性", type: "知识点" },
    86: { name: "频移特性", type: "知识点" },
    87: { name: "相乘定理", type: "知识点" },
    88: { name: "卷积定理", type: "知识点" },
    89: { name: "时域微分", type: "知识点" },
    90: { name: "时域积分", type: "知识点" },
    91: { name: "频域微分", type: "知识点" },
    92: { name: "频域积分", type: "知识点" },
    93: { name: "帕斯瓦尔定理", type: "知识点" },
    94: { name: "冲激串信号", type: "知识点" },
    95: { name: "周期脉冲信号", type: "知识点" },
    96: { name: "冲激信号组成频谱", type: "知识点" },
    97: { name: "理想抽样", type: "知识点" },
    98: { name: "矩形脉冲抽样", type: "知识点" },
    99: { name: "抽样定理", type: "知识点" },
    100: { name: "奈奎斯特抽样频率", type: "知识点" },
    101: { name: "奈奎斯特抽样间隔", type: "知识点" },
    102: { name: "被抽样信号频率受限", type: "知识点" },
    103: { name: "频域系统函数", type: "知识点" },
    104: { name: "无失真系统", type: "知识点" },
    105: { name: "滤波器", type: "知识点" },
    106: { name: "通信系统", type: "知识点" },
    107: { name: "电路系统频域分析", type: "分析方法" },
    108: { name: "幅频特性", type: "知识点" },
    109: { name: "相频特性", type: "知识点" },
    110: { name: "低通滤波器", type: "知识点" },
    111: { name: "高通滤波器", type: "知识点" },
    112: { name: "带通滤波器", type: "知识点" },
    113: { name: "带阻滤波器", type: "知识点" },
    114: { name: "调制", type: "知识点" },
    115: { name: "解调", type: "知识点" },
    116: { name: "单边变换", type: "知识点" },
    117: { name: "收敛域", type: "知识点" },
    118: { name: "拉普拉斯变换性质", type: "知识点" },
    119: { name: "左边信号", type: "知识点" },
    120: { name: "右边信号", type: "知识点" },
    121: { name: "s域微分", type: "知识点" },
    122: { name: "s域积分", type: "知识点" },
    123: { name: "初值定理", type: "知识点" },
    124: { name: "终值定理", type: "知识点" },
    125: { name: "电路复频域域分析", type: "分析方法" },
    126: { name: "零极点矢量", type: "知识点" },
    127: { name: "零极点", type: "知识点" },
    128: { name: "零状态响应求解方法", type: "分析方法" },
    129: { name: "频谱分析", type: "分析方法" },
    130: { name: "极点与自由响应关系", type: "知识点" },
    131: { name: "极点与系统稳定性关系", type: "知识点" },
    132: { name: "极点与系统特征频率关系", type: "知识点" },
    133: { name: "全通系统零极点分布", type: "知识点" },
    134: { name: "最小相移系统零极点分布", type: "知识点" },
    135: { name: "冲激串信号傅里叶变换", type: "知识点" },
    136: { name: "周期脉冲信号傅里叶变换", type: "知识点" },
    137: { name: "电路系统", type: "知识点" },
    138: { name: "系统特征频率", type: "知识点" },
    139: { name: "卷积图解法", type: "分析方法" },
    140: { name: "卷积解析法", type: "分析方法" },
    141: { name: "卷积性质法", type: "分析方法" },
    142: { name: "滤波器设计方法", type: "分析方法" },
    143: { name: "调制方法", type: "分析方法" },
    144: { name: "解调方法", type: "分析方法" },
    145: { name: "电路系统分析方法", type: "分析方法" },
    146: { name: "电路系统频域分析", type: "分析方法" },
    147: { name: "电路系统复频域分析", type: "分析方法" },
    148: { name: "零输入响应求解方法", type: "分析方法" },
    149: { name: "零状态响应求解方法", type: "分析方法" },
    150: { name: "通频带", type: "知识点" },
    151: { name: "RC电路", type: "知识点" },
    152: { name: "RL电路", type: "知识点" },
    153: { name: "相量分析法", type: "分析方法" }
};

export const echatNode = {
    "data": [
        {
            "id": "1",
            "name": "信号与系统",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "2",
            "name": "基本概念",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "10",
            "name": "信号",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "12",
            "name": "信号分类",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "16",
            "name": "连续性分类",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "17",
            "name": "周期性分类",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "18",
            "name": "虚实分类",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "19",
            "name": "能量功率分类",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "20",
            "name": "确定性分类",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "13",
            "name": "信号基本运算",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "21",
            "name": "加法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "22",
            "name": "乘法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "23",
            "name": "反转",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "24",
            "name": "平移",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "25",
            "name": "尺度变换",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "139",
            "name": "卷积图解法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "14",
            "name": "基本信号",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "26",
            "name": "阶跃信号",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "140",
            "name": "卷积解析法",
            "color": "#4895EF",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "27",
            "name": "冲激信号",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "28",
            "name": "三角信号",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "29",
            "name": "实指数信号",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "30",
            "name": "复指数信号",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "15",
            "name": "信号分解",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "31",
            "name": "直流交流分解",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "32",
            "name": "偶奇分解",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "33",
            "name": "实虚分解",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "34",
            "name": "正交分解",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "35",
            "name": "脉冲分解",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "11",
            "name": "系统",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "36",
            "name": "系统表示",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "38",
            "name": "数学模型（微分方程）",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "39",
            "name": "框图",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "40",
            "name": "时域系统函数",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "41",
            "name": "频域域系统函数",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "146",
            "name": "电路系统频域分析",
            "color": "#4895EF",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "145",
            "name": "电路系统分析方法",
            "color": "#56CFE1",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "42",
            "name": "复频域系统函数",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "147",
            "name": "电路系统复频域分析",
            "color": "#4895EF",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "149",
            "name": "零状态响应求解方法",
            "color": "#4895EF",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "43",
            "name": "信号流图",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "37",
            "name": "系统特性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "44",
            "name": "线性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "45",
            "name": "时不变性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "46",
            "name": "因果性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "47",
            "name": "稳定性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "48",
            "name": "记忆性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "49",
            "name": "可逆性",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "3",
            "name": "线性系统时域分析",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "50",
            "name": "零输入响应",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "51",
            "name": "零状态响应",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "55",
            "name": "冲激响应",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "56",
            "name": "阶跃响应",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "57",
            "name": "卷积代数性质",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "58",
            "name": "卷积计算性质",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "141",
            "name": "卷积性质法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "59",
            "name": "与冲激信号及其各阶导数卷积",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "60",
            "name": "与阶跃信号卷积",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "61",
            "name": "卷积计算公式",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "62",
            "name": "卷积计算方法",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "52",
            "name": "强迫响应",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "53",
            "name": "自由响应",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "138",
            "name": "系统特征频率",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "148",
            "name": "零输入响应求解方法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "54",
            "name": "全响应",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "4",
            "name": "周期信号傅里叶级数",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "63",
            "name": "周期信号分解",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "64",
            "name": "频谱离散性",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "65",
            "name": "频谱谐波性",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "66",
            "name": "频谱收敛性",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "67",
            "name": "幅度频谱",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "68",
            "name": "相位频谱",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "69",
            "name": "周期信号对称性与级数关系",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "70",
            "name": "周期矩形脉冲频谱",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "5",
            "name": "傅里叶变换",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "71",
            "name": "频谱密度函数",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "72",
            "name": "傅里叶变换存在条件",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "73",
            "name": "常用傅里叶变换",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "77",
            "name": "直流信号傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "78",
            "name": "单边指数信号傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "79",
            "name": "矩形信号傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "80",
            "name": "符号函数傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "74",
            "name": "频率分量分析",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "75",
            "name": "傅里叶变换性质",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "81",
            "name": "奇偶虚实性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "82",
            "name": "线性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "83",
            "name": "对偶性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "84",
            "name": "尺度变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "85",
            "name": "时移特性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "86",
            "name": "频移特性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "87",
            "name": "相乘定理",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "143",
            "name": "调制方法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "144",
            "name": "解调方法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "88",
            "name": "卷积定理",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "89",
            "name": "时域微分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "90",
            "name": "时域积分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "91",
            "name": "频域微分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "92",
            "name": "频域积分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "93",
            "name": "帕斯瓦尔定理",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "76",
            "name": "周期信号傅里叶变换",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "94",
            "name": "冲激串信号",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "95",
            "name": "周期脉冲信号",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "96",
            "name": "冲激信号组成频谱",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "6",
            "name": "抽样",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "97",
            "name": "理想抽样",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "135",
            "name": "冲激串信号傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "98",
            "name": "矩形脉冲抽样",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "136",
            "name": "周期脉冲信号傅里叶变换",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "99",
            "name": "抽样定理",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "100",
            "name": "奈奎斯特抽样频率",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "101",
            "name": "奈奎斯特抽样间隔",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "102",
            "name": "被抽样信号频率受限",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "7",
            "name": "线性系统频域分析",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "103",
            "name": "频域系统函数",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "108",
            "name": "幅频特性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "142",
            "name": "滤波器设计方法",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "129",
            "name": "频谱分析",
            "color": "#4361EE",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "109",
            "name": "相频特性",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "104",
            "name": "无失真系统",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "105",
            "name": "滤波器",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "110",
            "name": "低通滤波器",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "111",
            "name": "高通滤波器",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "112",
            "name": "带通滤波器",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "113",
            "name": "带阻滤波器",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "137",
            "name": "电路系统",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "106",
            "name": "通信系统",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "114",
            "name": "调制",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "115",
            "name": "解调",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "107",
            "name": "电路系统频域分析",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "8",
            "name": "拉普拉斯变换",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "116",
            "name": "单边变换",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "117",
            "name": "收敛域",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "119",
            "name": "左边信号",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "120",
            "name": "右边信号",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "118",
            "name": "拉普拉斯变换性质",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "121",
            "name": "s域微分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "122",
            "name": "s域积分",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "123",
            "name": "初值定理",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "124",
            "name": "终值定理",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "9",
            "name": "线性系统复频域分析",
            "color": "#0096C7",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "125",
            "name": "电路复频域域分析",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "126",
            "name": "零极点矢量",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "127",
            "name": "零极点",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "130",
            "name": "极点与自由响应关系",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "131",
            "name": "极点与系统稳定性关系",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "132",
            "name": "极点与系统特征频率关系",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "133",
            "name": "全通系统零极点分布",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "134",
            "name": "最小相移系统零极点分布",
            "color": "#03045E",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "128",
            "name": "零状态响应求解方法",
            "color": "#023EBA",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "2",
            "name": "基本概念",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "3",
            "name": "线性系统时域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "4",
            "name": "周期信号傅里叶级数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "5",
            "name": "傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "6",
            "name": "抽样",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "7",
            "name": "线性系统频域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "8",
            "name": "拉普拉斯变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "9",
            "name": "线性系统复频域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "10",
            "name": "信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "11",
            "name": "系统",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "12",
            "name": "信号分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "13",
            "name": "信号基本运算",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "14",
            "name": "基本信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "15",
            "name": "信号分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "16",
            "name": "连续性分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "17",
            "name": "周期性分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "18",
            "name": "虚实分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "19",
            "name": "能量功率分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "20",
            "name": "确定性分类",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "21",
            "name": "加法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "22",
            "name": "乘法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "23",
            "name": "反转",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "24",
            "name": "平移",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "25",
            "name": "尺度变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "26",
            "name": "阶跃信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "27",
            "name": "冲激信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "28",
            "name": "三角信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "29",
            "name": "实指数信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "30",
            "name": "复指数信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "31",
            "name": "直流交流分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "32",
            "name": "偶奇分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "33",
            "name": "实虚分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "34",
            "name": "正交分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "35",
            "name": "脉冲分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "36",
            "name": "系统表示",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "37",
            "name": "系统特性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "38",
            "name": "数学模型（微分方程）",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "39",
            "name": "框图",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "40",
            "name": "时域系统函数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "41",
            "name": "频域域系统函数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "42",
            "name": "复频域系统函数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "43",
            "name": "信号流图",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "44",
            "name": "线性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "45",
            "name": "时不变性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "46",
            "name": "因果性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "47",
            "name": "稳定性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "48",
            "name": "记忆性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "49",
            "name": "可逆性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "50",
            "name": "零输入响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "51",
            "name": "零状态响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "52",
            "name": "强迫响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "53",
            "name": "自由响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "54",
            "name": "全响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "55",
            "name": "冲激响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "56",
            "name": "阶跃响应",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "57",
            "name": "卷积代数性质",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "58",
            "name": "卷积计算性质",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "59",
            "name": "与冲激信号及其各阶导数卷积",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "60",
            "name": "与阶跃信号卷积",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "61",
            "name": "卷积计算公式",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "62",
            "name": "卷积计算方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "63",
            "name": "周期信号分解",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "64",
            "name": "频谱离散性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "65",
            "name": "频谱谐波性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "66",
            "name": "频谱收敛性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "67",
            "name": "幅度频谱",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "68",
            "name": "相位频谱",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "69",
            "name": "周期信号对称性与级数关系",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "70",
            "name": "周期矩形脉冲频谱",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "71",
            "name": "频谱密度函数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "72",
            "name": "傅里叶变换存在条件",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "73",
            "name": "常用傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "74",
            "name": "频率分量分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "75",
            "name": "傅里叶变换性质",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "76",
            "name": "周期信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "77",
            "name": "直流信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "78",
            "name": "单边指数信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "79",
            "name": "矩形信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "80",
            "name": "符号函数傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "81",
            "name": "奇偶虚实性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "82",
            "name": "线性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "83",
            "name": "对偶性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "84",
            "name": "尺度变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "85",
            "name": "时移特性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "86",
            "name": "频移特性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "87",
            "name": "相乘定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "88",
            "name": "卷积定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "89",
            "name": "时域微分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "90",
            "name": "时域积分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "91",
            "name": "频域微分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "92",
            "name": "频域积分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "93",
            "name": "帕斯瓦尔定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "94",
            "name": "冲激串信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "95",
            "name": "周期脉冲信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "96",
            "name": "冲激信号组成频谱",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "97",
            "name": "理想抽样",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "98",
            "name": "矩形脉冲抽样",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "99",
            "name": "抽样定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "100",
            "name": "奈奎斯特抽样频率",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "101",
            "name": "奈奎斯特抽样间隔",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "102",
            "name": "被抽样信号频率受限",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "103",
            "name": "频域系统函数",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "104",
            "name": "无失真系统",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "105",
            "name": "滤波器",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "106",
            "name": "通信系统",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "107",
            "name": "电路系统频域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "108",
            "name": "幅频特性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "109",
            "name": "相频特性",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "110",
            "name": "低通滤波器",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "111",
            "name": "高通滤波器",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "112",
            "name": "带通滤波器",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "113",
            "name": "带阻滤波器",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "114",
            "name": "调制",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "115",
            "name": "解调",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "116",
            "name": "单边变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "117",
            "name": "收敛域",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "118",
            "name": "拉普拉斯变换性质",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "119",
            "name": "左边信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "120",
            "name": "右边信号",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "121",
            "name": "s域微分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "122",
            "name": "s域积分",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "123",
            "name": "初值定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "124",
            "name": "终值定理",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "125",
            "name": "电路复频域域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "126",
            "name": "零极点矢量",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "127",
            "name": "零极点",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "128",
            "name": "零状态响应求解方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "129",
            "name": "频谱分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "130",
            "name": "极点与自由响应关系",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "131",
            "name": "极点与系统稳定性关系",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "132",
            "name": "极点与系统特征频率关系",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "133",
            "name": "全通系统零极点分布",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "134",
            "name": "最小相移系统零极点分布",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "135",
            "name": "冲激串信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "136",
            "name": "周期脉冲信号傅里叶变换",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "137",
            "name": "电路系统",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "138",
            "name": "系统特征频率",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "139",
            "name": "卷积图解法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "140",
            "name": "卷积解析法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "141",
            "name": "卷积性质法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "142",
            "name": "滤波器设计方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "143",
            "name": "调制方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "144",
            "name": "解调方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "145",
            "name": "电路系统分析方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "146",
            "name": "电路系统频域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "147",
            "name": "电路系统复频域分析",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "148",
            "name": "零输入响应求解方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "149",
            "name": "零状态响应求解方法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "150",
            "name": "通频带",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "151",
            "name": "RC电路",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "152",
            "name": "RL电路",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        },
        {
            "id": "153",
            "name": "相量分析法",
            "color": "#00B4D8",
            "symbolSize": 20,
            "draggable": true
        }
    ]
}
