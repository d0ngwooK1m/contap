import React from 'react';

export default function useInput(defaultValue) {
  const [state, setState] = React.useState(
    typeof defaultValue === 'function' ? defaultValue() : defaultValue,
  );

  const onChange = (event) => setState(event.target.value);

  return [state, onChange];
}
