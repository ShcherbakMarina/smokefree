import {
    GET_PLAYLIST,
    CHANGE_ACTIVE_ASSET,
    ADD_ASSET_TO_FAVORITE,
    REMOVE_ASSET_FROM_FAVORITE,
    ADD_CRAVING,
    REMOVE_CRAVING,
    REMOVE_TRIGGER_ITEM,
    REMOVE_MOOD_ITEM,
    ADD_MOOD_ITEM,
    ADD_TRIGGER_ITEM,
    EDIT_MOOD_ITEM,
    EDIT_TRIGGER_ITEM,
    SAVE_LAST_SMOKE
} from '../actions/actionTypes';

const initialState = {
    playlist: {
        list: [],
        activeItemId: 0
    },
    favorites: [],
    curvingHistory: [],
    moods: [
        'stressed', 'nervous', 'unsettled', 'active', 'relaxed', 'lovable', 'romantic', 'happy'
    ],
    triggers: [
        'work', 'relationship', 'relatives', 'friends'
    ],
    lastSmokeData: undefined,
    account: {
        type: 'minimal'
    }
};

interface Action {
   type: string;
   payload: any;
}

function rootReducer(state = initialState, action: Action) {
    let playlist = state.playlist;

    switch (action.type) {
        case GET_PLAYLIST:
            return {
                ...state,
                playlist: {
                    ...playlist,
                    list: action.payload
                }
            };
        case CHANGE_ACTIVE_ASSET:
            return {
              ...state,
               playlist: {
                  ...playlist,
                   activeItemId: action.payload.id
               }
            };
        case ADD_ASSET_TO_FAVORITE:
            const { id } = action.payload;
            const { favorites } = state;

            return {
                ...state,
                favorites: favorites.concat(id)
            };
        case REMOVE_ASSET_FROM_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(id => id !== action.payload.id)
            };
        case ADD_CRAVING:
            return {
                ...state,
                curvingHistory: state.curvingHistory.concat(action.payload.curving)
            };
        case REMOVE_CRAVING:
            console.log('id', action.payload.id);
            return {
                ...state,
                curvingHistory: state.curvingHistory.filter((element, id) => id !== action.payload.id)
            };
        case REMOVE_MOOD_ITEM:
            return {
                ...state,
                moods: state.moods.filter((element, index) => index !== action.payload.id)
            };
        case REMOVE_TRIGGER_ITEM:
            return {
                ...state,
                triggers: state.triggers.filter((element, index) => index !== action.payload.id)
            };
        case ADD_MOOD_ITEM:
            return {
                ...state,
                moods: [...state.moods, action.payload.mood]
            };
        case ADD_TRIGGER_ITEM:
            return {
                ...state,
                triggers: [...state.triggers, action.payload.trigger]
            };
        case EDIT_MOOD_ITEM:
            return {
                ...state,
                moods: state.moods.map((item: any, index: number) => index === action.payload.id ? action.payload.newValue : item)
            };
        case EDIT_TRIGGER_ITEM:
            return {
                ...state,
                triggers: state.triggers.map((item: any, index: number) => index === action.payload.id ? action.payload.newValue : item)
            };
        case SAVE_LAST_SMOKE:
            return {
                ...state,
                lastSmokeData: { ...action.payload }
            };
        default:
            return state;
    }
}

export default rootReducer;
