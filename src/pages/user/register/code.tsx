import { Input } from 'antd';
import React, { useState, FC, useRef, useEffect } from 'react';

const CodeInput: FC = () => {
  const [values, setValues] = useState(new Array(4).fill(''));
  const refs = useRef<any>({});

  useEffect(() => {
    // 在这里可以访问refs对象，它包含了所有的li元素的refs
    console.log(refs.current);
  }, []);

  useEffect(() => {
    // 组件挂载后设置焦点
    refs?.current[0].focus();
  }, []);

  const handleChange = (index: any, value: any) => {
    refs?.current[index].focus();
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className='phone-code-input__security'>
      {values.map((value, index) => (
        <Input
          key={index}
          ref={(el: any) => refs.current[index] = el}
          type="text"
          maxLength={1}
          value={value}
          onChange={e => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};


export default CodeInput;