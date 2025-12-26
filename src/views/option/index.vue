<script setup lang="ts">
import { ref } from 'vue'
import { uploadsPracticeData } from '@/api/practice'
import { ElMessage } from 'element-plus'

interface optionPicData {
    titleImg: string,
    optionAImg: string,
    optionBImg: string,
    optionCImg: string,
    optionDImg: string,
}

// json数据
const questionJsonData = ref('')

// 图片数据
const optionPicData = ref<optionPicData>({
    titleImg: '',
    optionAImg: '',
    optionBImg: '',
    optionCImg: '',
    optionDImg: '',
})

const fileData = new FormData()

const dialogVisible = ref(false)

const handleFileChange = (e: Event, type: keyof optionPicData) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    const maxSize = 50 * 1024 // 50KB
    if (file.size > maxSize) {
        dialogVisible.value = !dialogVisible.value
        return
    }

    fileData.append(type, file)
    optionPicData.value[type] = URL.createObjectURL(file)
}

const deleteImg = (type: keyof optionPicData) => {
    fileData.delete(type)
    optionPicData.value[type] = ''
}

// 上传formdata数据
const uploadPracticeData = async () => {
    let text = questionJsonData.value.trim()

    // 自动补上 [ ]，把对象列表变成合法 JSON 数组
    if (!text.startsWith("[")) {
        text = "[" + text + "]"
    }

    let jsonArr
    try {
        jsonArr = JSON.parse(text)
    } catch (err) {
        ElMessage.error("输入的题库数据不是合法 JSON 格式")
        return
    }

    // 替换 FormData 中的 jsonData
    fileData.delete("jsonData")
    fileData.append("jsonData", JSON.stringify(jsonArr))

    const res = await uploadsPracticeData(fileData)
}


</script>

<template>
    <el-form ref="ruleFormRef" style="min-width: 1000px" label-width="auto" class="layout">
        <!-- 题目的json数据 -->
        <el-form-item label="JSON数据:">
            <el-input v-model="questionJsonData" autosize type="textarea" placeholder="Please input"
                class="layout-jsonItem" />
        </el-form-item>

        <!-- 题目的图片 -->
        <el-form-item label="标题图片:">
            <div class="img-item">
                <input type="file" @change="handleFileChange($event, 'titleImg')" />
                <img :src="optionPicData.titleImg" alt="Preview" v-if="optionPicData.titleImg" />
                <el-icon class="icon" v-else>
                    <Plus />
                </el-icon>
                <el-button type="danger" plain class="delete-btn" @click="deleteImg('titleImg')">删除图片</el-button>
            </div>
        </el-form-item>

        <!-- 选项A的图片 -->
        <el-form-item label="选项A的图片:">
            <div class="img-item">
                <input type="file" @change="handleFileChange($event, 'optionAImg')" />
                <img :src="optionPicData.optionAImg" alt="Preview" v-if="optionPicData.optionAImg" />
                <el-icon class="icon" v-else>
                    <Plus />
                </el-icon>
                <el-button type="danger" plain class="delete-btn" @click="deleteImg('optionAImg')">删除图片</el-button>
            </div>
        </el-form-item>

        <!-- 选项B的图片 -->
        <el-form-item label="选项B的图片:">
            <div class="img-item">
                <input type="file" @change="handleFileChange($event, 'optionBImg')" />
                <img :src="optionPicData.optionBImg" alt="Preview" v-if="optionPicData.optionBImg" />
                <el-icon class="icon" v-else>
                    <Plus />
                </el-icon>
                <el-button type="danger" plain class="delete-btn" @click="deleteImg('optionBImg')">删除图片</el-button>
            </div>
        </el-form-item>

        <!-- 选项C的图片 -->
        <el-form-item label="选项C的图片:">
            <div class="img-item">
                <input type="file" @change="handleFileChange($event, 'optionCImg')" />
                <img :src="optionPicData.optionCImg" alt="Preview" v-if="optionPicData.optionCImg" />
                <el-icon class="icon" v-else>
                    <Plus />
                </el-icon>
                <el-button type="danger" plain class="delete-btn" @click="deleteImg('optionCImg')">删除图片</el-button>
            </div>
        </el-form-item>

        <!-- 选项D的图片 -->
        <el-form-item label="选项D的图片:">
            <div class="img-item">
                <input type="file" @change="handleFileChange($event, 'optionDImg')" />
                <img :src="optionPicData.optionDImg" alt="Preview" v-if="optionPicData.optionDImg" />
                <el-icon class="icon" v-else>
                    <Plus />
                </el-icon>
                <el-button type="danger" plain class="delete-btn">删除图片</el-button>
            </div>
        </el-form-item>

        <!-- 上传按钮 -->
        <el-button type="primary" round @click="uploadPracticeData" class="upload-btn">上传数据</el-button>

    </el-form>

    <!-- 提示dialog -->
    <el-dialog v-model="dialogVisible" title="上传图片不符合要求" width="500">
        <div>图片大小不能超过50kb</div>
        <a href="https://photo.haoconvert.com/?msclkid=ad5bef10a5c414d107a987e6cb4bb53c" target="_blank">请按照说明先去压缩图片</a>
        <div><a href="https://www.remove.bg/zh/upload" target="_blank">再消除背景</a></div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.layout {
    min-height: 600px;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
    padding: 20px;
    border-radius: 10px;

    .layout-jsonItem {
        max-height: 300px;
        overflow: scroll;
        scrollbar-width: none;
        border: 1px solid #ccc;
    }

    .img-item {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        input {
            width: 100px;
            height: 100px;
            opacity: 0;
            z-index: 999;
        }

        .icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        img {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            object-fit: scale-down;
        }

        .delete-btn {
            position: absolute;
            left: 150px;
        }
    }

    .upload-btn {
        position: absolute;
        right: 20px;
        bottom: 20px
    }
}
</style>
