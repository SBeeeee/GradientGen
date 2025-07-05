"use client"
import {react,useEffect,useState} from "react"


const ColorPicker = ({ value, onChange }) => {
    const [hex, setHex] = useState(value)
    const [showPicker, setShowPicker] = useState(false)
  
    useEffect(() => {
      setHex(value)
    }, [value])
  
    const handleColorChange = (e) => {
      const newColor = e.target.value
      setHex(newColor)
      onChange(newColor)
    }
  
    const handleHexChange = (e) => {
      const newHex = e.target.value
      setHex(newHex)
      if (/^#([0-9A-F]{3}){1,2}$/i.test(newHex)) {
        onChange(newHex)
      }
    }
  
    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            className="h-8 w-8 rounded-full border-2 border-gray-300 cursor-pointer"
            style={{ backgroundColor: hex }}
            onClick={() => setShowPicker(!showPicker)}
          />
          {showPicker && (
            <div className="absolute top-10 left-0 z-10 bg-white p-2 border rounded-lg shadow-lg">
              <input 
                type="color" 
                value={hex} 
                onChange={handleColorChange} 
                className="w-24 h-24 cursor-pointer border-0" 
              />
              <input 
                type="text" 
                value={hex} 
                onChange={handleHexChange} 
                className="mt-2 w-24 text-center border rounded px-1 py-1" 
                maxLength={7} 
              />
            </div>
          )}
        </div>
        <input 
          type="text" 
          value={hex} 
          onChange={handleHexChange} 
          className="w-24 text-center border rounded px-2 py-1" 
          maxLength={7} 
        />
      </div>
    )
  }

  export default ColorPicker;