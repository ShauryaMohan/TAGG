import React from 'react'
import QuestionCard from './QuestionCard'
import './Play.css'




function Play({setPage, questions, setQuestionData}) {

    

      const QuestionsCardList = () => {
          console.log(questions);
          var questionList = questions.map((val, id) => {
              return <QuestionCard key={id} data={val} setPage={setPage} setQuestionData={setQuestionData}/>
          })
          return <div><h2>The hints start here:</h2>{questionList}</div>
      }

    return <div className="PlayPage">
        <div className = "Instructions">
            <h1>Instructions:</h1>
            <p>Hints are given in the yellow boxes. These hints have been written by someone you know, and, it connects them to you in some way. Please tap on the box which you would like to answer (guess who wrote the hint). No scores are being kept, and once you answer, there is a surprise!!</p>
            <button onClick={()=> {setPage("home")}} className="rounded-button"> Home </button>
        </div>
        <div className = "Questions"><QuestionsCardList/></div>
    </div>
}

export default Play;