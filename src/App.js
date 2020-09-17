import React, {useEffect, useState} from 'react';
import HomePage from './Pages/HomePage'
import SubmitForm from './Pages/SubmitForm';
import { auth} from './firebase/firebase.utils'
import './App.css';

function App() {
  const[user, setUser] = useState(null)
  const[page, setPage] = useState("home")



  const route = () => {
    switch(page){
      case "home": return <HomePage setPage={setPage} user={user}/>
      case "submit": return <SubmitForm setPage={setPage} user={user}/>
      case "game":  return <div>Play</div>
      default: return <div>error</div>
    }
  }

  
  useEffect( () => {var unsuscribe = null;
                    unsuscribe = auth.onAuthStateChanged(user => setUser(user))
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
