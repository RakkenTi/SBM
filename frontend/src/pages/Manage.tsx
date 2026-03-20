import { Component, createMemo, createSignal, For } from 'solid-js'
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
    <StatCard
        header="Sprints Left"
        value={`${productData()?.sprintLeft}`}
        value_classes="text-red-500"
    />,
    <StatCard
        header="Product Backlog"
        value={`${productData()?.PBLItems?.length}`}
        value_classes="text-orange-500"
    />,
    <StatCard
        header="Days Remaining (Sprint)"
        value={`${productData()?.daysRemSprint} days`}
        value_classes="text-slate-500"
    />,
    <StatCard
        header="Days Remaining (Product)"
        value={`${productData()?.daysRemProduct} days`}
        value_classes="text-slate-500"
    />,
]

const Management: Component<ProductPageSubpage> = (props) => {
    setProductData(props.data)

    const userLevels = createMemo(() => {
        const data: userLevels = productData()?.userLevels
        return data ? Object.entries(data) : []
    })

    return (
        <div class="z-0 flex min-h-screen flex-col">
            <div class="pt-10"></div>
            <SubHeader label={`Management`} class="text-5xl" />
            <Line />
            <SubHeader label="Burndown Chart" />
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

            <SubHeader label="Team" />
            <Line class="bg-pink-400" />
            <div class="flex w-full flex-wrap justify-center gap-8 p-20 pt-10">
                <For each={userLevels()}>
                    {([key, value], i) => (
                        <div
                            class="animate-slide-up w-1/2 opacity-0 md:w-1/4"
                            style={{
                                'animation-delay': `${i() * 100}ms`,
                            }}
                        >
                            <StatCard header={key} value={value} />
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default Management
