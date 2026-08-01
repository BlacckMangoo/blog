export default function PlotFrame({ title, caption, children }) {
	return (
		<figure className="plot-frame">
			{title && <div className="plot-frame__title">{title}</div>}
			{children}
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
}
