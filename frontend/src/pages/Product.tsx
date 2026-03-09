import { createSignal, createMemo, For, Show } from 'solid-js'
import ProfilePicture from '../components/profile_picture'
import NavButton from '../components/nav_button'
import StatCard from '../components/stat_card'
import Line from '../components/line'
import SubHeader from '../components/SubHeader'
import BurndownChart from '../components/burndown_chart'

const navbar_buttons = [
    { name: 'Dashboard', icon: '' },
    { name: 'Product Backlog', icon: '' },
    { name: 'Sprint Backlog', icon: '' },
]

const [tab, setTab] = createSignal(navbar_buttons[0].name)
const StatCards = [
    <StatCard header="Product Owner" value="Bob" />,
    <StatCard
        header="Sprints Completed"
        value="5"
        value_classes="text-green-500"
    />,
    <StatCard header="Sprints Left" value="67" value_classes="text-red-500" />,
    <StatCard
        header="Product Backlog"
        value="500 Items"
        value_classes="text-orange-500"
    />,
    <StatCard
        header="Sprint Backlog"
        value="200 Items"
        value_classes="text-orange-500"
    />,
    <StatCard
        header="Days Remaining (Sprint)"
        value="24 days"
        value_classes="text-slate-500"
    />,
    <StatCard
        header="Days Remaining (Product)"
        value="80 days"
        value_classes="text-slate-500"
    />,
]
function Product() {
    return (
        <div class="min-h-screen bg-slate-100 flex flex-col">
            <header class="z-10 sticky w-full inset-x-0 top-0 bg-cyan-500 shadow-xl flex flex-col">
                <div class="flex w-full justify-center md:justify-between p-8 pl-12 pr-12">
                    <h1 class="text-4xl text-white font-bold tracking-tight">
                        Product Name
                    </h1>
                    <div class="hidden md:block">
                        <ProfilePicture />
                    </div>
                </div>
                <nav class="w-full bg-cyan-200 p-6 md:p-8 shadow-xl gap-4 text-center md:gap-16 flex justify-center">
                    <For each={navbar_buttons}>
                        {(item) => (
                            <NavButton
                                label={item.name}
                                icon={item.icon}
                                selected={() => tab()}
                                callback={() => {
                                    console.log(item.name)
                                    setTab(item.name)
                                }}
                            />
                        )}
                    </For>
                </nav>
            </header>

            {/* Dashboard */}
            <Show when={tab() === 'Dashboard'}>
                <main class="min-h-screen flex flex-col z-0">
                    <SubHeader label="Welcome, User" />
                    <Line />
                    <div class="pt-10 text-center justify-center flex flex-col md:flex-row gap-4 md:gap-8 p-4 w-full">
                        <StatCard
                            header="Level"
                            value="Product Owner"
                            value_classes="text-slate-600"
                        />
                        <StatCard
                            header="Assigned Sprint"
                            value="THE Sprint."
                        />
                    </div>

                    <SubHeader label="Burndown Analytics" />
                    <Line />
                    <div class="p-4 flex flex-col md:flex-row justify-center gap-12">
                        <BurndownChart
                            type="line"
                            data={[
                                {
                                    label: 'Sample Label',
                                    data: [12, 152, 161, 41, 42, 50],
                                    borderColor: '#06b6d4',
                                    tension: 0.4,
                                },
                                {
                                    label: 'Sample Label 2',
                                    data: [51, 42, 150, 122, 24, 80],
                                    borderColor: '#bb5cf6',
                                    tension: 0.4,
                                },
                            ]}
                            labels={[
                                'Label 1',
                                'Label 2',
                                'Label 3',
                                'Label 4',
                                'Label 5',
                                'Label 6',
                            ]}
                        />
                        <BurndownChart
                            type="bar"
                            data={[
                                {
                                    label: 'Sample Label',
                                    data: [12, 152, 161, 41, 42, 50],
                                    borderColor: '#06b6d4',
                                    backgroundColor: '#06b6d4',
                                },
                                {
                                    label: 'Sample Label 2',
                                    data: [51, 42, 150, 122, 24, 80],
                                    borderColor: '#bb5cf6',
                                    backgroundColor: '#FF5C00',
                                },
                            ]}
                            labels={[
                                'Label 1',
                                'Label 2',
                                'Label 3',
                                'Label 4',
                                'Label 5',
                                'Label 6',
                            ]}
                        />
                    </div>

                    <SubHeader label="Stats" />
                    <Line class="bg-orange-400" />
                    <div class="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                        <For each={StatCards}>
                            {(item, i) => (
                                <div
                                    class="animate-slide-up opacity-0"
                                    style={{
                                        'animation-delay': `${i() * 100}ms`,
                                    }}
                                >
                                    {item}
                                </div>
                            )}
                        </For>
                    </div>
                </main>
            </Show>
        </div>
    )
}

export default Product
