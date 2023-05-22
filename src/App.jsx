import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./hooks/UserContext";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import MessagePage from "./pages/Message";
import ProtectedRoutes from "./components/services/ProtectedRoutes";

function App() {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
        
					<Route path="/" element={<ProtectedRoutes />}>
						<Route path="/home" element={<HomePage />} />
            <Route path="/message" element={<MessagePage />} />
					</Route>
				</Routes>
			</UserContextProvider>
		</BrowserRouter>
	);
}

export default App;
