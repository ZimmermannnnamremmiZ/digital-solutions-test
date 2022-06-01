import {
    useState,
    useCallback
} from 'react'

export const useApi = () => {

    const [process, setProcess] = useState('waiting')

    const _apiBase = 'https://jsonplaceholder.typicode.com';

    const request = useCallback(async (url, method = "GET", body = null, headers = {
        'Content-Type': 'application/json'
    }) => {

        setProcess('loading');

        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });

            if (!response.ok) {
                throw new Error(`Can't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (err) {
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

    const getUser = async (id) => {
        const user = await request(`${_apiBase}/users/${id}`);
        return _transformUser(user);
    }

    const getUserPosts = async (id) => {
        const posts = await request(`${_apiBase}/users/${id}/posts`);
        return posts.map(_transformPosts);
    }

    const getPost = async (id) => {
        const post = await request(`${_apiBase}/posts/${id}`);
        return post;
    }

    const getPostComments = async (id) => {
        const comments = await request(`${_apiBase}/comments?postId=${id}`);
        return comments;
    }

    const postComment = async (id, name, body, email, postId) => {
        await request(`${_apiBase}/comments`, 'POST', JSON.stringify({
            postId,
            id,
            name,
            email,
            body 
          }), {
            'Content-Type': 'application/json'
        }).then((response) => console.log(response));
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
            fullName: user.name,
            name: user.name.split(' ')[0],
            city: user.address?.city,
            username: user.username,
            phone: user.phone,
            email: user.email,
            website: user.website,
            company: user.company?.name,
            bs: user.company?.bs
        }
    }

    return {
        clearError,
        process,
        setProcess,
        getAllUsers,
        getUserPosts,
        getUser,
        getPost,
        getPostComments,
        postComment
    }
}

export default useApi;