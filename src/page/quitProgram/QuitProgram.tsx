import * as React from 'react';
import { connect } from 'react-redux';

import { AssetControls } from '../../player/AssetControls';
import home1 from '../../mocks/images/home-1.jpg';
import { AssetList } from './AssetList';
import { getPlaylist, changeActiveAsset, addAssetToFavorite, removeAssetFromFavorite } from '../../actions';

import './QuitProgram.css';

const assetList = [
    'Lesson_1.mp3',
    'Lesson_2.mp3',
    'Lesson_3.mp3',
    'Lesson_4.mp3',
];

interface QuitProgramState {
    currentAsset: any;
}

class QuitProgramClass extends React.Component<any, QuitProgramState>{
    componentDidMount(): void {
        this.props.getPlaylist(assetList);
    }

    render() {
        const { playlist, favorites, activeAssetId, changeActiveAsset, addAssetToFavorite, removeAssetFromFavorite } = this.props;

        return (
            <div className={'quitProgram-page'}>
                <div className={'player-container'}>
                    {/*<img src={home1} />*/}
                    {playlist.length &&
                    <AssetList
                        favorites={favorites}
                        list={playlist}
                        activeAssetId={activeAssetId}
                        changeActiveAsset={changeActiveAsset}
                        addAssetToFavorite={addAssetToFavorite}
                        removeAssetFromFavorite={removeAssetFromFavorite}
                    />}
                </div>
                {playlist.length &&
                <AssetControls
                    favorites={favorites}
                    list={playlist}
                    activeAssetId={activeAssetId}
                    changeActiveAsset={changeActiveAsset}
                    addAssetToFavorite={addAssetToFavorite}
                    removeAssetFromFavorite={removeAssetFromFavorite}
                />}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        playlist: state.playlist.list,
        favorites: state.favorites,
        activeAssetId: state.playlist.activeItemId
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addAssetToFavorite: (id: number) => dispatch(addAssetToFavorite(id)),
        removeAssetFromFavorite: (id: number) => dispatch(removeAssetFromFavorite(id)),
        changeActiveAsset: (id: number) => dispatch(changeActiveAsset(id)),
        getPlaylist: (assetList: any) => dispatch(getPlaylist(assetList))
    };
}

export const QuitProgram = connect(mapStateToProps, mapDispatchToProps)(QuitProgramClass);
