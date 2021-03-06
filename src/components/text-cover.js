import React from 'react'

export default function TextCover({ text, children, overlay = true, coverColor = 'white' }) {
  return (
    <span className="dib relative overflow-hidden">
      <span className="fade">{children ? children : text}</span>
      {overlay && <div
        className={`absolute left-0 w-100 h-100 top-0 bg-${coverColor} text-cover`}
      />}
    </span>
  )
}
