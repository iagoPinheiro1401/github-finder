import { Outlet } from "react-router-dom"

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold">GitHub Finder</h1>
      <Outlet/>
    </div>
  )
}

export default App
