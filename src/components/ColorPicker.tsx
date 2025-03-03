import React, { useState } from 'react'
import { colord } from 'colord'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [inputValue, setInputValue] = useState(color)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Only update the actual color if it's valid
    if (colord(value).isValid()) {
      onChange(value)
    }
  }

  // Convert the color to different formats
  const colorObj = colord(color)
  const hexValue = colorObj.toHex()
  const rgbValue = colorObj.toRgbString()
  const hslValue = colorObj.toHslString()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div 
          className="w-full h-24 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: color }}
        />
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={hexValue}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-12 rounded cursor-pointer"
            />
            
            <div className="flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter color (hex, rgb, name)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <span className="font-medium text-gray-500 dark:text-gray-400">HEX:</span> {hexValue}
        </div>
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <span className="font-medium text-gray-500 dark:text-gray-400">RGB:</span> {rgbValue}
        </div>
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <span className="font-medium text-gray-500 dark:text-gray-400">HSL:</span> {hslValue}
        </div>
      </div>
    </div>
  )
}

export default ColorPicker 