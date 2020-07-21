import React from 'react';

import './AssetList.css';
import {PlayIcon} from '../../icons/PlayIcon';
import {HeartIcon} from '../../icons/HeartIcon';

interface AssetListProps {
    list: any[];
    favorites: any[];
    activeAssetId: number;
    changeActiveAsset: (id: number) => void;
    addAssetToFavorite: (id: number) => void;
    removeAssetFromFavorite: (id: number) => void;
}

export class AssetList extends React.Component<AssetListProps, any>{
    render() {
        const { list, favorites, changeActiveAsset, addAssetToFavorite, removeAssetFromFavorite } = this.props;

        return (
            <ul>
                {list.map((asset, index) => {
                    const liked = favorites.includes(index);

                    return (
                        <li
                            key={index}
                            className={'asset-list__item'}
                            onClick={() => changeActiveAsset(index)}
                        >
                            <PlayIcon className="controls-icon" width={'40px'} height={'40px'} fill={'#000'}/>
                            <span>{asset}</span>
                            <div
                                onClick={liked ? () => removeAssetFromFavorite(index) : (event) => {
                                    event.stopPropagation();
                                    addAssetToFavorite(index)
                                }}>
                                <HeartIcon className={`controls-icon heart-icon ${liked ? 'liked' : ''}`} width={'20px'}
                                           height={'20px'}/>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    addToFavorite() {
        const { addAssetToFavorite } = this.props;


    }
}
