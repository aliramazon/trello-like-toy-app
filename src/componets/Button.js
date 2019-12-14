import React from 'react';

const Button = ({ amount, onClickFunction }) => {
    const handleClick = () => {
        onClickFunction(amount);
    };

    return (<button onClick={handleClick}>+{amount}</button>)
};

export default Button;