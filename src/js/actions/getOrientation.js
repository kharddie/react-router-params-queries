export const FETCH_ORIENTATION = 'FETCH_ORIENTATION';

export const FETCH_ORIENTATIONX = 'FETCH_ORIENTATIONX';

export function fetchOrientation(orientation) {
    return {
        type: FETCH_ORIENTATION,
        payload: orientation
    };
}

export function fetchOrientationx(orientation) {
    return {
        type: FETCH_ORIENTATIONX,
        payload: orientation
    };
}