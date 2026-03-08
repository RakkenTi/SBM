import { createSignal, onMount } from "solid-js";
import Portal from './pages/Portal.js'

const localURL = "http://localhost:5000"
const url = import.meta.env.VITE_EXPRESS_URL || localURL;

function App() {
  const [backendMessage, setBackendMessage] = createSignal("Loading backend...");
  const [dbMessage, setDbMessage] = createSignal("Loading database...");

  onMount(async () => {
    try {
      const backendRes = await fetch(url);
      const backendText = await backendRes.text();
      setBackendMessage(backendText);
    } catch {
      setBackendMessage("Backend not reachable");
    }

    try {
      const dbRes = await fetch(url);
      const dbText = await dbRes.text();
      setDbMessage(dbText);
    } catch {
      setDbMessage("Database not reachable");
    }
  });

  return (
    <div class="font-['Inter']">
      <Portal/>
    </div>
  );
}

export default App;