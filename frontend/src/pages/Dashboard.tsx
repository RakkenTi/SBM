import { createSignal, createMemo, For, Show } from "solid-js";
import ProfilePicture from "../components/profile_picture";
import NavButton from "../components/nav_button";
import StatCard from "../components/stat_card";

const navbar_buttons = [
    {name: "Dashboard", icon: ""},
    {name: "Product Backlog", icon: ""},
    {name: "Sprint Backlog", icon: ""}
]

const [tab, setTab] = createSignal(navbar_buttons[0].name);

function Dashboard() {
    return ( 
        <div class="min-h-screen bg-slate-100 flex flex-col">
            <header class="sticky w-full inset-x-0 top-0 bg-cyan-500 shadow-xl flex flex-col">
                <div class="flex justify-between p-8 pl-12 pr-12">
                        <h1 class="text-3xl text-white font-bold tracking-tight">Project Name</h1>
                    <ProfilePicture/>
                </div>
                <nav class="w-full bg-cyan-200 p-8 shadow-xl gap-16 flex justify-center">
                    <For each={navbar_buttons}>
                        {(item) => (
                            <NavButton label={item.name} icon={item.icon} selected={() => tab()} callback={() => {
                                console.log(item.name)
                                setTab(item.name)
                            }} />
                        )}
                    </For>
                </nav>
            </header>

            {/* Dashboard */}
            <main class="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                <StatCard header="Welcome" value="John" value_classes="text-slate-600"/>
                <StatCard header="Product Owner" value="Bob" />
                <StatCard header="Sprints Completed" value="5" value_classes="text-green-500"/>
                <StatCard header="Sprints Left" value="67" value_classes="text-red-500"/>
                <StatCard header="Assigned Sprint" value="THE Sprint."/>
                <StatCard header="Product Backlog" value="500 Items" value_classes="text-orange-500"/>
                <StatCard header="Sprint Backlog" value="200 Items" value_classes="text-orange-500"/>
                <StatCard header="Days Remaining (Sprint)" value="24 days" value_classes="text-slate-500"/>
                <StatCard header="Days Remaining (Product)" value="80 days" value_classes="text-slate-500"/>
            </main>
        </div>
    );
}

export default Dashboard;