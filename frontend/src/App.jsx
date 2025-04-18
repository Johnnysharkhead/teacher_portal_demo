import React from 'react';
import QuestionManager from './Components/QuestionManager';
import QuizManager from './Components/QuizManager';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>测试管理系统</h1>
      <QuestionManager />
      <QuizManager />
    </div>
  );
}

export default App;
