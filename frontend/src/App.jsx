import { createSignal } from "solid-js";

function App() {
  const [name, setName] = createSignal("");
  const [value, setValue] = createSignal("");

  const saveItem = async () => {
    const response = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name(),
        value: Number(value()),
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Item saved");
  };

  return (
    <div class="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div class="bg-zinc-800 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h1 class="text-3xl font-bold">Save an Item</h1>

        <input
          class="w-full p-3 rounded-lg text-black"
          type="text"
          placeholder="Item name"
          value={name()}
          onInput={(e) => setName(e.target.value)}
        />

        <input
          class="w-full p-3 rounded-lg text-black"
          type="number"
          placeholder="Item value"
          value={value()}
          onInput={(e) => setValue(e.target.value)}
        />

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          onClick={saveItem}
        >
          Save to MongoDB
        </button>
      </div>
    </div>
  );
}

export default App;