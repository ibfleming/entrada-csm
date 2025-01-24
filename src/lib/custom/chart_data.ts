const csv = `location,type,value
USA,LEADS,256
USA,RESIDENTS,128
USA,NOTICE,64`;

const data = csv
	.split('\n')
	.slice(1)
	.map((str) => {
		const [location, type, value] = str.split(',');
		return { location, type, value: parseFloat(value).toFixed(1) };
	});

const chartData = [
	{
		location: 'USA',
		type: 'LEADS',
		value: '256'
	},
	{
		location: 'USA',
		type: 'RESIDENTS',
		value: '128'
	},
	{
		location: 'USA',
		type: 'NOTICE',
		value: '64'
	}
];

export default chartData;
