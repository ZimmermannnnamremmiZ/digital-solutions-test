import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
           <div className='container flex justify-sb'>
            <div className="app__title">
                <Link to="/">
                    <h1 className='app__title-text'><span>CONCERT CLUB</span></h1>
                </Link>
            </div>
                <nav className="app__menu">
                    <NavLink style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                            to="/poor-vision">Версия для слабовидящих</NavLink>
                    <NavLink
                        style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/profile">Мой профиль</NavLink>
                </nav>
           </div>
        </header>
    )
}

export default AppHeader;