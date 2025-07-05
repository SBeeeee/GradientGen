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
  
  