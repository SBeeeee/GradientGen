"use client"
import {react,useEffect,useState} from "react"

export default GradientCard = ({ gradient }) => {
    const [copiedCss, setCopiedCss] = useState(false)
    const [copiedTailwind, setCopiedTailwind] = useState(false)
  
    const handleCopy = async (text, setter) => {
      try {
        await navigator.clipboard.writeText(text)
        setter(true)
        setTimeout(() => setter(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  
    return (
      <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div
          className="w-full h-48 flex items-center justify-center text-white text-lg font-bold"
          style={{ background: gradient.css }}
        >
          <div className="p-4 bg-black bg-opacity-30 rounded-lg backdrop-blur-sm">{gradient.name}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex space-x-2 mb-2">
            <button
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded border border-white border-opacity-30 text-sm flex items-center"
              onClick={() => handleCopy(gradient.css, setCopiedCss)}
            >
              {copiedCss ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              CSS
            </button>
            <button
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded border border-white border-opacity-30 text-sm flex items-center"
              onClick={() => handleCopy(gradient.tailwind, setCopiedTailwind)}
            >
              {copiedTailwind ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              Tailwind
            </button>
          </div>
          <button
            className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded border border-white border-opacity-30 text-sm"
            disabled
          >
            ⭐ Save to Favorites
          </button>
        </div>
      </div>
    )
  }