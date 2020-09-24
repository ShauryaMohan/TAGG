import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form'
import {storeQuestion, storeImage, QuestionList} from '../firebase/firebase.utils'
import './SubmitForm.css'


function SubmitForm({user, setPage, setQuestions}) {
    const [imageValue, setImageValue] = useState(null);
    const [displayImage, setDisplayImage] = useState('#');

    const {handleSubmit, control } = useForm();

    const uploadFile = (event) => {
        setImageValue(event.target.files[0])
        storeImage(user, event.target.files[0], setDisplayImage);
        }

    const onSubmit = (data) => {
        if(imageValue) {
            storeQuestion(user, data);
            alert("Question submitted succesfully")
            var temp = QuestionList();
            setQuestions(temp);
            setPage("home")
        } else {
            alert("Please Select an Image")
        }
    }

    const onError = (error) => {
        alert(error);
    }

    


    return <div className="Page">
        <div className="wrapper">
            <div className="imageWrapper"><img src={displayImage} alt={"Memory"} height="200px" width="240px"/></div>
            <div className="formWrapper">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller
                as={<input className="inputField"/>}
                name="user_name"
                type="text"
                defaultValue={user.displayName}
                autoComplete="off"
                control={control}
                rules={{ required: true }}/>

                <Controller
                as={<input className="inputField" />}
                name="hint"
                type="text"
                defaultValue=""
                autoComplete="off"
                placeholder="Enter some hint"
                control={control}
                rules={{ required: true }}/>

                <Controller
                as={<textarea className="memoryField"/>}
                name="memory"
                autoComplete="off"
                placeholder="Enter a message for her birthday"
                control={control}
                rules={{ required: true }}/>

                <input type="file" id="file" name="file" className="file" onChange={(e) => {uploadFile(e)}} required={true} accept="image/*"/>
                <center>
                <label htmlFor="file">Choose a photo</label>
                </center>
                
                <center>
                <button type="submit" className="submitButton"> Submit </button>
                <button className="submitButton" onClick={()=>{setPage("home")}}>Back</button> 
                </center>
            </form>
            </div>
        </div>

    </div>
}

export default SubmitForm;