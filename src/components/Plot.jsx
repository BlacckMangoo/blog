import { useEffect, useRef } from 'react';
import PlotFrame from './PlotFrame';

export default function Plot({ title, caption, data, layout = {}, config = {} }) {
	const target = useRef(null);

	useEffect(() => {
		let disposed = false;
		let plotly;
		let observer;
		const node = target.current;

		const draw = (Plotly) => {
			const styles = getComputedStyle(document.documentElement);
			const gridcolor = styles.getPropertyValue('--plot-grid').trim();
			const zerolinecolor = styles.getPropertyValue('--plot-zero').trim();
			return Plotly.react(node, data, {
				paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
				font: { color: styles.getPropertyValue('--plot-font').trim(), family: 'Georgia, serif' },
				margin: { t: 24, r: 24, b: 48, l: 56 }, ...layout,
				xaxis: { gridcolor, zerolinecolor, ...layout.xaxis },
				yaxis: { gridcolor, zerolinecolor, ...layout.yaxis },
				scene: {
					bgcolor: 'transparent',
					xaxis: { gridcolor, zerolinecolor }, yaxis: { gridcolor, zerolinecolor }, zaxis: { gridcolor, zerolinecolor },
					...layout.scene,
				},
			}, { responsive: true, displaylogo: false, ...config });
		};

		import('plotly.js-dist-min').then(({ default: Plotly }) => {
			if (disposed || !node) return;
			plotly = Plotly;
			draw(Plotly);
			observer = new MutationObserver(() => draw(Plotly));
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
		});

		return () => {
			disposed = true;
			observer?.disconnect();
			if (plotly && node) plotly.purge(node);
		};
	}, [data, layout, config]);

	return <PlotFrame title={title} caption={caption}><div className="plot-frame__canvas" ref={target} /></PlotFrame>;
}
