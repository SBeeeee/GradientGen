// ColorPicker.js
"use client"
import { useEffect, useState } from "react";
import { colorNames } from "@/utils/helper";
import { Palette } from "lucide-react";

const ColorPicker = ({ value, onChange, isDark, index }) => {
  const [hex, setHex] = useState(value);
  const [showPicker, setShowPicker] = useState(false);
  const [colorInput, setColorInput] = useState('');
  const [showPresets, setShowPresets] = useState(false);

  const presetColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3',
    '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#EE5A24', '#0A3D62',
    '#C44569', '#F8B500', '#6C5CE7', '#A29BFE', '#FD79A8', '#E17055'
  ];

  useEffect(() => {
    setHex(value);
  }, [value]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setHex(newColor);
    onChange(newColor);
  };

  const handleHexChange = (e) => {
    const newHex = e.target.value;
    setHex(newHex);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newHex)) {
      onChange(newHex);
    }
  };

  const handleColorNameInput = (e) => {
    const input = e.target.value.toLowerCase();
    setColorInput(input);
    if (colorNames[input]) {
      const color = colorNames[input];
      setHex(color);
      onChange(color);
    }
  };

  const handlePresetClick = (color) => {
    setHex(color);
    onChange(color);
    setShowPicker(false);
  };

  return (
    <div className="relative group">
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
        <button
          className="relative h-12 w-12 rounded-xl shadow-lg border-3 border-white hover:scale-110 transition-transform duration-300"
          style={{ 
            backgroundColor: hex,
            boxShadow: `0 0 20px ${hex}40`
          }}
          onClick={() => setShowPicker(!showPicker)}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        </button>
        
        <div className="flex-1">
          <input
            type="text"
            value={hex}
            onChange={handleHexChange}
            className={`w-full text-center border-2 rounded-lg px-3 py-2 font-mono text-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
              isDark 
                ? "bg-gray-800 text-white border-gray-600 focus:border-purple-400" 
                : "bg-white text-black border-gray-300 focus:border-purple-500"
            }`}
            placeholder="#FF6B6B"
          />
          <input
            type="text"
            value={colorInput}
            onChange={handleColorNameInput}
            className={`w-full text-center border-2 rounded-lg px-3 py-1 text-xs mt-1 transition-all duration-300 focus:ring-2 focus:ring-pink-500 ${
              isDark 
                ? "bg-gray-800 text-white border-gray-600 focus:border-pink-400" 
                : "bg-white text-black border-gray-300 focus:border-pink-500"
            }`}
            placeholder="red, blue, etc."
          />
        </div>
      </div>

      {showPicker && (
        <div className={`absolute top-full left-0 z-50 mt-2 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
          isDark 
            ? "bg-gray-900/95 border-gray-700 text-white" 
            : "bg-white/95 border-gray-200 text-black"
        }`}>
          <div className="space-y-4">
            <input
              type="color"
              value={hex}
              onChange={handleColorChange}
              className="w-32 h-32 rounded-xl cursor-pointer border-0 shadow-lg"
            />
            
            <div className="space-y-2">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Palette className="h-4 w-4" />
                <span>Preset Colors</span>
              </button>
              
              {showPresets && (
                <div className="grid grid-cols-6 gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {presetColors.map((color, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-lg border-2 border-white hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: color }}
                      onClick={() => handlePresetClick(color)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ColorPicker;
