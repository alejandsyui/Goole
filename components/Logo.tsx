/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#3B82F6"/>
          <stop offset="1" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      {/* Background shape */}
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)"/>
      {/* Stylized 'P' */}
      <path d="M12 9H19C21.7614 9 24 11.2386 24 14C24 16.7614 21.7614 19 19 19H15V23H12V9Z" fill="white"/>
      {/* AI Sparkle in the counter of 'P' */}
      <path d="M19 12.5L17.5 14L19 15.5L20.5 14L19 12.5Z" fill="#3B82F6"/>
    </svg>
    <span className="text-xl font-bold tracking-tight text-gray-100">
      Pixshop
    </span>
  </div>
);

export default Logo;
