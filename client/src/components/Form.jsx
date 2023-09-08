import React from 'react';
import postImage from '../images/post.svg'; // Adjust the path based on your folder structure

const Form = ({ labelName, type, name, placeholder, value, handleChange, isSurprise, handleSurprise }) => {

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="font-medium text-[#666e75] text-lg">
          {labelName}
        </label>
        {isSurprise && (
          <button type="button"
            onClick={handleSurprise}
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black">
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default Form;
