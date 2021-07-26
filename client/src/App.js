import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fib from "./Fib";
import nextPage from "./nextPage";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <h1 className="App-title">Fibonacci Calculator</h1>
          <Link to="/">Home</Link>
          <br/>
          <Link to="/nextpage">Next Page</Link>
          <hr/>
          <Route exact path="/" component={Fib} />
          <Route path="/nextpage" component={nextPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
