export const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

export  const generateCssGradient = (type, colors, direction) => {
    if (type === "linear") {
      return `linear-gradient(${direction}, ${colors.join(", ")})`
    } else if (type === "radial") {
      return `radial-gradient(${direction}, ${colors.join(", ")})`
    } else if (type === "conic") {
      return `conic-gradient(${direction}, ${colors.join(", ")})`
    }
    return ""
  }
  
export   const generateTailwindGradient = (type, colors, direction) => {
    const colorStops = colors
      .map((color, index) => {
        if (index === 0) return `from-[${color}]`
        if (index === colors.length - 1) return `to-[${color}]`
        return `via-[${color}]`
      })
      .join(" ")
  
    if (type === "linear") {
      const tailwindDirection = direction.replace("to ", "to-").replace(" ", "-")
      return `bg-gradient-${tailwindDirection} ${colorStops}`
    } else if (type === "radial") {
      return `bg-[radial-gradient(${direction},${colors.join(",")})]`
    } else if (type === "conic") {
      return `bg-[conic-gradient(${direction},${colors.join(",")})]`
    }
    return ""
  }
  
export const colorNames = {
    red: '#FF0000', blue: '#0000FF', green: '#00FF00', yellow: '#FFFF00',
    purple: '#800080', pink: '#FFC0CB', orange: '#FFA500', cyan: '#00FFFF',
    magenta: '#FF00FF', lime: '#00FF00', navy: '#000080', teal: '#008080',
    maroon: '#800000', olive: '#808000', silver: '#C0C0C0', gray: '#808080',
    black: '#000000', white: '#FFFFFF', gold: '#FFD700', coral: '#FF7F50',
    salmon: '#FA8072', crimson: '#DC143C', violet: '#8A2BE2', indigo: '#4B0082',
    turquoise: '#40E0D0', chocolate: '#D2691E', khaki: '#F0E68C', lavender: '#E6E6FA'
  };  