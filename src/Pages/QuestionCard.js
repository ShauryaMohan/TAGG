import React from 'react'
import './QuestionCard.css'

function QuestionCard({data, setPage, setQuestionData}){
    const viewQuestion = () => {
        setQuestionData(data)
        setPage("question")
    }
    return <div className="card" onClick={() => viewQuestion()}>
        <p className="card-content">{data[0]["hint"]}</p>
    </div>
}

export default QuestionCard;