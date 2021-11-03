import React, {} from 'react';

import './style.css';

const Input = ({ placeholder, name, type, ...rest }) => {
    return(
        <div className="input-block">
            <input name={name} type={type} {...rest} placeholder={placeholder}/>
         </div>
    );
}

export default Input;