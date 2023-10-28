import React from 'react';

const MyButton = () => {
    const closeApp = () => {
        window.close();
        };
    return (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={closeApp}
            >
            X
        </button>
    );
}

export default MyButton