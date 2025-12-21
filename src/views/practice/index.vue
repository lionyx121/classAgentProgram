<script setup lang="ts">
import md from '@/common/js/useMd';
import { ref, onMounted, watch } from 'vue'
import { usePracticeStore } from '@/stores/practice'
import { submitAnswer } from '@/api/practice'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRouter } from 'vue-router';

onMounted(() => {
    practiceStore.initQuestionShow()
})

const router = useRouter();

// 当前滑入的选项
const optionSlider = ref<string | null>(null)

// 正确的选项
const optionRight = ref<string | null>(null)

// 错误的选项（用户选择的）
const optionWrong = ref<string | null>(null)

const practiceStore = usePracticeStore()
const userStore = useUserInfoStore()

// 鼠标滑入选项中
const optionEnter = (key: string) => {
    if (optionWrong.value) return
    optionSlider.value = key
}

// 鼠标滑出
const optionLeave = () => {
    optionSlider.value = null
}

// 点击选项
const optionClick = async (optionItem: any, optionKey: string) => {
    if (optionWrong.value) return

    const current = practiceStore.questionShow[practiceStore.currentQuestionIndex]
    // 更新用户选择
    practiceStore.updateUserSelect(optionKey)

    // 正确答案 key（如 "A", "B"...）
    const right = current.answer

    optionRight.value = right
    optionWrong.value = optionKey

    const res = await submitAnswer({
        username: userStore.userInfo.username,
        questionKey: current.key,
        DifficultyLevel: current.DifficultyLevel,
        similarity: current.similarity,
        seletcOption: optionWrong.value,
        selectResult: optionWrong.value === right ? 'right' : 'wrong',
    })
}

// 清空当前状态
const clearOption = () => {
    optionSlider.value = null
    optionRight.value = null
    optionWrong.value = null
}

// 切换题目
const changeQuestion = (isNext = true) => {
    const len = practiceStore.questionShow.length
    let index = practiceStore.currentQuestionIndex

    if (isNext) {
        index = Math.min(index + 1, len - 1)
    } else {
        // 如果当前index是0直接return 点击上一题
        if (index === 0) return
        index = Math.max(index - 1, 0)
    }

    practiceStore.currentQuestionIndex = index
    clearOption()
}

// 记录用户选择
watch(() => practiceStore.currentQuestionIndex, (newIndex, oldIndex) => {
    // 当用户的题目发生变化的时候 
    const current = practiceStore.questionShow[practiceStore.currentQuestionIndex]
    if (current.userSelect) {
        optionWrong.value = current.userSelect
        optionRight.value = current.answer
    }
})

</script>


<template>
    <div class="layout" v-if="practiceStore.questionShow.length > 0">
        <!-- 题目部分 -->
        <div class="questionBox">
            <!-- 标题部分 -->
            <div v-html="md.render(`(${practiceStore.currentQuestionIndex + 1})、${practiceStore.questionShow[practiceStore.currentQuestionIndex].title}`)"
                class="questionBox-title"></div>
            <!-- 标题的图片部分 -->
            <!-- <div class="option-img">
                <img src="./temp/data.png">
            </div> -->

            <!-- 选项部分 -->
            <div class="questionBox-options"
                v-for="(optionItem, optionKey) in (({ _id, ...rest }) => rest)(practiceStore.questionShow[practiceStore.currentQuestionIndex].options)"
                :class="{ isSlider: optionKey === optionSlider, selectRight: optionKey === optionRight, selectWrong: optionKey === optionWrong }"
                @mouseenter="optionEnter(optionKey)" @mouseleave="optionLeave"
                @click="optionClick(optionItem, optionKey)">
                <div class="item-box">
                    <!-- 左侧圆圈 -->
                    <div class="option-number">
                        {{ optionKey }}
                    </div>
                    <!-- 右侧内容 -->
                    <div class="option-container" v-html="md.render(optionItem)"></div>
                    <!-- 内容可能是图片 -->
                    <!-- <img src="./temp/optionA.png" class="item-img"> -->

                    <!-- 是否正确 -->
                    <el-icon v-if="optionKey === optionRight">
                        <Check />
                    </el-icon>
                    <el-icon v-if="optionWrong && optionKey !== optionRight">
                        <Close />
                    </el-icon>
                </div>
            </div>

            <!-- 下一题 -->
            <div class="btn-box">
                <div class="next-question" @click="changeQuestion(false)">上一题</div>
                <div class="next-question" @click="changeQuestion(true)">下一题</div>
                <div class="next-question">收藏该题</div>
            </div>

            <!-- 解析部分 -->
            <div v-html="md.render(`解析：${practiceStore.questionShow[practiceStore.currentQuestionIndex].analysis}`)"
                class="questionBox-analysis" v-if="optionWrong">
            </div>

            <!-- 相关知识点 -->
            <div class="knowledgeBox" v-if="optionWrong">
                <div>相关知识点：</div>
                <el-tag v-for="item in practiceStore.knowledgeList" :key="item.key" :type="item.type"
                    class="knowledgeBox-tag" @click="router.push({ path: '/echartsGraph', query: { id: item.key } })">
                    {{ item.label }}
                </el-tag>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;

    .questionBox {
        width: 80%;
        position: absolute;
        top: 5%;
        left: 15%;

        .option-img {
            display: flex;
            width: 100%;
            height: 100px;
            align-items: center;

            img {
                object-fit: scale-down;
                filter: invert(1); // 图片反色
                transform: scale(0.5);
            }
        }

        &-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        &-options {
            width: 100%;
            border-radius: 10px;

            .item-box {
                padding: 10px 12px;
                width: 65%;
                display: flex;
                align-items: center;
                gap: 20px;
                border-radius: 10px;

                .option-number {
                    width: 25px;
                    height: 25px;
                    border-radius: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #4E5158;
                }

                .item-img {
                    max-width: 70px;
                    max-height: 70px;
                    object-fit: contain; // 保留比例但不超框
                    filter: invert(1); // 保持你的反色风格
                }

            }
        }

        .isSlider {
            background-color: #303030;

            .item-box {
                .option-number {
                    background-color: #32CA99;
                }
            }
        }

        .selectWrong {
            background-color: #382727;

            .item-box {
                .option-number {
                    background-color: #FF4D4F;
                }
            }
        }

        .selectRight {
            background-color: #273834;

            .item-box {
                .option-number {
                    background-color: #32CA99;
                }
            }
        }

        .btn-box {
            margin-top: 10px;
            width: 60%;
            height: 37px;
            display: flex;
            align-items: center;
            gap: 20px;

            .next-question {
                width: 90px;
                height: 37px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #32CA7D;
                font-size: 14px;
                border-radius: 10px;
                border: 1px solid #32CA99;
            }

            .next-question:hover {
                background-color: #32CA99;
                color: #fff;
            }
        }

        .knowledgeBox {
            margin-top: 20px;
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .knowledgeBox-tag {
                cursor: pointer;
            }
        }

        .questionBox-analysis {
            margin-top: 20px;
            background-color: rgba(24, 24, 24, 0.5);
            padding: 30px 20px;
            border-radius: 10px;
            line-height: 1.5em;
        }
    }
}
</style>
