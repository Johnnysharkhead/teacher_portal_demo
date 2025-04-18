import React, { useState } from 'react';
import axios from 'axios';

function QuizManager() {
  const [quiz, setQuiz] = useState({
    title: '',
    examSubject: '',
    questionCount: 0,
    difficultyLevel: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const generateQuiz = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/quizzes/generate', quiz);
      alert('测验生成成功: ' + JSON.stringify(response.data));
    } catch (error) {
      alert('生成失败: ' + error.message);
    }
  };

  return (
    <div>
      <h2>测试管理模块</h2>
      <input
        type="text"
        name="title"
        placeholder="测验标题"
        value={quiz.title}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="examSubject"
        placeholder="学科 (如: math)"
        value={quiz.examSubject}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="number"
        name="questionCount"
        placeholder="题目数量"
        value={quiz.questionCount}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="difficultyLevel"
        placeholder="难度 (如: easy, medium, hard)"
        value={quiz.difficultyLevel}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={generateQuiz}>生成测验</button>
    </div>
  );
}

export default QuizManager;