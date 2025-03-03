import React, { useState } from 'react'
import { colord } from 'colord'

interface PaletteDisplayProps {
  palette: string[]
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 1500)
  }

  const getContrastColor = (color: string) => {
    return colord(color).contrast() > 3 ? '#ffffff' : '#000000'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        {palette.map((color, index) => (
          <div 
            key={index}
            className="relative h-16 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
          >
            <div 
              className="absolute inset-0 flex items-center justify-between px-4 rounded-lg"
              style={{ color: getContrastColor(color) }}
            >
              <span className="font-medium">{color.toUpperCase()}</span>
              {copiedColor === color && (
                <span className="text-sm bg-black bg-opacity-20 px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Preview</h3>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            {palette.length > 0 && (
              <>
                <div className="flex items-center justify-center h-16 rounded-lg" style={{ backgroundColor: palette[0] }}>
                  <span style={{ color: getContrastColor(palette[0]) }} className="font-bold text-lg">Header Background</span>
                </div>
                
                <div className="flex flex-col p-4 rounded-lg" style={{ backgroundColor: palette.length > 1 ? palette[1] : palette[0] }}>
                  <h3 style={{ color: getContrastColor(palette.length > 1 ? palette[1] : palette[0]) }} className="text-xl font-bold">
                    Content Section
                  </h3>
                  <p style={{ color: getContrastColor(palette.length > 1 ? palette[1] : palette[0]) }} className="mt-2">
                    This is how your palette might look in a real design.
                  </p>
                  
                  <button 
                    className="mt-4 px-4 py-2 rounded-md font-medium"
                    style={{ 
                      backgroundColor: palette.length > 2 ? palette[2] : palette[0],
                      color: getContrastColor(palette.length > 2 ? palette[2] : palette[0])
                    }}
                  >
                    Primary Button
                  </button>
                  
                  <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: palette.length > 3 ? palette[3] : palette[0] }}>
                    <span style={{ color: getContrastColor(palette.length > 3 ? palette[3] : palette[0]) }}>
                      Accent Element
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaletteDisplay 