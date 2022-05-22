import { useState } from "react";

import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import Carousel from "../../carousel/Carousel";
import UserList from "../../userList/UserList";
import './mainPage.scss'


    const MainPage = () => {
        const onUserSelected = (id) => {
            setSelectedUser(id)
        } // не нужно

        const [selectedUser, setSelectedUser] = useState(null) // -=-

        return (
            <>
                    <div className="ellipse_1"></div>
                    <div className="ellipse_2"></div>
                    <div className="title">
                        <h2>Twenty One Pilots</h2>
                        <p>22.02.23 в 21:00</p>
                        <button>Купить билеты</button>
                        <div className="rectangle"></div>
                    </div>
                    <ErrorBoundary>
                        {/* <CharList onCharacterSelected={onCharacterSelected} /> */}
                    </ErrorBoundary>
                    <ErrorBoundary>
                        {/* <div style={{display: "flex", flexDirection: "column"}}> */}
                            {/* <CharInfo characterId={selectedCharacter} />
                            <CharSearch /> */}
                        {/* </div> */}
                            <Carousel />
                    </ErrorBoundary>
                    <div className="container">
                        <div className="tickets flex justify-sb">
                            <h2 className="tickets__title">Купили билеты</h2>
                            <div className="tickets__amount">932/</div>
                        </div>
                        <UserList onUserSelected={onUserSelected}/>
                    </div>
            </>
        )
    }

    export default MainPage;