import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">
          <h1>WILD SERIES</h1>
        </Link>
        <Link to="/programs">
          <h2>Séries</h2>
        </Link>
        <Link to="/categories">
          <h2>Catégories</h2>
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
