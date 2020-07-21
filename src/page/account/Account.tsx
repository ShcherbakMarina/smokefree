import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { saveLastSmoke } from '../../actions';
// @ts-ignore
import DatePicker from "react-datepicker";
import accountPhoto from '../../assets/accountPhoto.jpg';
import { BlockedContent } from '../../components/blockedContent/BlockedContent';
import { Motivation } from '../../components/motivation/Motivation';

import "react-datepicker/dist/react-datepicker.css";
import './Account.css';

function getUserInfo() {
    return {
        name: 'Maryna Shcherbak',
        photo: ''
    }
}
// @ts-ignore
const ExampleCustomInput = ({ value,  onClick }, ref) => (
    <button className="example-custom-input" onClick={(e) => {e.preventDefault(); onClick()}}>
        {value}
    </button>
);

const CustomInput = forwardRef(ExampleCustomInput);

class AccountClass extends React.Component<any, any> {
    private formRef: any;

    state = {
        quiteDate: new Date(),
        cigaretteAmount: undefined,
        packPrice: undefined,
        nicotineContent: undefined
    };

    render() {
        const { name } = getUserInfo();
        const { lastSmokeData } = this.props;

        return (
            <div className={'account-page'}>
                <div className={'account-photo'}>
                    <img src={accountPhoto}/>
                </div>
                <p>{name}</p>
                <Motivation />
                {/*<BlockedContent text={'Upgrade your account to quit faster'} />*/}
                {lastSmokeData ? this.renderInfo() : this.renderForm()}
                {this.renderFavorites()}
            </div>
        );
    }

    renderFavorites() {
        const { favorites, list } = this.props;
        const favoriteList = list.filter((element: any, index: number) => favorites.includes(index));

        if (!favoriteList.length) return;

        return (
            <div>
                <h4>Favorites</h4>
                <ul className="favorite-list">
                    {favoriteList.map((asset: any) => {
                        return <li>{asset}</li>
                    })}
                </ul>
            </div>
        );
    }

    renderInfo() {
        const { quiteDate, cigaretteAmount, packPrice, nicotineContent } = this.props.lastSmokeData;
        const days = Math.round(this.calculateDays(quiteDate));
        const cigarettes = days * cigaretteAmount;
        const moneySaved = packPrice / 20 * cigarettes;
        const nicotine = cigarettes * nicotineContent;

        return (
            <div className={'account-info'}>
                <p>You quit {days} days ago</p>
                <p>{cigarettes} cigarettes are not smoked</p>
                <p>{nicotine}mg of nicotine are not inhaled</p>
                <p>You saved {moneySaved}$</p>
            </div>
        );
    }

    calculateDays(quiteDate: Date) {
        return (new Date().getTime() - quiteDate.getTime()) / (1000 * 3600 * 24);
    }

    renderForm() {
        const { quiteDate } = this.state;

        return (
            <form className={'account-form'} ref={(ref) => this.formRef = ref}>
                <ul>
                    <li>
                        <label>Select date of the last cigarette:</label>
                        <DatePicker
                            selected={quiteDate}
                            onChange={(date: any) => this.setState({quiteDate: date})}
                            dateFormat="MMMM d, yyyy"
                            // @ts-ignore
                            customInput={<CustomInput />}
                        />
                    </li>
                    <li>
                        <label>Cigarettes per day, pcs:</label>
                        <input type="number" name="cigarettesAmount" onChange={this.onCigarettesChange} />
                    </li>
                    <li>
                        <label>Pack price, USD:</label>
                        <input type="number" name="price" onChange={this.onPackPriceChange} />
                    </li>
                    <li>
                        <label>Nicotine content, mg/cig:</label>
                        <input type="number" name="nicotine" onChange={this.onNicotineContentChange} />
                    </li>
                    <li>
                        <button type={'submit'} onClick={this.onSetupClick}>Save</button>
                    </li>
                </ul>
            </form>
        );
    }

    onCigarettesChange = (event: any) => {
        this.setState({ cigaretteAmount: event.target.value });
    };

    onPackPriceChange = (event: any) => {
        this.setState({ packPrice: event.target.value });
    };

    onNicotineContentChange = (event: any) => {
        this.setState({ nicotineContent: event.target.value });
    };

    onSetupClick = (e: any) => {
        e.preventDefault();

        this.props.saveLastSmoke(this.state);
    };
}

function mapStateToProps(state: any) {
    return {
        lastSmokeData: state.lastSmokeData,
        favorites: state.favorites,
        list: state.playlist.list
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        saveLastSmoke: (data: any) => dispatch(saveLastSmoke(data))
    };
}

export const Account = connect(mapStateToProps, mapDispatchToProps)(AccountClass);

