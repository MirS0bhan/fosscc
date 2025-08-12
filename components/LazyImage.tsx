"use client"

import { useState, useRef, useEffect } from "react"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "/placeholder.svg?height=200&width=300",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder}
      alt={alt}
      width={width}
      height={height}
      className={`lazy-load optimized-image ${isLoaded ? "loaded" : ""} ${className}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
    />
  )
}
