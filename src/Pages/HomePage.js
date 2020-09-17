import React from 'react';
import './HomePage.css';
import {signInWithGoogle, auth} from '../firebase/firebase.utils'

function HomePage({setPage, user}) {
    const handleSigning = () => {
        if (user) {
            auth.signOut();
        } else {
            signInWithGoogle();
        }
    }

    return <div className="HomePageContainer">
        <div className="header"><p onClick={handleSigning}>{user ? "Sign Out" : "Sign In"}</p></div>
        <div className="TitleContainer">
            <p>THE AARUSHI GUPTA GAME</p>
        </div>
        <div className="ButtonContainer">
            <button className="rounded-button" onClick={() => {if (user) {setPage("submit")} else {signInWithGoogle()}}}>Submit An Entry</button>
            <button className="rounded-button" onClick={()=> {if (user) {setPage("game")} else {signInWithGoogle()}}}>Play!</button>
        </div>
    </div>
}

export default HomePage;