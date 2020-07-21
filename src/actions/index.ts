import {
    GET_PLAYLIST,
    CHANGE_ACTIVE_ASSET,
    ADD_ASSET_TO_FAVORITE,
    REMOVE_ASSET_FROM_FAVORITE,
    ADD_CRAVING, REMOVE_CRAVING,
    REMOVE_MOOD_ITEM, REMOVE_TRIGGER_ITEM,
    ADD_MOOD_ITEM, ADD_TRIGGER_ITEM,
    EDIT_MOOD_ITEM, EDIT_TRIGGER_ITEM,
    SAVE_LAST_SMOKE
} from './actionTypes';

export function getPlaylist(payload: any) {
    return {
        type: GET_PLAYLIST,
        payload
    };
}

export function changeActiveAsset(id: number) {
    return {
        type: CHANGE_ACTIVE_ASSET,
        payload: {
            id
        }
    };
}

export function addAssetToFavorite(id: number) {
    return {
        type: ADD_ASSET_TO_FAVORITE,
        payload: {
            id
        }
    }
}

export function removeAssetFromFavorite(id: number) {
    return {
        type: REMOVE_ASSET_FROM_FAVORITE,
        payload: {
            id
        }
    };
}

export function addCurving(curving: string, mood: string, trigger: string) {
    return {
        type: ADD_CRAVING,
        payload: {
            curving: {
                mood,
                trigger,
                text: curving,
                date: new Date()
            }
        }
    };
}

export function removeCurving(id: number) {
    return {
        type: REMOVE_CRAVING,
        payload: {
            id
        }
    };
}

export function removeMoodItem(id: number) {
    return {
        type: REMOVE_MOOD_ITEM,
        payload: {
            id
        }
    };
}

export function removeTriggerItem(id: number) {
    return {
        type: REMOVE_TRIGGER_ITEM,
        payload: {
            id
        }
    };
}

export function addMoodItem(mood: string) {
    return {
        type: ADD_MOOD_ITEM,
        payload: {
            mood
        }
    }
}

export function addTriggerItem(trigger: string) {
    return {
        type: ADD_TRIGGER_ITEM,
        payload: {
            trigger
        }
    }
}

export function editMoodItem(id: number, newValue: string) {
    return {
        type: EDIT_MOOD_ITEM,
        payload: {
            id,
            newValue
        }
    }
}

export function editTriggerItem(id: number, newValue: string) {
    return {
        type: EDIT_TRIGGER_ITEM,
        payload: {
            id,
            newValue
        }
    }
}

export function saveLastSmoke(data: any) {
    return {
        type: SAVE_LAST_SMOKE,
        payload: {
            ...data
        }
    }
}
