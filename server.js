const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoUrl = require('./config/env').mongoUrl;

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 获取路由
const chatRoutes = require('./routes/chat/chat');
const loginRoutes = require('./routes/login/login');
const userRoutes = require('./routes/user/user')
const classDataRoutes = require('./routes/classData/classData')
const practice = require('./routes/practice/practice')

// 路由
app.use('/api/chat', chatRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user', userRoutes);
app.use('/api/classData', classDataRoutes);
app.use('/api/practice', practice);

app.get('/', (req, res) => {
  res.send('连接成功')
})

// 数据库连接
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
