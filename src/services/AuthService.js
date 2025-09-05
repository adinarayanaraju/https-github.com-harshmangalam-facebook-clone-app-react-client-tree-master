import axios from 'axios'
const url = 'http://localhost:3001'

export const fetchCurrentUser = async () => {
  let userId = localStorage.getItem('userId')

  if (!userId) {
    return {
      error: 'Not logged in',
    }
  }

  try {
    const { data } = await axios.get(`${url}/users/${userId}`)
    if (data) {
      return {
        data,
      }
    }
  } catch (err) {
    if (err && err.response) {
      return {
        error: err.response.data.error,
      }
    }
  }
}

export const loginUser = async (userData, loading, setLoading) => {
  try {
    setLoading(true)
    const { data } = await axios.get(`${url}/users?email=${userData.email}`)
    setLoading(false)
    if (data && data.length > 0) {
      localStorage.setItem('userId', data[0].id)
      return {
        data: data[0],
      }
    } else {
      return {
        error: 'User not found',
      }
    }
  } catch (err) {
    setLoading(false)
    if (err && err.response) {
      return {
        error: err.response.data.error,
      }
    }
  }
}

export const LogoutUser = async () => {
  localStorage.removeItem('userId')
  return {
    data: 'success',
  }
}

export const signupUser = async (userData, loading, setLoading) => {
  try {
    setLoading(true)
    const { data } = await axios.post(`${url}/users`, {
      ...userData,
      profile_pic: 'https://picsum.photos/200',
      cover_pic: 'https://picsum.photos/800/300',
      active: true,
    })
    setLoading(false)
    if (data) {
      localStorage.setItem('userId', data.id)
      return {
        data,
      }
    }
  } catch (err) {
    setLoading(false)
    if (err && err.response) {
      return {
        error: err.response.data.error,
      }
    }
  }
}
