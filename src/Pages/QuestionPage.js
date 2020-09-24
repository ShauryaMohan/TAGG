import React, {useState} from  'react'
import {useForm, Controller} from 'react-hook-form'
import Select from 'react-select'
import {storage} from '../firebase/firebase.utils'
import './QuestionPage.css'



function QuestionPage({setPage, questionData, wholeData}){
    const {control, handleSubmit } = useForm();
    const [answer, setAnswer] = useState(null);
    const [image, setImage] = useState(null)
    const [isCorrect, setIsCorrect] = useState(false);

    function getImage(){
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`${questionData[1]}`)
        imageRef.getDownloadURL().then((url) => {
            setImage(url);
          })
    }


    const getOptions = () => {
        if (wholeData) {
            console.log(wholeData)
          return wholeData.map((val) => {
            return { value: val[1], label: val[0]["user_name"] };
          });
        }
      };

      const answered = (formData) => {
        console.log(formData["answer"])
        getImage();
        const bool = (formData["answer"]["value"] === questionData[1]);
        console.log(bool)
        setIsCorrect(bool);
        setAnswer(formData["answer"]["value"])
      }

      const Answer = () => {
          return <div className="AnswerContainer">
              <div className="Result"><h2>{isCorrect ? "Correct" : "Wrong!!"}</h2></div>
              <div className="QuestionDetails"><p>{`Submitted by:  ${questionData[0]["user_name"]} (${questionData[1]})`}</p></div>
              <div className="AnswerImage"><img src={image} alt="Memory"  width="240px"/></div>
              <div className="AnswerMemory"><h2>Message:</h2>{questionData[0]["memory"]}</div>
          </div>
      }

    return <div className="QuestionPage">
        <div className="questionPart">
            <h2>So who do you think wrote this:</h2>
            <p>{questionData[0]["hint"]}</p>
            <form onSubmit={handleSubmit(answered)}>
            <Controller
              as={
                <Select
                  options={getOptions()}
                  isMulti={false}
                  className="select"
                />
              }
              type="select"
              name="answer"
              rules={{required: true}}
              control={control}
            />
            <button type="submit" className="rounded-button" disabled={answer}>Submit</button>
            </form>
        </div>
        <div className="answerPart">
            {answer ? <Answer/> : <div></div>}
            <button className="rounded-button" onClick={() => {setPage("game")}}>back</button>
        </div>
        
    </div>
}

export default QuestionPage;