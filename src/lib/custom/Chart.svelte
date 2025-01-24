<script lang="ts">
	import { arc, pie, type DefaultArcObject } from 'd3';
	import { scaleOrdinal } from 'd3';
	import { ascending, sort } from 'd3';
	import data from './chart_data';

	// Define the interface for your data
	interface DataPoint {
		location: string;
		type: string;
		value: string;
	}

	// State variables
	let el = $state<SVGGElement | null>(null);
	let width = $state<number>(0);
	let value = $state<string>('USA');
	const height = 340;

	// Computed values
	let countryData = $derived<DataPoint[]>(
		data
			? sort(
					data.filter((d: DataPoint) => d.location === value),
					(a: DataPoint, b: DataPoint) => ascending(parseFloat(b.value), parseFloat(a.value))
				)
			: []
	);

	const colorScale = scaleOrdinal<string>()
		.domain(['Beef', 'Pig', 'Poultry', 'Sheep'].sort(ascending))
		.range(['#A8a1ff', '#FFF84A', '#45FFC8', '#ff0266']);

	const pieGenerator = pie<DataPoint>().value((d) => parseFloat(d.value));
	let pieData = $derived(pieGenerator(countryData));

	const arcGenerator = arc()
		.innerRadius((0.6 * height) / 2.4)
		.outerRadius((0.85 * height) / 2.2)
		.padRadius(40)
		.cornerRadius(4);

	const labelArcs = arc()
		.innerRadius((0.96 * height) / 2)
		.outerRadius((0.96 * height) / 2);
</script>

<div class="chart-container flex flex-col items-center justify-around md:flex-row">
	<div class="svg-container w-[500px]" bind:clientWidth={width}>
		{#if width}
			<svg {width} {height} class="chart">
				<g
					bind:this={el}
					class="donut-container"
					transform="translate({width / 2 - 5} {height / 2 + 20})"
				>
					<!-- class={i} -->
					{#each pieData as d, i (d.data.type)}
						<path
							pointer-events="all"
							cursor="pointer"
							d={arcGenerator(d as unknown as DefaultArcObject)}
							stroke="none"
							stroke-width="2"
							fill={colorScale(d.data.type)}
						/>
						<!-- labels -->
						<text
							x="0"
							y="0"
							text-anchor="middle"
							font-size="0.8em"
							class="fill-primary"
							transform="translate({labelArcs
								.centroid(d as unknown as DefaultArcObject)
								.join(' ')})"
							>{d.data.type}
						</text>
						<text
							x="0"
							y="1.2em"
							text-anchor="middle"
							font-size="0.8em"
							font-weight="700"
							class="fill-primary"
							transform="translate({labelArcs
								.centroid(d as unknown as DefaultArcObject)
								.join(' ')})"
							>{d.data.value}
						</text>
					{/each}
				</g>
				<!-- chart title -->
				<g transform="translate({width / 2 - 5} {height / 2 + 20})">
					<text
						x="0"
						y="0.5em"
						font-weight="bold"
						text-anchor="middle"
						font-size="2em"
						class="fill-primary"
					>
					</text>
				</g>
			</svg>
		{/if}
	</div>
</div>
