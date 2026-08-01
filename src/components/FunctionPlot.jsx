import { useEffect, useRef } from 'react';
import PlotFrame from './PlotFrame';

export default function FunctionPlot({ title, caption, functions, xDomain = [-10, 10], yDomain }) {
	const target = useRef(null);

	useEffect(() => {
		let disposed = false;
		let observer;
		let frame;

		const draw = async () => {
			const node = target.current;
			if (!node) return;
			const module = await import('function-plot');
			const plot = module.default?.default ?? module.default;
			if (disposed) return;

			node.replaceChildren();
			plot({
				target: node,
				width: node.clientWidth,
				height: Math.min(460, Math.max(280, node.clientWidth * 0.62)),
				xAxis: { domain: xDomain },
				yAxis: yDomain ? { domain: yDomain } : {},
				grid: true,
				data: functions,
			});
		};

		const scheduleDraw = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(draw);
		};
		scheduleDraw();
		observer = new ResizeObserver(scheduleDraw);
		observer.observe(target.current.parentElement ?? target.current);

		return () => {
			disposed = true;
			cancelAnimationFrame(frame);
			observer?.disconnect();
		};
	}, [functions, xDomain, yDomain]);

	return (
		<PlotFrame title={title} caption={caption}>
			<div className="plot-frame__canvas plot-frame__function" ref={target} />
		</PlotFrame>
	);
}
