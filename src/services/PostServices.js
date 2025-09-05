import axios from 'axios'
const url = 'http://localhost:3001'

export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(`${url}/posts?_expand=user`)
    if (response.data) {
      return {
        data: response.data,
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchPostById = async (post_id) => {
  try {
    const response = await axios.get(`${url}/posts/${post_id}?_expand=user&_embed=comments`)
    if (response.data) {
      return {
        data: response.data,
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const likeDislikePost = async (post_id) => {
  try {
    const response = await axios.get(`${url}/posts/${post_id}`)
    const post = response.data
    const userId = parseInt(localStorage.getItem('userId'))
    const liked = post.likes.includes(userId)

    const updatedLikes = liked
      ? post.likes.filter((id) => id !== userId)
      : [...post.likes, userId]

    const updatedPost = { ...post, likes: updatedLikes }

    const updateResponse = await axios.put(`${url}/posts/${post_id}`, updatedPost)

    if (updateResponse.data) {
      return {
        data: updateResponse.data,
      }
    }
  } catch (err) {
    console.log(err)
    if (err && err.response) {
      return {
        status: err.response.status,
        error: err.response.data.error,
      }
    }
  }
}

export const likeDislikeComment = async (comment_id) => {
  try {
    const response = await axios.get(`${url}/comments/${comment_id}`)
    const comment = response.data
    const userId = parseInt(localStorage.getItem('userId'))
    const liked = comment.likes.includes(userId)

    const updatedLikes = liked
      ? comment.likes.filter((id) => id !== userId)
      : [...comment.likes, userId]

    const updatedComment = { ...comment, likes: updatedLikes }

    const updateResponse = await axios.put(`${url}/comments/${comment_id}`, updatedComment)

    if (updateResponse.data) {
      return {
        data: updateResponse.data,
      }
    }
  } catch (err) {
    console.log(err)
  }
}
