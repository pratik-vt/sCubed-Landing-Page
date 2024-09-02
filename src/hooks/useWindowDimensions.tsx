import { useState, useEffect } from 'react'

interface WindowDimensions {
  width: number
  // height: number
}

function getWindowDimensions(): WindowDimensions {
  let width = 0
  // let height = 0
  if (typeof window !== 'undefined') {
    width = window.innerWidth
    // height = window.innerHeight
  }
  return {
    width,
    // height,
  }
}

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState({width:0})

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions
