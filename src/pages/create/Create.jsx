import { useState } from 'react'
import Dropzone from 'react-dropzone'
import Header from '../../navigations/header/Header'

import './create.scss'

export default function Create() {
    const [fileName, setFileName] = useState('')
    const [description, setDescription] = useState('')
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user).id
    const handleDrop = (acceptedFiles) => {
        setFileName(acceptedFiles[0].name)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('description', description)
        formData.append('picture', event.target.picture.files[0])

        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Failed to create post: ${response.status}`)
            }

            const newPost = await response.json()
            console.log('New post:', newPost)

            // TODO: Redirect to the post details page
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Header />
            <section className="create">
                <div className="create__container">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form__content">
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} name="picture" />
                                        {fileName ? (
                                            <p>{fileName}</p>
                                        ) : (
                                            <p>
                                                <span>Faites glisser ou </span>
                                                sélectionnez une image
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        <div className="form__content">
              <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
              />
                        </div>
                        <div className="form__content">
                            <button type="submit">Publier</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
