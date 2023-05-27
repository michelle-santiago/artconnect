import "./App.css";
import { CurrentUserProvider } from "./utils/providers/CurrentUserProvider";
import Router from "./Router";

function App() {
	return (
		<CurrentUserProvider>
			<Router/>
		</CurrentUserProvider>
	);
}

export default App;
