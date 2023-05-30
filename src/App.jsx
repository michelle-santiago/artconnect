import "./App.css";
import { CurrentUserProvider } from "./utils/providers/CurrentUserProvider";
import Router from "./Router";
import { CommissionsProvider } from "./utils/providers/CommissionsProvider";
function App() {
	return (
		<CurrentUserProvider>
			<CommissionsProvider>
				<Router/>
			</CommissionsProvider>
		</CurrentUserProvider>
	);
}

export default App;
