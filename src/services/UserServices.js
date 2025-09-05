import axios from 'axios'
const url = 'http://localhost:3001'

export const fetchUserById = async (user_id) => {
  try {
    const { data } = await axios.get(`${url}/users/${user_id}`)
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

export const fetchRecommandedUsers = async () => {
  try {
    const { data } = await axios.get(`${url}/users`)
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

export const sendFriendRequest = async (user_id) => {
  const userId = parseInt(localStorage.getItem('userId'))
  try {
    const { data } = await axios.post(`${url}/friendRequests`, {
      senderId: userId,
      receiverId: user_id,
      status: 'pending',
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

export const fetchIncommingFriendRequests = async () => {
  const userId = parseInt(localStorage.getItem('userId'))
  try {
    const { data } = await axios.get(
      `${url}/friendRequests?receiverId=${userId}&status=pending&_expand=sender`,
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

export const fetchSendedFriendRequests = async () => {
  const userId = parseInt(localStorage.getItem('userId'))
  try {
    const { data } = await axios.get(
      `${url}/friendRequests?senderId=${userId}&status=pending&_expand=receiver`,
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

export const acceptFriendRequest = async (request_id) => {
  try {
    const requestResponse = await axios.get(`${url}/friendRequests/${request_id}`)
    const request = requestResponse.data
    const { senderId, receiverId } = request

    await axios.post(`${url}/friends`, {
      userId: senderId,
      friendId: receiverId,
    })
    await axios.post(`${url}/friends`, {
      userId: receiverId,
      friendId: senderId,
    })

    const { data } = await axios.delete(`${url}/friendRequests/${request_id}`)
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

export const declineFriendRequest = async (request_id) => {
  try {
    const { data } = await axios.delete(`${url}/friendRequests/${request_id}`)
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

export const cancelFriendRequest = async (request_id) => {
  try {
    const { data } = await axios.delete(`${url}/friendRequests/${request_id}`)
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
