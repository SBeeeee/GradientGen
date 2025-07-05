"use client"
import {react,useEffect,useState} from "react"
import { Copy, CheckCircle2,Heart,Download } from "lucide-react";

const GradientCard = ({ gradient, isDark }) => {
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCopy = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
      <div
        className="w-full h-64 relative flex items-center justify-center"
        style={{ background: gradient.css }}
      >
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
            {gradient.name}
          </h3>
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
            {gradient.type} gradient
          </div>
        </div>

        {/* Hover overlay with controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
          <div className="space-y-3">
            <div className="flex space-x-2">
              <button
                className="cursor-pointer flex-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 text-sm font-medium flex items-center justify-center transition-all duration-300 hover:scale-105"
                onClick={() => handleCopy(`background: ${gradient.css};`, setCopiedCss)}
              >
                {copiedCss ? (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                CSS
              </button>
              <button
                className="cursor-pointer flex-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 text-sm font-medium flex items-center justify-center transition-all duration-300 hover:scale-105"
                onClick={() => handleCopy(`className=\"${gradient.tailwind}\"`, setCopiedTailwind)}
              >
                {copiedTailwind ? (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Tailwind
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                className="cursor-pointer flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 hover:scale-105"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <Heart className="h-4 w-4 mr-2 fill-current" />
                ) : (
                  <Heart className="h-4 w-4 mr-2" />
                )}
                {isFavorite ? 'Favorited' : 'Favorite'}
              </button>
              <button className="cursor-pointer bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30 transition-all duration-300 hover:scale-105">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard
