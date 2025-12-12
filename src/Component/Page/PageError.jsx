import React from 'react';

export default function PageError() {
  const box = {
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  };

  const text = {
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  };

  return (
    <div style={box}>
      <div style={text}>
        <h2>Not Found</h2>
        <p>User or page does not exist.</p>
      </div>
    </div>
  );
}