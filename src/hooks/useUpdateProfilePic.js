import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext, UIContext } from '../App'
const url = 'http://localhost:3001'

const useUpdateProfilePic = ({ profile_pic, cover_pic, history }) => {
  const [loading, setLoading] = useState(false)

  const { userState, userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)

  const updateProfilePic = () => {
    saveProfilePic('https://picsum.photos/200')
  }

  const updateCoverPic = () => {
    saveCoverImage('https://picsum.photos/800/300')
  }

  const saveProfilePic = async (profile_url) => {
    setLoading(true)
    try {
      const userId = parseInt(localStorage.getItem('userId'))
      const response = await axios.patch(`${url}/users/${userId}`, {
        profile_pic: profile_url,
      })
      if (response.data) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            text: 'Profile picture updated successfully',
            color: 'success',
            display: true,
          },
        })
        userDispatch({ type: 'UPDATE_USER', payload: response.data })
      }
      setLoading(false)
      history.push('/home')
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const saveCoverImage = async (cover_url) => {
    setLoading(true)
    try {
      const userId = parseInt(localStorage.getItem('userId'))
      const response = await axios.patch(`${url}/users/${userId}`, {
        cover_pic: cover_url,
      })
      if (response.data) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            text: 'Cover picture updated successfully',
            color: 'success',
            display: true,
          },
        })
        userDispatch({ type: 'UPDATE_USER', payload: response.data })
      }
      setLoading(false)
      history.push('/home')
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return {
    updateProfilePic,
    updateCoverPic,

    loading,
  }
}

export default useUpdateProfilePic
