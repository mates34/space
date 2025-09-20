import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Features from "./sections/Features/Features";
import Chains from "./sections/Chains/Chains";
import Navbar from "./components/Layout/Navbar";
import "./styles/base/globals.scss";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Hero />
        <About />
        <Features />
        <Chains />
      </main>
    </div>
  );
}

export default App;
