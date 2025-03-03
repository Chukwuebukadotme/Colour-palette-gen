'use client'

import { useState, useEffect } from 'react'
import { colord, extend } from 'colord'
import harmoniesPlugin from 'colord/plugins/harmonies'
import namesPlugin from 'colord/plugins/names'
import a11yPlugin from 'colord/plugins/a11y'
import ColorPicker from '@/components/ColorPicker'
import PaletteDisplay from '@/components/PaletteDisplay'
import Header from '@/components/Header'

// Extend colord with plugins
extend([harmoniesPlugin, namesPlugin, a11yPlugin])

export default function Home() {
  const [baseColor, setBaseColor] = useState('#3b82f6') // Default blue color
  const [palette, setPalette] = useState<string[]>([])
  const [paletteType, setPaletteType] = useState<string>('analogous')

  // Generate palette when base color or palette type changes
  useEffect(() => {
    generatePalette()
  }, [baseColor, paletteType])

  const generatePalette = () => {
    const color = colord(baseColor)
    let newPalette: string[] = []

    switch (paletteType) {
      case 'analogous':
        newPalette = color.harmonies('analogous').map(c => c.toHex())
        break
      case 'complementary':
        newPalette = color.harmonies('complementary').map(c => c.toHex())
        break
      case 'triadic':
        newPalette = color.harmonies('triadic').map(c => c.toHex())
        break
      case 'tetradic':
        newPalette = color.harmonies('tetradic').map(c => c.toHex())
        break
      case 'monochromatic':
        // Generate 5 shades
        newPalette = [
          color.lighten(0.4).toHex(),
          color.lighten(0.2).toHex(),
          color.toHex(),
          color.darken(0.2).toHex(),
          color.darken(0.4).toHex()
        ]
        break
      case 'shades':
        // Generate 5 shades with different saturations
        newPalette = [
          color.saturate(0.3).lighten(0.2).toHex(),
          color.saturate(0.15).lighten(0.1).toHex(),
          color.toHex(),
          color.desaturate(0.15).darken(0.1).toHex(),
          color.desaturate(0.3).darken(0.2).toHex()
        ]
        break
      default:
        newPalette = color.harmonies('analogous').map(c => c.toHex())
    }

    setPalette(newPalette)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <Header />
      
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Choose Your Base Color</h2>
            <ColorPicker 
              color={baseColor} 
              onChange={setBaseColor} 
            />
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Palette Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['analogous', 'complementary', 'triadic', 'tetradic', 'monochromatic', 'shades'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPaletteType(type)}
                    className={`px-4 py-2 rounded-md capitalize transition-colors ${
                      paletteType === type 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Color Palette</h2>
            <PaletteDisplay palette={palette} />
          </div>
        </div>
      </div>
    </main>
  )
} 