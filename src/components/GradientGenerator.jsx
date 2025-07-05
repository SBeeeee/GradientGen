"use client"
import {react,useEffect,useState} from "react"

export default GradientGenerator = () => {
    const [gradientType, setGradientType] = useState("linear")
    const [colors, setColors] = useState(["#FF6B6B", "#FFD93D"])
    const [linearDirection, setLinearDirection] = useState("to right")
    const [radialDirection, setRadialDirection] = useState("circle at center")
    const [conicDirection, setConicDirection] = useState("from 90deg at 50% 50%")
    const [noiseEnabled, setNoiseEnabled] = useState(false)
    const [copiedCode, setCopiedCode] = useState(false)
    const [activeTab, setActiveTab] = useState("css")
  
    const currentDirection =
      gradientType === "linear" ? linearDirection : gradientType === "radial" ? radialDirection : conicDirection
  
    const currentCss = generateCssGradient(gradientType, colors, currentDirection)
    const currentTailwind = generateTailwindGradient(gradientType, colors, currentDirection)
  
    const handleColorChange = (index, newColor) => {
      const newColors = [...colors]
      newColors[index] = newColor
      setColors(newColors)
    }
  
    const addColor = () => {
      if (colors.length < 4) {
        setColors([...colors, "#CCCCCC"])
      }
    }
  
    const removeColor = (indexToRemove) => {
      if (colors.length > 2) {
        setColors(colors.filter((_, index) => index !== indexToRemove))
      }
    }
  
    const handleRandomize = () => {
      const numColors = Math.floor(Math.random() * 3) + 2
      const randomColors = Array.from({ length: numColors }, getRandomColor)
      setColors(randomColors)
  
      const linearDirections = ["to right", "to left", "to top", "to bottom", "to top right", "to bottom left"]
      const radialDirections = ["circle at center", "ellipse at top", "circle at top left"]
      const conicDirections = ["from 0deg at 50% 50%", "from 90deg at 50% 50%", "from 180deg at 50% 50%"]
  
      setLinearDirection(linearDirections[Math.floor(Math.random() * linearDirections.length)])
      setRadialDirection(radialDirections[Math.floor(Math.random() * radialDirections.length)])
      setConicDirection(conicDirections[Math.floor(Math.random() * conicDirections.length)])
  
      const types = ["linear", "radial", "conic"]
      setGradientType(types[Math.floor(Math.random() * types.length)])
    }
  
    const handleCopyCode = async (code) => {
      try {
        await navigator.clipboard.writeText(code)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  
    return (
      <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col space-y-6">
          <h3 className="text-2xl font-bold text-center md:text-left">Customize Your Gradient</h3>
  
          {/* Gradient Type Selection */}
          <div>
            <label className="mb-2 block text-lg font-medium">Gradient Type</label>
            <div className="flex flex-wrap gap-2">
              {["linear", "radial", "conic"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded border transition-colors ${
                    gradientType === type
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setGradientType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
  
          {/* Color Pickers */}
          <div>
            <label className="mb-2 block text-lg font-medium">Colors ({colors.length} of 4)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ColorPicker
                    value={color}
                    onChange={(c) => handleColorChange(index, c)}
                  />
                  {colors.length > 2 && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => removeColor(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
            {colors.length < 4 && (
              <button 
                onClick={addColor} 
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Add Color
              </button>
            )}
          </div>
  
          {/* Direction Selection */}
          <div>
            <label className="mb-2 block text-lg font-medium">Direction</label>
            {gradientType === "linear" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["to top", "to right", "to bottom", "to left", "to top right", "to bottom left"].map((dir) => (
                  <button
                    key={dir}
                    className={`px-3 py-2 rounded border text-sm transition-colors ${
                      linearDirection === dir
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setLinearDirection(dir)}
                  >
                    {dir.replace("to ", "")}
                  </button>
                ))}
              </div>
            )}
            {gradientType === "radial" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["circle at center", "ellipse at top", "circle at top left"].map((dir) => (
                  <button
                    key={dir}
                    className={`px-3 py-2 rounded border text-sm transition-colors ${
                      radialDirection === dir
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setRadialDirection(dir)}
                  >
                    {dir.replace("at ", "")}
                  </button>
                ))}
              </div>
            )}
            {gradientType === "conic" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["from 0deg at 50% 50%", "from 90deg at 50% 50%", "from 180deg at 50% 50%"].map((dir) => (
                  <button
                    key={dir}
                    className={`px-3 py-2 rounded border text-sm transition-colors ${
                      conicDirection === dir
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setConicDirection(dir)}
                  >
                    {dir.split(" ")[1]}
                  </button>
                ))}
              </div>
            )}
          </div>
  
          {/* Noise Toggle & Randomizer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="noise-toggle"
                checked={noiseEnabled}
                onChange={(e) => setNoiseEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="noise-toggle">Add Noise</label>
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center"
              onClick={handleRandomize}
            >
              <Shuffle className="h-4 w-4 mr-2" /> I'm Feeling Lucky 🌈
            </button>
          </div>
        </div>
  
        {/* Gradient Preview & Code Output */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-2xl font-bold text-center md:text-left">Live Preview</h3>
          <div
            className="w-full h-64 rounded-xl shadow-inner transition-all duration-300"
            style={{ 
              background: currentCss,
              backgroundImage: noiseEnabled ? 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.1"/%3E%3C/svg%3E")' : 'none'
            }}
          ></div>
  
          <div className="w-full">
            <div className="flex mb-4 border-b">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "css"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("css")}
              >
                CSS
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "tailwind"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tailwind")}
              >
                Tailwind CSS
              </button>
            </div>
            
            {activeTab === "css" && (
              <div className="relative">
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`background: ${currentCss};`}</code>
                </pre>
                <button
                  className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded"
                  onClick={() => handleCopyCode(`background: ${currentCss};`)}
                >
                  {copiedCode ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
            
            {activeTab === "tailwind" && (
              <div className="relative">
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`className="${currentTailwind}"`}</code>
                </pre>
                <button
                  className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded"
                  onClick={() => handleCopyCode(`className="${currentTailwind}"`)}
                >
                  {copiedCode ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  