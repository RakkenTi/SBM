import { Chart, ChartData, ChartDataset, ChartType } from 'chart.js/auto'
import { Component, onCleanup, onMount } from 'solid-js'

interface BurndownDataSet {
    label: string
    data: Array<number>
    borderColor: string
    tension: number
}

interface BurndownChartProps<T extends ChartType> {
    labels: Array<string>
    type: T
    data: Array<ChartDataset<T>>
}

const BurndownChart = <T extends ChartType>(props: BurndownChartProps<T>) => {
    let canvasRef: HTMLCanvasElement | undefined
    let chart: Chart | undefined
    onMount(() => {
        if (!canvasRef) return
        chart = new Chart(canvasRef, {
            type: props.type,
            data: {
                labels: props.labels,
                datasets: props.data,
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' } },
            },
        } as any)
    })

    onCleanup(() => chart?.destroy())

    return (
        <div class="transition-all duration-300 bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 border-2 border-gray-200 w-full max-w-2xl animate-slide-up">
            <canvas ref={canvasRef} />
        </div>
    )
}

export default BurndownChart
