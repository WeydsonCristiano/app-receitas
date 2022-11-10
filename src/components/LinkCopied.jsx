import React from 'react';
import './styles/copyLink.css';

export default function LinkCopied() {
  return (
    <div className="copyLink">
      <p>
        Copied link to clipboard!
      </p>
      <span className="timer"> </span>
    </div>
  );
}
