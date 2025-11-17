const test = `{
            "title": "下列信号的分类方法不正确的是（ ）：",
            "options": {
                "A": "数字信号和离散信号",
                "B": "确定信号和随机信号",
                "C": "周期信号和非周期信号",
                "D": "因果信号与反因果信号"
            },
            "images": {
                "title": "",
                "A": "",
                "B": "",
                "C": "",
                "D": ""
            },
            "answer": "A",
            "analysis": "数字信号是离散信号的一种特殊形式，二者是包含与被包含关系，不能并列作为分类方式；B、C、D 中的分类均为独立合理的分类方式，因此 A 错误。",
            "DifficultyLevel": 0.48236,
            "key": "practice_1731088700123_x91b7m"
        }`

console.log(JSON.parse(test))