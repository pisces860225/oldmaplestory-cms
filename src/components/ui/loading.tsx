"use client"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Loading({ size = "md", className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* 外圈 */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-300/30 border-t-blue-500 animate-spin`}></div>
        {/* 内圈 */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === "lg" ? "h-6 w-6" : size === "md" ? "h-4 w-4" : "h-2 w-2"} rounded-full border-2 border-gray-300/50 border-b-orange-500 animate-spin`} style={{animationDirection: "reverse", animationDuration: "0.8s"}}></div>
      </div>
    </div>
  )
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <Loading size="lg" />
        <p className="text-white mt-4 text-center">載入中...</p>
      </div>
    </div>
  )
}
