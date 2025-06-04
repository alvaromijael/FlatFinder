import { AuthProvider } from "./auth/context/AuthContext"
import { AppRouter } from "./router/AppRouter"

export const App = () => {
  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
  )
}
