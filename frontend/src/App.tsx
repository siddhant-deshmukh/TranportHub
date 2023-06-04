import { useContext } from "react"
import AppContext from "./AppContext"
import NavBar from "./components/NavBar"
import Auth from "./components/auth"
import OrderDashboard from "./components/order"

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
      <OrderDashboard />
    </div>
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl text-center font-bold mt-5">
        TransportHub
      </h1>
      <Auth />
    </div>
  )
}

export default App
