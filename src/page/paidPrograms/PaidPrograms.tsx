import React from 'react';
import { CheckmarkIcon } from '../../icons/CheckmarkIcon';
import { MinusIcon } from '../../icons/MinusIcon';

import './PaidPrograms.css';

const pricing = [
    {
        id: 0,
        title: 'Minimal',
        price: '10',
        currency: '$',
        availableFeatures: [
            'Curb craving analytics'
        ],
        unavailableFeatures: [
            'Curb craving history',
            'Binaural beats',
            'Quit programs',
            'Lungs exercises',
            'Community'
        ]
    },
    {
        id: 1,
        title: 'Standard',
        price: '20',
        currency: '$',
        availableFeatures: [
            'Curb craving analytics',
            'Curb craving history',
            'Binaural beats'
        ],
        unavailableFeatures: [
            'Quit programs',
            'Lungs exercises',
            'Community'
        ]
    },
    {
        id: 2,
        title: 'Luxury',
        price: '30',
        currency: '$',
        availableFeatures: [
            'Curb craving analytics',
            'Curb craving history',
            'Binaural beats',
            'Quit programs',
            'Lungs exercises',
            'Community'
        ],
        unavailableFeatures: []
    }
];

export class PaidPrograms extends React.Component<any, any>{
    render() {
        return <ul className={'pricing-programs'}>
                {pricing.map(element => {
                    return <li className={'pricing-programs__item'}>
                        <h3 className={'pricing-programs__item-title'}>{element.title}</h3>
                        <p className={'pricing-programs__item-pricing'}>
                            <span className={'pricing-programs__item-currency'}>{element.currency}</span>
                            <span className={'pricing-programs__item-price'}>{element.price}</span>
                        </p>
                        <button className={'pricing-programs__item-action'}>Buy program</button>
                        <ul className={'pricing-programs__item-features'}>
                            {element.availableFeatures.map(feature => {
                                return <li><CheckmarkIcon fill={'green'} /> <span>{feature}</span></li>
                            })}
                        </ul>
                        <ul className={'pricing-programs__item-features'}>
                            {element.unavailableFeatures.map(feature => {
                                return <li><MinusIcon fill={'#ffac30'}/> <span>{feature}</span></li>
                            })}
                        </ul>
                    </li>
                })}
            </ul>;
    }
}
