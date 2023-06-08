import "./App.css";
import { CurrentUserProvider } from "./utils/providers/CurrentUserProvider";
import Router from "./Router";
import { CommissionsProvider } from "./utils/providers/CommissionsProvider";
import { MessagesProvider } from "./utils/providers/MessagesProvider";
function App() {
	return (
		<CurrentUserProvider>
			<CommissionsProvider>
				<MessagesProvider>
					<Router/>
				</MessagesProvider>
				</CommissionsProvider>
		</CurrentUserProvider>
	);
}

export default App;
