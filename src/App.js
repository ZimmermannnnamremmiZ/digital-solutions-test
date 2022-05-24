import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "./Components/appHeader/AppHeader";
import Spinner from './Components/spinner/Spinner';

const Page404 = lazy(() => import('./Components/errorMessage/ErrorMessage'))
const MainPage = lazy(() => import('./Components/pages/mainPage/MainPage'))
const ProfilePage  = lazy(() => import('./Components/pages/profilePage/ProfilePage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                {/* <Route path="/comics" element={<ComicsPage/>} />
                                <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType={'comic'}/>} /> */}
                                <Route path="*" element={<Page404 />} />
                                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                                <Route path="/users/:id" element={<ProfilePage />} />
                            </Routes>
                        </Suspense>
                    </main>
            </div>
        </Router>
    )
}

export default App;