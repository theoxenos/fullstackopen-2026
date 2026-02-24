import React, { forwardRef, useImperativeHandle, useState } from 'react';

const HIDDEN_STYLE = { display: 'none' };
const VISIBLE_STYLE = { display: '' };

const Toggleable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { buttonLabel, children } = props;

  const hideWhenVisible = isVisible ? HIDDEN_STYLE : VISIBLE_STYLE;
  const showWhenVisible = isVisible ? VISIBLE_STYLE : HIDDEN_STYLE;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Toggleable;
