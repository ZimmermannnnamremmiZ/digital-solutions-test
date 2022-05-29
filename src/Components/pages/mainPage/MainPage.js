import { useState } from "react";
import CustomScroll from 'react-custom-scroll';

import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import Carousel from "../../carousel/Carousel";
import UserList from "../../userList/UserList";
import './mainPage.scss';
import './customScroll.scss';


    const MainPage = () => {
        const [application, setApplication] = useState('')

        const onSubmitForm = (e) => {
            e.preventDefault()
            return application
        }

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
                            <Carousel />
                    </ErrorBoundary>
                    <div className="container">
                        <div className="tickets flex justify-sb">
                            <h2 className="tickets__title">Купили билеты</h2>
                            <div className="tickets__amount">932/</div>
                        </div>
                        <ErrorBoundary>
                            <UserList />
                        </ErrorBoundary>
                        <div className="flex">
                            <div className='aboutPlatform'>
                                <h2 className='aboutPlatform__title'>О площадке</h2>
                                <ErrorBoundary>
                                    <CustomScroll className='aboutPlatform__scroll-box'>
                                        <p className="aboutPlatform__description-header">Современная площадка для проведения концертов и других мероприятий любой сложности.</p>
                                        <p className="aboutPlatform__description">Мы предоставляем всю необходимую для организаторов инфраструктуру и готовые решения под все основные задачи любого события, а также современное оборудование, соответствующее самым высоким мировым стандартам. <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat et deleniti pariatur illum quidem, ratione corporis, veritatis cupiditate quia assumenda magni, nihil deserunt facere laborum odio iusto asperiores nisi. Necessitatibus!
                                        Ut facere, rerum ratione aut quibusdam cum sint. Vitae nihil excepturi doloremque praesentium laborum iure minus, adipisci, autem ab pariatur cum esse architecto voluptatibus dolorum aperiam sint quia in deserunt!
                                        Fugiat qui consequatur corrupti nobis voluptate in voluptatem. Laborum, corporis vitae? Eaque ipsum nemo cum incidunt vitae expedita officiis? Necessitatibus, fuga deserunt inventore vero dignissimos eligendi iste iure illum accusamus.
                                        Beatae reiciendis fugiat pariatur sapiente dolores. Nam voluptatibus vel vero quis quaerat? Aliquid natus id optio ut, quisquam temporibus quidem, explicabo fugiat nesciunt a reiciendis nam qui officia pariatur modi!
                                        Totam nisi voluptates adipisci error quos quaerat nemo. Modi nobis fugit ipsum sint explicabo repellendus sit qui eligendi quasi voluptas ipsa a deleniti blanditiis fugiat laborum, fuga temporibus corrupti maiores?</p>
                                    </CustomScroll>
                                </ErrorBoundary>
                            </div>
                            <form className="application" onSubmit={onSubmitForm}>
                                <h3 className="application__title">Оставить заявку на проведение концерта</h3>
                                <textarea className="application__textarea"
                                       type="text"
                                       value={application}
                                       onChange={el => setApplication(el.target.value)}
                                       placeholder="Расскажите о вашем предложении"
                                />
                                <button className="application__submit" type="submit">Отправить</button>
                            </form>
                        </div>
                        <div className="about flex">
                            <h2 className="about__title">О группе</h2>
                            <p className="about__text">Twenty One Pilots — американский дуэт из Колумбуса, штат Огайо. Группа образовалась в 2009 году и на данный момент состоит из Тайлера Джозефа и Джоша Дана. Коллектив самостоятельно выпустил два альбома: Twenty One Pilots в 2009 и Regional at Best в 2011.</p>
                        </div>
                    </div>
            </>
        )
    }

    export default MainPage;