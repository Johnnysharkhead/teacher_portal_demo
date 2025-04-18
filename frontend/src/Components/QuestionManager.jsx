import React, { useState } from 'react';
import axios from 'axios'; //一个 HTTP 客户端库，用于向后端发送请求

function QuestionManager() {
  // 定义了一个状态变量 question，用于存储当前输入的题目信息。
  // setQuestion 是更新 question 状态的函数。
  // useState 是 React 的一个 Hook，用于在函数组件中添加状态
  const [question, setQuestion] = useState({
    subject: '',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  // 事件处理函数--当用户在输入框中输入内容时，更新 question 对应字段的值。
  const handleInputChange = (e) => { // e: 事件对象，包含输入框的值和名称。
    const { name, value } = e.target; // 解构赋值，获取输入框的名称和当前值
    setQuestion({ ...question, [name]: value }); //使用 setQuestion 更新 question 的状态，保持其他字段不变，仅更新当前输入框对应的字段。
  };

  // 事件处理函数--当用户在选项输入框中输入内容时，调用该函数更新对应的选项值。
  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  // 向后端发送POST请求，添加题目
  const addQuestion = async () => { //箭头函数它没有自己的 this，会继承外部作用域的 this，适合在 React 中使用
    // async/await 语法用于处理异步操作：函数内部可以使用 await 暂停代码执行，等待异步操作完成。
    try {
      /*
      response:
      如果请求成功，response 是后端返回的响应对象，通常包含以下内容：
      response.data: 后端返回的实际数据。
      response.status: HTTP 状态码（如 200 表示成功）。
      */
      const response = await axios.post('http://localhost:3000/api/v1/questions', question); //请求体为 question 对象，包含题目信息
      alert('题目添加成功: ' + JSON.stringify(response.data)); // 序列化response.data，即将javascript对象转换为JSON字符串（否则无法在弹窗中正确显示）
    } 
    catch (error) {
      alert('添加失败: ' + error.message);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>问题管理模块</h2>
      <input
        type="text"
        name="subject"
        placeholder="学科 (如: math)"
        value={question.subject}
        onChange={handleInputChange}
      />
      <br />
      <textarea
        name="content"
        placeholder="题目内容"
        value={question.content}
        onChange={handleInputChange}
      />
      <br />
      {question.options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`选项 ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <br />
      <input
        type="text"
        name="correctAnswer"
        placeholder="正确答案"
        value={question.correctAnswer}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={addQuestion}>添加题目</button>
    </div>
  );
}

export default QuestionManager;