import React, {useState, useEffect} from 'react'
import './login.scss'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [emailValidated, setEmailValidated] = useState(false)
    const [showSignupButton, setShowSignupButton] = useState(false)

    useEffect(() => {
        const checkEmail = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/check-email', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email}),
                })
                const data = await response.json()
                setPasswordRequired(data.passwordRequired)
                setEmailValidated(true)
                setShowSignupButton(!data.passwordRequired)
            } catch (error) {
                setEmailValidated(false)
                setShowSignupButton(false)
                console.error(error)
            }
        }

        if (email.includes('@')) {
            checkEmail()
        }
    }, [email])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            })
            await response.json()
            // handle successful login
        } catch (error) {
            setError(error.response.data.msg)
        }

        setLoading(false)
    }

    return (
        <section className="login section">
            <div className="login__container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__content">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Votre adresse email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    {passwordRequired ? (
                        <>
                            <div className="form__content">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form__content">
                                <button type="submit" disabled={loading}>
                                    Connexion
                                </button>
                            </div>
                        </>
                    ) : (
                        emailValidated &&
                        showSignupButton && (
                            <div className="form__content">
                                <button type="button">S'inscrire</button>
                            </div>
                        )
                    )}
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </section>
    )
}
