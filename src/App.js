import "./App.css";
import Header from "./header";
import FlightTime from "./time-calc";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <FlightTime />
      </main>
    </div>
  );
}

export default App;
