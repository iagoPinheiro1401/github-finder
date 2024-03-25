import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">GitHub Finder</h1>
      <Outlet/>
    </div>
  )
}

export default App
