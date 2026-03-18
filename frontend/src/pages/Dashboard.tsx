import { Component, createSignal, For } from 'solid-js'
import Line from '../components/line'
import SubHeader from '../components/subheader'
import StatCard from '../components/stat_card'
import BurndownChart from '../components/burndown_chart'
import { clientData, ProductPageSubpage } from '../globals/client_data'
import { ProductSchemaType, userLevels } from '@shared/types'

const [productData, setProductData] = createSignal<ProductSchemaType>()

const StatCards = [
    <StatCard
        header="Product Owner"
        value={(() => {
            let owners = ''
            const userLevels: userLevels = productData()?.userLevels
            if (!userLevels) return ''
            for (const [userName, userLevel] of Object.entries(userLevels)) {
                if (userLevel === 'Product Owner') {
                    return userName
                }
            }
            return 'NONE (INVALID)'
        })()}
    />,
    <StatCard
        header="Sprints Completed"
        value={`${productData()?.sprintComplete}`}
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

const Dashboard: Component<ProductPageSubpage> = (props) => {
    setProductData(props.data)
    return (
        <div class="z-0 flex min-h-screen flex-col">
            <SubHeader
                label={`Welcome, ${clientData.userName}`}
                class="text-5xl"
            />
            <Line />
            <div class="flex w-full flex-col justify-center gap-4 p-4 pt-10 text-center md:flex-row md:gap-8">
                <StatCard
                    header="Level"
                    value={`${props.data?.userLevels[clientData.userName]}`}
                    value_classes="text-slate-600"
                />
                <StatCard
                    header="Assigned Sprint"
                    value={`${props.data?.assignedSprints?.[clientData.userID] || 'None'}`}
                />
            </div>

            <SubHeader label="Burndown Analytics" />
            <Line />
            <div class="flex flex-col justify-center gap-12 p-4 md:flex-row">
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
            <div class="flex w-full flex-wrap justify-center gap-8 p-20 pt-10">
                <For each={StatCards}>
                    {(item, i) => (
                        <div
                            class="animate-slide-up w-1/2 opacity-0 md:w-1/3"
                            style={{
                                'animation-delay': `${i() * 100}ms`,
                            }}
                        >
                            {item}
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default Dashboard
