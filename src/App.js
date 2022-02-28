import Card from "./components/Card/Card";
import { Provider } from 'react-redux'
import { store } from './features/store'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Card />
      </div>
    </Provider>
  );
}

export default App;
