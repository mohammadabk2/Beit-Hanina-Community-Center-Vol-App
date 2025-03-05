import React, { useState } from 'react';

function InputComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
        <input placeholder='' type="text" value={inputValue} onChange={handleInputChange} />
        <p>You entered: {inputValue}</p>
    </div>
  );
}

export default InputComponent;