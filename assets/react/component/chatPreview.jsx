import React from 'react';

export default function (props) {
    return <div>

        <div
            className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
        >
            <div className="w-1/4">
                <img
                    src={`https://ui-avatars.com/api/?name=${props.username}`}
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                />
            </div>
            <div className="w-full">
                <div className="text-lg font-semibold">{props.username}</div>
                <span className="text-gray-500">{props.message}</span>
            </div>
        </div>

    </div>
}