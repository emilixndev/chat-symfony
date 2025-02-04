import React from 'react';

export default function (props) {
  return (
    <div>
      {props.isSender ? (
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            {props.message}
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${props.username}`}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>
      ) : (
        <div className="flex justify-start mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${props.username}`}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
            {props.message}
          </div>
        </div>
      )}
    </div>
  );
}
