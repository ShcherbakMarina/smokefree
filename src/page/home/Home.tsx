import * as React from 'react';
import {Link} from 'react-router-dom';

import {mainCategories} from '../../mocks/homePage';
import home1 from '../../mocks/images/home-1.jpg';
import home2 from '../../mocks/images/home-2.jpg';
import home3 from '../../mocks/images/home-3.jpg';
import home4 from '../../mocks/images/home-4.jpg';
import home5 from '../../mocks/images/home-5.jpg';

import './Home.css';

const images = [home1, home2, home3, home4, home5];

export function Home() {
    return (
        <div className={'home-page'}>
            <div className={'home-preview'}>Some kind of preview will be here</div>
            <p className={'home-motto'}>There has never been a better time than now!</p>
            <ul className={'main-categories'}>
                {mainCategories.map((item, index) => {
                    return (
                        <li>
                            <Link to={item.link}>
                                <div className={'category-thumbnail'}>
                                    <img src={images[index]}/>
                                </div>
                                <div className={'category-info'}>
                                    <p className={'category-info__title'}>{item.title}</p>
                                    <p className={'category-info__description'}>{item.shortDescription}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
