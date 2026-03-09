import { createSignal, onMount } from "solid-js";
import { url } from "./modules/client_config";
import Portal from './pages/Portal.js'
import { Route, Router } from "@solidjs/router";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div class="font-['Inter']">
          <Router>
                <Route path="/" component={Portal}/>
                <Route path="/dashboard" component={Dashboard}></Route>
          </Router>
    </div>
  );
}

export default App;