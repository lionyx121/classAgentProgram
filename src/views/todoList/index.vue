<template>
    <div class="layout">
        <!-- 顶部 -->
        <div class="top">
            <div class="box">
                <div>ToDoList</div>
                <input type="text" placeholder="添加ToDo">
            </div>
        </div>
        <div class="mid">
            <!-- 正在进行 -->
            <div>正在进行</div>
            <!-- 正在进行BOX -->
            <div class="listBox">
                <div class="item-left">
                    <input type="checkBox">
                    <div>学会了todoList</div>
                </div>
                <button></button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: 500px;
    background-color: #CDCDCD;

    .top {
        height: 100px;
        background-color: #323232;

        .box {
            width: 80%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                font-size: 28px;
                color: #fff;
            }

            input {
                min-width: 300px;
            }
        }
    }

    .mid {
        width: 80%;
        margin: 0 auto;

        .listBox {
            background-color: #fff;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .item-left {
                padding-left: 10px;
                display: flex;
                align-items: center;
                gap: 20px;
            }

            button {
                width: 60px;
                height: 60px;
                border-radius: 60px;
            }
        }
    }

}
</style>