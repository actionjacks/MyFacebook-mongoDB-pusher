import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";
import Login from "./components/Login";

import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {user ? (
        <>
          <Header />

          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widget />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
