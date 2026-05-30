import React, { useState, useEffect } from 'react'
import axios from "axios"

const API = "https://recipe-notes-app.onrender.com"

const App = () => {

  const [notes, setNotes] = useState([])

  // Fetch Notes
  function fetchNotes() {

    axios.get(`${API}/post`)
      .then((res) => {

        setNotes(res.data.notes)

      })
      .catch((err) => {

        console.log(err)

      })
  }

  useEffect(() => {

    fetchNotes()

  }, [])


  // Create Note
  function handleSubmit(e) {

    e.preventDefault()

    const { title, discription } = e.target.elements

    axios.post(`${API}/post`, {

      title: title.value,
      discription: discription.value

    })

      .then((res) => {

        console.log(res.data)

        fetchNotes()

        e.target.reset()

      })

      .catch((err) => {

        console.log(err)

      })
  }


  // Delete Note
  function handleDelete(noteId) {

    axios.delete(`${API}/post/${noteId}`)

      .then((res) => {

        console.log(res.data)

        fetchNotes()

      })

      .catch((err) => {

        console.log(err)

      })
  }


  // Update Note
  function handleUpdate(noteId) {

    const updatedTitle = prompt("Enter new title")

    const updatedDiscription = prompt("Enter new description")

    axios.put(`${API}/post/${noteId}`, {

      title: updatedTitle,
      discription: updatedDiscription

    })

      .then((res) => {

        console.log(res.data)

        fetchNotes()

      })

      .catch((err) => {

        console.log(err)

      })
  }


  return (

    <>
    
      <div className='app'>
      <h1 className='.h1'>🍲 Recipe Notes App</h1>
<p className='.p'>Save Your Favorite Recipes Anytime, Anywhere ✨</p>

        <form className='note-create-form' onSubmit={handleSubmit}>

          <input
            type="text"
            name='title'
            placeholder='Enter Title'
            required
          />

          <input
            type="text"
            name='discription'
            placeholder='Enter Description'
            required
          />

          <button>Create Note</button>

        </form>

      </div>


      <div className="notes">

        {

          notes.map((note) => {

            return (

              <div className="note" key={note._id}>

                <h1>{note.title}</h1>

               <p className='description'>
  {note.discription}
</p>

                <button onClick={() => handleUpdate(note._id)}>
                  Update
                </button>

                <button onClick={() => handleDelete(note._id)}>
                  Delete
                </button>

              </div>

            )

          })

        }

      </div>

    </>

  )
}

export default App