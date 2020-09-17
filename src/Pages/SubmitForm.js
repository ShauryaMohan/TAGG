import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form'
import './SubmitForm.css'


function SubmitForm({user, setPage}) {
    const [formData, setFormData] = useState(null);

    const {handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        setFormData(data)
        alert("User Created Succesfully")
        setPage("home")
        console.log(user)
    }


    return <div className="Page">
        <div className="wrapper">
            <div className="imageWrapper"><img src={formData?.file} alt={"Memory"}/></div>
            <div className="formWrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                autoComplete="off"
                placeholder="Enter some hint"
                control={control}
                rules={{ required: true }}/>

                <Controller
                as={<textarea className="memoryField"/>}
                name="memory"
                autoComplete="off"
                placeholder="Enter memory related to the photo you have uploaded"
                control={control}
                rules={{ required: true }}/>

                <Controller
                as={<input id="file" className="file" />}
                name="file"
                type="file"
                autoComplete="off"
                control={control}
                rules={{ required: true }}/>
                <center>
                <label htmlFor="file">Choose a photo</label>
                </center>
                
                <center>
                <button type="submit" className="submitButton"> Submit </button>
                </center>
            </form>
            </div>
        </div>

    </div>
}

export default SubmitForm;