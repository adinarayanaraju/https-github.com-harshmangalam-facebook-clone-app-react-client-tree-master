import { useContext, useState } from 'react'
import axios from 'axios'
import { UIContext, PostContext } from '../../../App'
import { useHistory } from 'react-router-dom'
const url = 'http://localhost:3001'

const useCreatePost = ({
  postData,
  body,
  isImageCaptured,
  postImage,
  blob,
}) => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const { uiDispatch } = useContext(UIContext)
  const { postDispatch } = useContext(PostContext)

  const createPost = async (data) => {
    setLoading(true)
    const userId = parseInt(localStorage.getItem('userId'))
    try {
      const response = await axios.post(`${url}/posts`, { ...data, userId })

      setLoading(false)
      postDispatch({ type: 'ADD_POST', payload: response.data })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: {
          color: 'success',
          display: true,
          text: 'Post created successfully',
        },
      })
      uiDispatch({ type: 'SET_POST_MODEL', payload: false })
      history.push('/')
    } catch (err) {
      setLoading(false)
      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            display: true,
            text: err.response.data.error,
            color: 'error',
          },
        })
      }
      console.log(err)
    }
  }

  const createUserPost = async (uri = '') => {
    await createPost({
      ...postData,
      image: uri ? uri : '',
      body: {
        ...body,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      profilePostData: {},
    })
  }

  const handleSubmitPost = (e) => {
    e.preventDefault()

    if (isImageCaptured || postImage) {
      createUserPost('https://picsum.photos/500/300')
    } else {
      createUserPost()
    }
  }
  return {
    handleSubmitPost,
    loading,
  }
}

export default useCreatePost
