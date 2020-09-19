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
            <p>These are some hints in the purple boxes that are related to one person. Click on the box to answer the question and see who actually wrote it...</p>
            <button onClick={()=> {setPage("home")}} className="rounded-button"> Home </button>
        </div>
        <div className = "Questions"><QuestionsCardList/></div>
    </div>
}

export default Play;