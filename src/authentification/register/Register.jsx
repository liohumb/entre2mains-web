import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Dropzone from 'react-dropzone'

import './register.scss'

export default function Register() {
    const [fileName, setFileName] = useState('')
    const [showSocietyInput, setShowSocietyInput] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [postCode, setPostCode] = useState('')
    const [society, setSociety] = useState('')
    const [role, setRole] = useState('USER')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const {token} = useParams()

    useEffect(() => {
        async function verifyToken() {
            try {
                const response = await fetch(`http://localhost:8080/new-users/${token}`)
                const data = await response.json()

                if (data === false) {
                    navigate('/connexion')
                    return null
                }

                setEmail(data.email)
                setNewUserEmail(data.email)
            } catch (error) {
                console.error(error)
            }
        }

        verifyToken()
    }, [navigate, token])

    const handleDrop = (acceptedFiles) => {
        setFileName(acceptedFiles[0].name)
    }

    const handleCheckboxChange = (event) => {
        setShowSocietyInput(event.target.checked)
        setRole(event.target.checked ? 'ARTISAN' : 'USER')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const nameRegex = /^[a-zA-Z\s]+$/
        const passwordRegex = /^[^[\]{}<>]*$/
        const postCodeRegex = /^\d{5}$/
        const societyRegex = /^[a-zA-Z0-9\s]*$/

        if (!firstname || !lastname) {
            setError('Merci de renseigner votre nom')
            return
        } else if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
            setError('Votre nom doit contenir uniquement des lettres')
            return
        }

        if (email !== newUserEmail) {
            setError("Vous ne pouvez pas changer l'adresse email")
        }

        if (!password) {
            setError('Merci de renseigner un mot de passe')
            return
        } else if (!password.match(passwordRegex)) {
            setError('Votre mot de passe ne doit pas contenir les caractères < > [ ] { }')
            return
        }

        if (postCode && !postCode.match(postCodeRegex)) {
            setError('Votre code postal doit contenir 5 chiffres')
            return
        }

        if (society && !society.match(societyRegex)) {
            setError('Votre société doit contenir uniquement des lettres et des chiffres')
            return
        }

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role,
                    firstname,
                    lastname,
                    email,
                    password,
                    picturePath: fileName,
                    bannerPath: '',
                    artisan: '',
                    society,
                    postCode,
                }),
            })

            await response.json()
            navigate('/connexion', {state: {email}})
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <section className="register">
            <div className="register__container">
                <h1 className="register__title">Inscription</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__role">
                        <label htmlFor="role">Êtes-vous un artisan ?</label>
                        <input type="checkbox" name="role" id="role" onChange={handleCheckboxChange}/>
                    </div>
                    {showSocietyInput && (
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="society"></label>
                                <input type="text" name="society" id="society"
                                       placeholder="Votre société"
                                       onChange={(event) => setSociety(event.target.value)}/>
                            </div>
                        </div>
                    )}
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="firstname"></label>
                            <input type="text" name="firstname" id="firstname"
                                   placeholder="Votre prénom"
                                   onChange={(event) => setFirstname(event.target.value)}/>
                        </div>
                        <div className="form__content">
                            <label htmlFor="lastname"></label>
                            <input type="text" name="lastname" id="lastname"
                                   placeholder="Votre nom"
                                   onChange={(event) => setLastname(event.target.value)}/>
                        </div>
                    </div>
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="email"></label>
                            <input type="email" name="email" id="email"
                                defaultValue={email} readOnly/>
                        </div>
                        <div className="form__content">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password"
                                   placeholder="Votre mot de passe"
                                   onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                    </div>
                    <div className="form__contents">
                        <div className="form__content">
                            <label htmlFor="postCode"></label>
                            <input type="text" name="postCode" id="postCode"
                                   placeholder="Votre code postal"
                                   onChange={(event) => setPostCode(event.target.value)}/>
                        </div>
                        <div className="form__content"></div>
                    </div>
                    <div className="form__content">
                        <Dropzone onDrop={handleDrop}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {fileName ? (
                                        <p>{fileName}</p>
                                    ) : (
                                        <p>
                                            <span>Faites glisser ou </span>
                                            sélectionnez une photo <span>de profil</span></p>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div className="form__content">
                        <button type="submit">S'inscrire</button>
                    </div>
                    {error && <p className="form__error">{error}</p>}
                </form>
            </div>
        </section>
    )
}