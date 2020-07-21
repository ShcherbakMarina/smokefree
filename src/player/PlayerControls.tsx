import React from 'react';
import { PlayIcon } from '../icons/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon';
import { Arrow } from '../icons/Arrow';
import { HeartIcon } from '../icons/HeartIcon';

import './PlayerControls.css';

interface PlayerControlsProps {
    asset: any;
    assetId: number;
    liked: boolean;
    currentPosition: string;
    duration: string;
    playing: boolean;
    muted: boolean;
    isNextAvailable: boolean;
    isPrevAvailable: boolean;
    onPlayPauseClick: () => void;
    onNextClick: () => void;
    onPrevClick: () => void;
    addAssetToFavorite: (id: number) => void;
    removeAssetFromFavorite: (id: number) => void;
}

export class PlayerControls extends React.Component<PlayerControlsProps, any> {
    onPreviousAssetClick = () => {
        this.props.onPrevClick();
    };

    onNextAssetClick = () => {
        this.props.onNextClick();
    };

    renderPreviousButton() {
        const { isPrevAvailable } = this.props;

        return (
            <div
                className={`previous-arrow controls-icon ${!isPrevAvailable && 'disabled'}`}
                onClick={isPrevAvailable ? this.onPreviousAssetClick : () => {}}
            >
                <Arrow/>
            </div>
        );
    }

    renderNextButton() {
        const { isNextAvailable } = this.props;

        return (
            <div
                className={`next-arrow controls-icon ${!isNextAvailable && 'disabled'}`}
                onClick={isNextAvailable ? this.onNextAssetClick : () => {}}
            >
                <Arrow/>
            </div>
        );
    }

    renderSoundInfo() {
        const { duration, currentPosition } = this.props;

        return (
            <p className={'sound-info'}>{`${currentPosition}/${duration}`}</p>
        );
    }

    renderHeartButton() {
        const { assetId, liked, addAssetToFavorite, removeAssetFromFavorite } = this.props;

        return (
            <div onClick={liked ? () => {removeAssetFromFavorite(assetId)} : () => {addAssetToFavorite(assetId)}}>
            <HeartIcon
                className={`controls-icon heart-icon  ${liked ? 'liked' : ''}`}
                width={"30px"}
            />
            </div>
        );
    }

    render() {
        const { asset, playing, onPlayPauseClick } = this.props;

        return (
            <div className="controls">
                {this.renderPreviousButton()}
                <div className="controls-playPause" onClick={onPlayPauseClick}>
                    {playing ? <PauseIcon className="controls-icon" /> : <PlayIcon className="controls-icon" />}
                </div>
                {this.renderNextButton()}
                {this.renderSoundInfo()}
                {asset}
                {this.renderHeartButton()}
            </div>
        );
    }
}
