import { RotateCcw } from "lucide-react"

export default function Circle() {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#edecec',
      }}
      className="flex flex-col justify-center items-center"
    >
        <RotateCcw />
    </div>
  )
}