"use client"
import { Copy, Palette, Shuffle, Sun, Moon, Sparkles, CheckCircle2 } from "lucide-react"
import { useState,react } from "react";
import ThemeToggle from "./ThemeToggle";
import GradientGenerator from "./GradientGenerator";
import GradientCard from "./GradientCard";
import ColorPicker from "./ColorPicker";
import { curatedGradients } from "@/utils/curatedgradients";
export default function GradientGen() {
    const [isDark, setIsDark] = useState(false)
  
    return (
      <div className={`min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
        isDark 
          ? "bg-gradient-to-br from-gray-900 to-gray-950 text-white" 
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}>
        <header className="w-full max-w-6xl flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            GradientGen 🌈
          </h1>
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        </header>
  
        {/* Hero Section */}
        <section className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl mb-16 p-8 md:p-12 text-center bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Unleash Your Inner Color Wizard!</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
              GradientGen is your go-to spot for crafting stunning, vibrant gradients. Whether you're a design pro or
              just playing around, we make it easy to find, create, and copy the perfect color blend for your next
              project.
            </p>
            <a href="#create-your-own">
              <button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg px-6 py-3 rounded-lg text-lg font-medium">
                🎨 Generate Your Dream Gradient
              </button>
            </a>
          </div>
        </section>
  
        {/* How it works Section */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`flex flex-col items-center p-6 ${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md`}>
              <Palette className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Choose or Create</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Pick from our curated library or dive into the generator to craft your own unique blend.
              </p>
            </div>
            <div className={`flex flex-col items-center p-6 ${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md`}>
              <Sparkles className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Generate & Preview</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Watch your gradient come to life instantly with our live preview.
              </p>
            </div>
            <div className={`flex flex-col items-center p-6 ${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md`}>
              <Copy className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. Copy & Use</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Grab the CSS or Tailwind CSS code with a single click and integrate it into your project.
              </p>
            </div>
          </div>
        </section>
  
        {/* Create Your Own Gradient Section */}
        <section id="create-your-own" className="w-full max-w-6xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Create Your Own Gradient</h2>
          <GradientGenerator />
        </section>
  
        {/* Curated Library Section */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Curated Gradient Library</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curatedGradients.map((gradient) => (
              <GradientCard key={gradient.id} gradient={gradient} />
            ))}
          </div>
        </section>
  
        <footer className={`w-full max-w-6xl text-center py-8 border-t mt-12 ${
          isDark ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-200"
        }`}>
          <p>&copy; {new Date().getFullYear()} GradientGen. Built with ❤️ by Shatadru.</p>
        </footer>
      </div>
    )
  }