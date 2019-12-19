import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main";
import Ace from "./components/Ace";

const Root = createStackNavigator({
  main: { screen: Main },
  ace: { screen: Ace }
});

const App = createAppContainer(Root);

export default App;
