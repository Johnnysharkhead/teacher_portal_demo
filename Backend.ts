
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

import express, { Application } from 'express';
const app: Application = express(); // 创建一个Express实例

app.use(bodyParser.json()); // app.use(bodyParser.json()) 是一个中间件，用于解析 JSON 格式的请求体数据，并将其附加到 req.body 上，方便后续路由处理程序使用。
/* 
app.use:
Express 提供的一个方法，用于注册中间件。
中间件是一个函数，它可以对请求对象（req）、响应对象（res）进行处理，或者决定是否将请求传递给下一个中间件。

bodyParser.json():
body-parser 是一个 Express 中间件，用于解析请求体。
json() 方法专门解析 Content-Type 为 application/json 的请求体。
解析完成后，JSON 数据会被转换为 JavaScript 对象，并存储在 req.body 中。
*/
app.use(cors());

// 内存数据库模拟（仅用于模拟）
const questions: any[] = []; // 存储题目
const quizzes: any[] = []; // 存储试卷
const results: any[] = []; // 存储测试结果

// 问题管理模块（demo仅演示添加问题和删除问题）
app.post('/api/v1/questions', (req, res) => { // req是请求对象，res是响应对象
    const { subject, content, options, correctAnswer, questionId } = req.body; // 从请求体中获取数据（解构请求体）
    const question = { id: uuidv4(), subject, content, options, correctAnswer, questionId };
    /*{
        "subject": "math",
        "content": "What is 2 + 2?",
        "options": ["1", "2", "3", "4"],
        "correctAnswer": "4",
        "questionId": 001
    }*/

    questions.push(question); // 将题目添加到内存数据库
    res.json({ code: 200, data: question, message: 'Question Added Succeed' }); // 返回成功响应，200表示成功
});

app.delete('/api/v1/questions/:id', (req, res) => {
});

app.put('/api/v1/questions/:id', (req, res) => {
});

app.get('/api/v1/questions/count', (req, res) => {
});

// 测试管理模块
app.post('/api/v1/quizzes/generate', (req, res) => {
    const { title, examSubject, questionCount, difficultyLevel } = req.body;
    /*{
    "title": "Math Quiz",
    "subject": "math",
    "questionCount": 3,
    "difficultyLevel": "medium"
    }*/

    // 简单随机抽题
    // q: 表示 questions 数组中的每个题目对象 || q.subject: 表示每个题目的学科 
    const filtered = questions.filter(q => q.subject.includes(examSubject)); // filter方法用于创建一个新数组，以回调函数测试每个元素，返回的数组包含满足要求的所有元素。
    const selected = filtered.slice(0, questionCount);
    // 生成测试
    const quiz = { id: uuidv4(), title, questions: selected, difficultyLevel };
    quizzes.push(quiz);
    res.json({ code: 200, data: quiz, message: '测验生成成功' });
});

app.put('/api/v1/quizzes/:quizId/questions/:questionId', (req, res) => {
});

// 测验设置模块
app.put('/api/v1/quizzes/:quizId/settings', (req, res) => {
});

// 结果管理模块
app.get('/api/v1/quizzes/:quizId/results', (req, res) => {
    const quizResults = results.filter(r => r.quizId === req.params.quizId);
    res.json({ code: 200, data: quizResults, message: '查询成功' });
});

app.post('/api/v1/quizzes/:quizId/publish', (req, res) => {
    const { publishType, visibleDate } = req.body;
    results
        .filter(r => r.quizId === req.params.quizId)
        .forEach(r => {
            r.published = true;
            r.publishType = publishType;
            r.visibleDate = visibleDate;
        });
    res.json({ code: 200, message: '成绩已发布' });
});

// 启动服务
app.listen(3000, () => {
    console.log('Teacher portal backend running on http://localhost:3000');
});
