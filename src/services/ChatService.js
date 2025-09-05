import axios from 'axios'
const url = 'http://localhost:3001'

export const fetchFriendMessages = async (friend_id) => {
  const userId = parseInt(localStorage.getItem('userId'))
  try {
    const { data } = await axios.get(
      `${url}/messages?_expand=user&recipientId=${friend_id}&userId=${userId}`,
    )
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

export const sendMessage = async (message) => {
  const userId = parseInt(localStorage.getItem('userId'))
  try {
    const { data } = await axios.post(`${url}/messages`, {
      ...message,
      userId,
      createdAt: new Date().toISOString(),
    })
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