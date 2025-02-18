import React from 'react';

type ChatPreviewProps = {
  username: string;
  message: string;
  selected: boolean;
};

export default function ({ username, message, selected }: ChatPreviewProps) {
  return (
    <div>
      <div
        className={
          'flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer ' +
          (selected && 'bg-gray-200')
        }
      >
        <div className="w-1/4">
          <img
            src={`https://ui-avatars.com/api/?name=${username}`}
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{username}</div>
          <span className="text-gray-500">{message}</span>
        </div>
      </div>
    </div>
  );
}
