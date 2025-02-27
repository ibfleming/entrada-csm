<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		DoughnutController,
		type ChartData
	} from 'chart.js';
	import { onMount } from 'svelte';

	// Register Chart.JS components
	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, DoughnutController);

	let { data } = $props();
	let chartElement: HTMLCanvasElement;
	let chart: ChartJS;
	let isChartLoading: boolean = $state(true);

	let leadCount: number = isNaN(data.leadCount) ? 0 : data.leadCount;
	let residentCount: number = isNaN(data.residentCount) ? 0 : data.residentCount;

	// Chart data
	const chartData: ChartData<'doughnut', number[], string> = {
		labels: ['Leads', 'Residents'],
		datasets: [
			{
				data: [leadCount, residentCount],
				backgroundColor: ['#fdba74', '#a5b4fc'],
				borderColor: ['#fb923c', '#818cf8'],
				borderWidth: 1,
				hoverBackgroundColor: ['#fb923c', '#818cf8']
			}
		]
	};

	// Chart options
	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			autoPadding: false,
			padding: 20
		},
		plugins: {
			legend: {
				display: false,
				position: 'bottom' as const,
				labels: {
					color: '#ffffff',
					font: {
						size: 12,
						family: 'Inter, sans-serif',
						weight: 'bold' as const
					},
					padding: 15
				}
			},
			title: {
				display: true,
				text: 'Distribution of Leads and Residents',
				color: '#ffffff',
				font: {
					family: 'Inter, sans-serif',
					size: 14,
					weight: 'bold' as const
				}
			},
			tooltip: {
				enabled: true,
				titleFont: {
					family: 'Inter, sans-serif'
				},
				bodyFont: {
					family: 'Inter, sans-serif'
				},
				titleAlign: 'left' as const,
				bodyAlign: 'left' as const,
				displayColors: false
			}
		},
		animation: {
			onComplete: function () {
				isChartLoading = false;
			}
		},
		cutout: '50%'
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			chart = new ChartJS(chartElement, {
				type: 'doughnut',
				data: chartData,
				options: chartOptions
			});
		}

		return () => {
			if (chart) {
				chart.destroy();
			}
		};
	});

	$effect(() => {
		if (chart) {
			chart.data.datasets[0].data = [leadCount, residentCount];
			chart.update();
		}
	});
</script>

<svelte:head>
	<title>Leasing CMS - Dashboard</title>
</svelte:head>

<div class="flex items-start justify-start gap-4 p-4">
	<div class="flex flex-col sm:flex-row">
		<Card.Root class="bg-primary">
			<Card.Content class="flex flex-col items-center justify-center p-0">
				{#if isChartLoading}
					<div class="absolute">
						<span class="loader"></span>
					</div>
				{/if}
				<canvas class={isChartLoading ? 'invisible' : 'visible'} bind:this={chartElement}></canvas>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="flex flex-col gap-4 sm:flex-row">
		<Card.Root class="bg-primary">
			<Card.Content class="flex flex-col items-center justify-center">
				<p class="text-8xl font-bold text-orange-300">{leadCount}</p>
				<p class="text-xl font-bold uppercase text-white">Total Leads</p>
			</Card.Content>
		</Card.Root>
		<Card.Root class="bg-primary">
			<Card.Content class="flex flex-col items-center justify-center">
				<p class="text-8xl font-bold text-indigo-300">{residentCount as number}</p>
				<p class="text-xl font-bold uppercase text-white">Total Residents</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
