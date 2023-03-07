import { useState } from 'react'
import Dropzone from 'react-dropzone'

import './register.scss'

export default function Register() {
    const [fileName, setFileName] = useState( '' )
    const [showSocietyInput, setShowSocietyInput] = useState( false )

    const handleDrop = ( acceptedFiles ) => {
        setFileName( acceptedFiles[0].name )
    }

    const handleCheckboxChange = ( event ) => {
        setShowSocietyInput( event.target.checked )
    }

    return (
        <section className="register">
            <div className="register__container">
                <h1 className="register__title">Inscription</h1>
                <form className="form">
                    <div className="form__role">
                        <label htmlFor="role">Êtes-vous un artisan ?</label>
                        <input type="checkbox" name="role" id="role" onChange={handleCheckboxChange}/>
                    </div>
                    {showSocietyInput && (
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="society"></label>
                                <input type="text" name="society" id="society" placeholder="Votre société"/>
                            </div>
                        </div>
                    )}
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="firstname"></label>
                            <input type="text" name="firstname" id="firstname" placeholder="Votre prénom"/>
                        </div>
                        <div className="form__content">
                            <label htmlFor="lastname"></label>
                            <input type="text" name="lastname" id="lastname" placeholder="Votre nom"/>
                        </div>
                    </div>
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="email"></label>
                            <input type="email" name="email" id="email" placeholder="Votre adresse email"/>
                        </div>
                        <div className="form__content">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password" placeholder="Votre mot de passe"/>
                        </div>
                    </div>
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="postCode"></label>
                            <input type="text" name="postCode" id="postCode" placeholder="Votre code postal"/>
                        </div>
                        <div className="form__content"></div>
                    </div>
                    <div className="form__content">
                        <Dropzone onDrop={handleDrop}>
                            {( { getRootProps, getInputProps } ) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {fileName ? (
                                        <p>{fileName}</p>
                                    ) : (
                                        <p><span>Faites glisser ou </span>sélectionnez une photo <span>de profil</span> </p>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div className="form__content">
                        <button type="submit">S'inscrire</button>
                    </div>
                </form>
            </div>
        </section>
    )
}