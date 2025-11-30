const path = require('path')
const XLSX = require('xlsx')
const fs = require('fs')

// 处理excel文件
const handleExcel = () => {
    const namePath = path.join(__dirname, '学生选课名单.xlsx')
    // 处理 Excel 文件
    const nameWorkBook = XLSX.readFile(namePath);

    // 获取姓名工作表的表头
    const nameSheetName = nameWorkBook.SheetNames[0];

    // 获取姓名工作表
    const nameWorkSheet = nameWorkBook.Sheets[nameSheetName];

    // 将工作表转换为 JSON（每一行是一个对象）
    const nameJsonData = XLSX.utils.sheet_to_json(nameWorkSheet);

    return {
        nameJsonData,
    }
}

const data = handleExcel()
fs.writeFileSync(path.join(__dirname, 'loginWhiteList.json'), JSON.stringify(data.nameJsonData, null, 2))
