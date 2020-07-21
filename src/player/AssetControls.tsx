import React from 'react';
import { Howl } from 'howler';
import { PlayerControls } from './PlayerControls';

import './AssetControls.css';

interface AssetControlsState {
    playing: boolean;
    muted: boolean;
    duration: number;
    currentPosition: number;
    item: any;
    scrubbing: boolean;
}

interface AssetControlsProps {
    list: any[];
    favorites: any[];
    activeAssetId: number;
    changeActiveAsset: (id: number) => void;
    addAssetToFavorite: (id: number) => void;
    removeAssetFromFavorite: (id: number) => void;
}

export class AssetControls extends React.Component<AssetControlsProps, AssetControlsState> {
    sound: Howl;
    progressBarRef: any;
    state = {
        playing: false,
        muted: false,
        duration: 0,
        currentPosition: 0,
        item: undefined,
        scrubbing: false
    };

    autoplay = (i: number) => {
        const { list } = this.props;

        this.sound = new Howl({
            src: [require(`../../src/assets/sounds/${list[i]}`)],
            preload: true,
            onend: () => {
                if ((i + 1) === list.length) {
                    this.autoplay(i);
                } else {
                    this.autoplay(i + 1);
                }
            }
        });

        this.removeListeners();
        this.addListeners();

        this.setState({ item: list[i] });
    };

    componentDidMount() {
        this.autoplay(0);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { activeAssetId } = this.props;

        if (this.state.item !== prevState.item) {
            this.removeListeners();
            this.addListeners();
        }

        if (activeAssetId !== prevProps.activeAssetId) {
            this.playDifferentSound(activeAssetId);
        }
    }

    componentWillUnmount(): void {
        this.sound.unload();
    }

    moveToMousePosition = (event: any) => {
        const per = event.clientX / window.innerWidth;

        this.sound.seek(this.sound.duration() * per);
    };

    onMouseDown = (event: any) => {
        this.setState({ scrubbing: true });

        if (this.state.playing) this.sound.pause();

        this.moveToMousePosition(event);
        this.subscribeForMouseEvents();
    };

    stopDrag = () => {
      this.setState({ scrubbing: false });
      if (this.state.playing) {
          this.sound.play();
      }

      this.unsubscribeEvents();
    };

    private subscribeForMouseEvents = (): void => {
        document.addEventListener('mousemove', this.moveToMousePosition);
        document.addEventListener('mouseup', this.stopDrag);
    };

    private unsubscribeEvents = (): void => {
        document.removeEventListener('mousemove', this.moveToMousePosition);
        document.removeEventListener('mouseup', this.stopDrag);
    };

    addListeners = () => {
        this.sound.once('load', this.onLoadListener);
        this.sound.on('play', this.onPlayListener);
        this.sound.on('seek', this.onSeekListener);
    };

    removeListeners = () => {
        this.sound.off('play', this.onPlayListener);
        this.sound.off('seek', this.onSeekListener);
    };

    onLoadListener = () => {
        this.setState({ duration: Math.floor(this.sound.duration()) });
    };

    onPlayListener = () => {
        requestAnimationFrame(this.step.bind(this));
    };

    onSeekListener = () => {
        requestAnimationFrame(this.step.bind(this));
    };

    step = () => {
        const seek = (this.sound.seek() || 0) as number;
        const currentPosition = Math.floor(seek);

        this.progressBarRef.style.width = (((seek / this.sound.duration()) * 100) || 0) + '%';
        this.setState({ currentPosition });

        if (this.sound.playing()) {
            requestAnimationFrame(this.step);
        }
    };

    formatTime = (secs: number) => {
        const minutes = Math.floor(secs / 60) || 0;
        const seconds = (secs - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    onProgressBarRef = (ref: any) => {
        this.progressBarRef = ref;
    };

    onProgressBarClick = (event: any) => {
        const per = event.clientX / window.innerWidth;

        this.sound.seek(this.sound.duration() * per);
    };

    onNextClick = () => {
        const { activeAssetId, changeActiveAsset } = this.props;

        this.playDifferentSound(activeAssetId + 1);
        changeActiveAsset(activeAssetId + 1);
    };

    onPrevClick = () => {
        const { activeAssetId, changeActiveAsset } = this.props;

        this.playDifferentSound(activeAssetId - 1);
        changeActiveAsset(activeAssetId - 1);
    };

    playDifferentSound = (id: number) => {
        if (this.state.playing) {
            this.sound.stop();
            this.autoplay(id);
            this.sound.play();
        } else {
            this.autoplay(id);
        }

        this.setState({ duration: Math.floor(this.sound.duration()) });
    };

    render() {
        const { item, playing, muted, duration, currentPosition, scrubbing } = this.state;
        const { list, favorites, addAssetToFavorite, removeAssetFromFavorite } = this.props;
        const assetId = list.indexOf(item);

        return (
            <div className="asset-controls">
                <div
                    className={'progress-bar-container'}
                    onClick={this.onProgressBarClick}
                    onMouseDown={this.onMouseDown}
                >
                    <div className={`progress-bar ${scrubbing ? 'scrubbing' : ''}`} ref={this.onProgressBarRef} />
                </div>
                <PlayerControls
                    assetId={assetId}
                    liked={favorites.includes(assetId)}
                    currentPosition={this.formatTime(currentPosition)}
                    duration={this.formatTime(duration)}
                    asset={item}
                    playing={playing}
                    muted={muted}
                    onPlayPauseClick={this.onPlayPauseClick}
                    onNextClick={this.onNextClick}
                    onPrevClick={this.onPrevClick}
                    isNextAvailable={item !== list[list.length - 1]}
                    isPrevAvailable={item !== list[0]}
                    addAssetToFavorite={addAssetToFavorite}
                    removeAssetFromFavorite={removeAssetFromFavorite}
                />
            </div>
        );
    }

    onPlayPauseClick = () => {
        if (this.state.playing) {
            if (!this.state.muted) {
                this.sound.pause();
            }
        } else {
            if (!this.state.muted) {
                this.sound.play();
            }
        }

        this.setState({ playing: !this.state.playing });
    };

    onVolumeChange = (value: number) => {
        if (this.state.muted) {
            this.sound.play();
            this.setState({ muted: false });
        }

        this.sound.volume(value/100);
    };
}
