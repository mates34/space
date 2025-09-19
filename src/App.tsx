import Hero from "./sections/Hero/Hero";
import Navbar from "./components/Layout/Navbar";
import "./styles/base/globals.scss";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Hero />
      </main>
    </div>
  );
}

export default App;
