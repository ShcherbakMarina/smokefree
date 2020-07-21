import React from 'react';

interface EditIconProps {
    width?: string;
    height?: string;
    fill?: string;
    className?: string;
}

export function EditIcon(props: EditIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width={props.width || "25px"} height={props.height || "25px"} viewBox="0 0 32 32" fill={props.fill} className={props.className}>
            <g>
                <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z" />
            </g>
        </svg>
    );
}
