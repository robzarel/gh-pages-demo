import React, { useState } from "react";
import type { ChangeEvent } from "react";

const Page = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input type="text" value={value} onChange={handleChange}/>
    </div>
  );
};

export default Page;
