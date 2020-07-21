import React from 'react';

interface MinusProps {
    width?: string;
    height?: string;
    fill?: string;
    className?: string;
}

export function MinusIcon(props: MinusProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width={props.width || "20px"} height={props.height || "20px"} viewBox="0 0 401.991 401.991" fill={props.fill}>
            <path d="M394,154.174c-5.331-5.33-11.806-7.995-19.417-7.995H27.406c-7.611,0-14.084,2.665-19.414,7.995
		C2.662,159.503,0,165.972,0,173.587v54.82c0,7.617,2.662,14.086,7.992,19.41c5.33,5.332,11.803,7.994,19.414,7.994h347.176
		c7.611,0,14.086-2.662,19.417-7.994c5.325-5.324,7.991-11.793,7.991-19.41v-54.82C401.991,165.972,399.332,159.5,394,154.174z"/>
        </svg>
    );
}
