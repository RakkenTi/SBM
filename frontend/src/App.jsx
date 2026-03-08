import { createSignal, onMount } from "solid-js";

function App() {
  const [backendMessage, setBackendMessage] = createSignal("Loading backend...");
  const [dbMessage, setDbMessage] = createSignal("Loading database...");

  onMount(async () => {
    try {
      const backendRes = await fetch("http://localhost:5000/");
      const backendText = await backendRes.text();
      setBackendMessage(backendText);
    } catch {
      setBackendMessage("Backend not reachable");
    }

    try {
      const dbRes = await fetch("http://localhost:5000/db-status");
      const dbText = await dbRes.text();
      setDbMessage(dbText);
    } catch {
      setDbMessage("Database not reachable");
    }
  });

  return (
    <div class="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div class="bg-zinc-800 p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-lg">
        <h1 class="text-3xl font-bold">Baseplate Working</h1>
        <p class="text-lg">Frontend working</p>
        <p class="text-lg">{backendMessage()}</p>
        <p class="text-lg">{dbMessage()}</p>
      </div>
    </div>
  );
}

export default App;