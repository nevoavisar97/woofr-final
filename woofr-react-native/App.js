import { Provider } from "react-redux";
import RootNavigation from "./src/Navigation/root-navigation";
import store from "./src/redux/store";
import { I18nManager } from "react-native";

export default function App() {
  // Ensure RTL direction is set
  I18nManager.forceRTL(true);
  I18nManager.isRTL = true;
  

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
