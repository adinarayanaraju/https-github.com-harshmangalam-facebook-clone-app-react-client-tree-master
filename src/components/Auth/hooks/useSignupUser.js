import { useState, useContext } from 'react'
import { UserContext, UIContext } from '../../../App'
import { useHistory } from 'react-router-dom'
import { signupUser } from '../../../services/AuthService'

const useSignupUser = () => {
  const { uiDispatch } = useContext(UIContext)
  const { userDispatch } = useContext(UserContext)

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialState, setInitialState] = useState({
    name: '',
    email: '',
    password: '',
  })
  const handleNameChange = (e) => {
    setError({ ...error, name: '' })
    setInitialState({ ...initialState, name: e.target.value })
  }

  const handleEmailChange = (e) => {
    setError({ ...error, email: '' })
    setInitialState({ ...initialState, email: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setInitialState({ ...initialState, password: e.target.value })
    setError({ ...error, password: '' })
  }

  async function handleSignupUser(e) {
    e.preventDefault()

    const { data, error } = await signupUser(initialState, loading, setLoading)

    if (error) {
      setError(error)
    }

    if (data) {
      userDispatch({ type: 'SET_CURRENT_USER', payload: data })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: {
          color: 'success',
          display: true,
          text: 'Signup successful',
        },
      })
      history.push('/home')
    }
  }

  return {
    loading,
    error,
    handleSignupUser,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
  }
}

export default useSignupUser
