import React, {useEffect, useState} from 'react';
import HomePage from './Pages/HomePage'
import SubmitForm from './Pages/SubmitForm';
import Play from './Pages/Play';
import { auth, StoreUser, QuestionList} from './firebase/firebase.utils'
import './App.css';
import QuestionPage from './Pages/QuestionPage';

function App() {
  const[user, setUser] = useState(null);
  const[page, setPage] = useState("home");
  const[questionData, setQuestionData] = useState(null);
  const[questions, setQuestions] = useState(null)
  useEffect(() => {
    var temp = QuestionList();
    setQuestions(temp);
  },[])

  

  const route = () => {
    switch(page){
      case "home": return <HomePage setPage={setPage} user={user}/>
      case "submit": return <SubmitForm setPage={setPage} user={user} setQuestions={setQuestions}/>
      case "game":  return <Play setPage={setPage} questions={questions} setQuestionData={setQuestionData}/>
      case "question": return <QuestionPage setPage={setPage} questionData={questionData} wholeData={questions}/>
      default: return <div>error</div>
    }
  }

  
  useEffect( () => {var unsuscribe = null;
                    unsuscribe = auth.onAuthStateChanged(user => {setUser(user); StoreUser(user);})
                    
                    return function cleanup(){
                      unsuscribe();
                    }; } )

  return (<div>
    { route()
    }
    </div>
  );
}

export default App;
