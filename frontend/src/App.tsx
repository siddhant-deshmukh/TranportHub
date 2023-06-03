import { useContext } from "react"
import AppContext from "./AppContext"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Auth from "./components/auth"

function App() {
  const { user, authLoading } = useContext(AppContext)

  if(authLoading){
    return <div className="w-screen h-screen">
     
    </div>
  } else if(user){
    return <div className="max-w-7xl mx-auto">
      <NavBar />
      {
        JSON.stringify(user)
      }
    </div>
  }
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <Auth />
    </div>
  )
}

export default App
