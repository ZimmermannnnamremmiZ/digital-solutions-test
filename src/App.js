import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "./Components/appHeader/AppHeader";

const Page404 = lazy(() => import('./Components/errorMessage/ErrorMessage'))
const MainPage = lazy(() => import('./Components/pages/mainPage/MainPage'))
const ProfilePage  = lazy(() => import('./Components/pages/profilePage/ProfilePage'))
const PostPage  = lazy(() => import('./Components/pages/postPage/PostPage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="*" element={<Page404 />} />
                                <Route path="/users/:userId" element={<ProfilePage />} />
                                <Route path="/posts/:postId" element={<PostPage />} />
                            </Routes>
                        </Suspense>
                    </main>
            </div>
        </Router>
    )
}

export default App;