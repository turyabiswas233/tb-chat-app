import React from "react";

function Input({
  flex,
  ariaHidden,
  require,
  value,
  getValue,
  type,
  showPass,
  placeholder,
}) {
  return (
    <>
      <input
        className={`text-white bg-transparent placeholder:text-cyan-100 placeholder:opacity-50 focus:outline-none placeholder:capitalize`}
        type={type == "password" ? (showPass ? "text" : type) : type}
        name={type}
        id={type}
        onChange={getValue}
        required={require || false}
        placeholder={placeholder}
        minLength={type == "password" ? 8 : undefined}
        autoComplete={"off"}
        accept={type == "file" ? " image/jpeg, image/png" : undefined}
        style={{
          flex: flex || 1,
          display: ariaHidden && "none",
        }}
      />
      {ariaHidden && type == "file" && (
        <label
          htmlFor={type}
          className="text-cyan-100 opacity-50 w-56 overflow-hidden"
        >
          {value ? `${value?.name}` : "Add profile photo"}
        </label>
      )}
    </>
  );
}

export default Input;
