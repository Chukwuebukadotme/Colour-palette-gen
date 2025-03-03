import React from 'react'

const Header = () => {
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Professional Color Palette Generator
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Create beautiful, harmonious color palettes for your design projects with just a few clicks.
      </p>
    </header>
  )
}

export default Header 