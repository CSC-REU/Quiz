import logo from './logo.svg';
import './App.css';

import React,{useState, useReducer} from 'react';

import QuizCell from "./components/quiz/quizView";
import {gradeReducer} from "./components/quiz/quizView";

function App() {

  const [gradeState, gradeDispatch] = useReducer(gradeReducer, 
  {
        quizResults: [1].map( (_) => false ),
        selections: [1].map( (_) => new Set() )
  });

  const [feedbackOn, setFeedbackOn] = useState(false);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />



        <QuizCell data={
          [{"title":"What git object contains the original text/binary of a file?","type":"mc","options":[{"text":"commit","answer":false},{"text":"tree","answer":false},{"text":"diff","answer":false},{"text":"blob","answer":true}]}]
        } 
                questionNumber={0}
                gradeState={ gradeState }
                dispatch={ gradeDispatch }
                feedbackOn={feedbackOn}                    
        />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
