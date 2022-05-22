import { useState, useCallback } from 'react'

export const useApi = () => {

    const [process, setProcess] = useState('waiting')

    const _apiBase = 'https://jsonplaceholder.typicode.com';

    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-Type': 'application/json'}) => {

        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Can't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(err) {
            setProcess('error')
            throw err
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading')
    }, []);

  const getAllUsers = async () => {
      const users = await request(`${_apiBase}/users`);
      return users.map(_transformUser);
  }

  const getUserPosts = async (id) => {
      const posts = await request(`${_apiBase}/users/${id}/posts`);
      return posts.map(_transformPosts);
  }


  const _transformPosts = (post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body
      }
  }

  const _transformUser = (user) => {
      return {
          id: user.id,
          name: user.name,
          city: user.address?.city,
          username: user.username,
          phone: user.phone,
          email: user.email,
          company: user.company?.name,
          bs: user.company?.bs
      }
  }

  return {
      clearError,
      process,
      setProcess,
      getAllUsers,
      getUserPosts
  }
}

export default useApi;