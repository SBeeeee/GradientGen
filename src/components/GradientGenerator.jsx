"use client";
import { useState } from "react";
import { getRandomColor, generateCssGradient, generateTailwindGradient } from "@/utils/helper";
import ColorPicker from "./ColorPicker";
import {Palette, 
  Sparkles, 
  RefreshCw, 
  Wand2, 
  Zap, 
  Trash2, 
  Plus, 
  Eye, 
  Copy, 
  CheckCircle2 } from "lucide-react";

const GradientGenerator = ({ isDark }) => {
  const [gradientType, setGradientType] = useState("linear");
  const [colors, setColors] = useState(["#FF6B6B", "#FFD93D"]);
  const [linearDirection, setLinearDirection] = useState("to right");
  const [radialDirection, setRadialDirection] = useState("circle at center");
  const [conicDirection, setConicDirection] = useState("from 90deg at 50% 50%");
  const [noiseEnabled, setNoiseEnabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("css");
  const [animationEnabled, setAnimationEnabled] = useState(false);

  const currentDirection =
    gradientType === "linear"
      ? linearDirection
      : gradientType === "radial"
      ? radialDirection
      : conicDirection;

  const currentCss = generateCssGradient(gradientType, colors, currentDirection);
  const currentTailwind = generateTailwindGradient(gradientType, colors, currentDirection);

  const handleColorChange = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, getRandomColor()]);
    }
  };

  const removeColor = (indexToRemove) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleRandomize = () => {
    const numColors = Math.floor(Math.random() * 4) + 2;
    const randomColors = Array.from({ length: numColors }, getRandomColor);
    setColors(randomColors);

    const linearDirections = ["to right", "to left", "to top", "to bottom", "to top right", "to bottom left"];
    const radialDirections = ["circle at center", "ellipse at top", "circle at top left"];
    const conicDirections = ["from 0deg at 50% 50%", "from 90deg at 50% 50%", "from 180deg at 50% 50%"];

    setLinearDirection(linearDirections[Math.floor(Math.random() * linearDirections.length)]);
    setRadialDirection(radialDirections[Math.floor(Math.random() * radialDirections.length)]);
    setConicDirection(conicDirections[Math.floor(Math.random() * conicDirections.length)]);

    const types = ["linear", "radial", "conic"];
    setGradientType(types[Math.floor(Math.random() * types.length)]);
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const noiseSvg = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E\")";

  const combinedBackgroundImage = noiseEnabled ? `${currentCss}, ${noiseSvg}` : currentCss;

  return (
    <div className={`relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
      isDark 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700" 
        : "bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200"
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5" />
      
      <div className="relative grid lg:grid-cols-2 gap-8 p-8">
        {/* Customizer Section */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Customize Your Gradient
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create stunning gradients with our advanced tools
            </p>
          </div>

          {/* Gradient Type */}
          <div className="space-y-4">
            <label className="text-lg font-semibold flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Gradient Type</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["linear", "radial", "conic"].map((type) => (
                <button
                  key={type}
                  className={`relative px-4 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    gradientType === type
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                      : `${isDark ? "bg-gray-800 border-gray-600 text-white hover:border-purple-400" : "bg-white border-gray-300 text-black hover:border-purple-500"} hover:shadow-md`
                  }`}
                  onClick={() => setGradientType(type)}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Pickers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Colors ({colors.length} of 5)</span>
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={addColor}
                  disabled={colors.length >= 5}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1 transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm font-medium w-8">#{index + 1}</span>
                  <div className="flex-1">
                    <ColorPicker 
                      value={color} 
                      onChange={(c) => handleColorChange(index, c)} 
                      isDark={isDark}
                      index={index}
                    />
                  </div>
                  {colors.length > 2 && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105"
                      onClick={() => removeColor(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-4">
            <label className="text-lg font-semibold flex items-center space-x-2">
              <RefreshCw className="h-5 w-5" />
              <span>Direction</span>
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {(gradientType === "linear"
                ? ["to top", "to right", "to bottom", "to left", "to top right", "to bottom left"]
                : gradientType === "radial"
                ? ["circle at center", "ellipse at top", "circle at top left"]
                : ["from 0deg at 50% 50%", "from 90deg at 50% 50%", "from 180deg at 50% 50%"]
              ).map((dir) => (
                <button
                  key={dir}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    currentDirection === dir
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                      : `${isDark ? "bg-gray-800 border-gray-600 text-white hover:border-purple-400" : "bg-white border-gray-300 text-black hover:border-purple-500"} hover:shadow-md`
                  }`}
                  onClick={() =>
                    gradientType === "linear"
                      ? setLinearDirection(dir)
                      : gradientType === "radial"
                      ? setRadialDirection(dir)
                      : setConicDirection(dir)
                  }
                >
                  {dir.replace("to ", "").replace("at ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Special Effects */}
          <div className="space-y-4">
            <label className="text-lg font-semibold flex items-center space-x-2">
              <Wand2 className="h-5 w-5" />
              <span>Special Effects</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 transition-all duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noiseEnabled}
                  onChange={(e) => setNoiseEnabled(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="font-medium">Add Noise</span>
              </label>
              <label className="flex items-center space-x-3 p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 transition-all duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={animationEnabled}
                  onChange={(e) => setAnimationEnabled(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="font-medium">Animation</span>
              </label>
            </div>
          </div>

          {/* Random Button */}
          <button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={handleRandomize}
          >
            <Zap className="h-5 w-5" />
            <span>I'm Feeling Lucky! 🎲</span>
          </button>
        </div>

        {/* Preview + Code Section */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Live Preview
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              See your gradient come to life
            </p>
          </div>

          {/* Preview */}
          <div className="relative group">
            <div
              className={`w-full h-80 rounded-2xl shadow-2xl border-4 border-white dark:border-gray-700 transition-all duration-500 ${
                animationEnabled ? 'animate-pulse' : ''
              }`}
              style={{
                backgroundImage: combinedBackgroundImage,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-white/10" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-4">
            <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {["css", "tailwind"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-700 text-black dark:text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "css" ? "CSS" : "Tailwind CSS"}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <pre className={`p-4 rounded-xl text-sm overflow-x-auto border-2 ${
                isDark 
                  ? "bg-gray-900 text-white border-gray-700" 
                  : "bg-gray-50 text-black border-gray-200"
              }`}>
                <code>
                  {activeTab === "css"
                    ? `background: ${currentCss};`
                    : `className="${currentTailwind}"`}
                </code>
              </pre>
              <button
                className="absolute top-3 right-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:scale-105"
                onClick={() =>
                  handleCopyCode(
                    activeTab === "css"
                      ? `background: ${currentCss};`
                      : `className="${currentTailwind}"`
                  )
                }
              >
                {copiedCode ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
