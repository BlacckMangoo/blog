import { useEffect, useRef } from 'react';

export default function CanvasDemo({ title = 'Rotating triangle', subtitle = 'A lightweight canvas island.' }) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return undefined;
		}

		const context = canvas.getContext('2d');
		if (!context) {
			return undefined;
		}

		let animationFrame = 0;
		const devicePixelRatio = window.devicePixelRatio || 1;

		const resize = () => {
			const parent = canvas.parentElement;
			const width = parent ? parent.clientWidth : 640;
			const height = Math.max(240, Math.round(width * 0.56));

			canvas.width = Math.round(width * devicePixelRatio);
			canvas.height = Math.round(height * devicePixelRatio);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
		};

		const drawGrid = (width, height) => {
			context.save();
			context.strokeStyle = 'rgba(148, 163, 184, 0.12)';
			context.lineWidth = 1;

			for (let x = 0; x <= width; x += 32) {
				context.beginPath();
				context.moveTo(x, 0);
				context.lineTo(x, height);
				context.stroke();
			}

			for (let y = 0; y <= height; y += 32) {
				context.beginPath();
				context.moveTo(0, y);
				context.lineTo(width, y);
				context.stroke();
			}

			context.restore();
		};

		const draw = (time) => {
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const centerX = width * 0.5;
			const centerY = height * 0.5;
			const angle = time * 0.001;

			context.clearRect(0, 0, width, height);
			const background = context.createLinearGradient(0, 0, width, height);
			background.addColorStop(0, 'rgba(13, 19, 28, 1)');
			background.addColorStop(1, 'rgba(8, 12, 18, 1)');
			context.fillStyle = background;
			context.fillRect(0, 0, width, height);
			drawGrid(width, height);

			context.save();
			context.translate(centerX, centerY);
			context.rotate(angle);

			const vertices = [
				[0, -92],
				[84, 72],
				[-92, 68],
			];

			const fill = context.createLinearGradient(-96, -100, 96, 96);
			fill.addColorStop(0, 'rgba(158, 208, 255, 0.96)');
			fill.addColorStop(1, 'rgba(88, 214, 141, 0.9)');
			context.fillStyle = fill;
			context.strokeStyle = 'rgba(246, 250, 255, 0.95)';
			context.lineWidth = 2;

			context.beginPath();
			context.moveTo(vertices[0][0], vertices[0][1]);
			context.lineTo(vertices[1][0], vertices[1][1]);
			context.lineTo(vertices[2][0], vertices[2][1]);
			context.closePath();
			context.fill();
			context.stroke();

			context.restore();

			context.save();
			context.strokeStyle = 'rgba(158, 208, 255, 0.32)';
			context.lineWidth = 1.25;
			context.beginPath();
			context.moveTo(centerX, centerY);
			context.lineTo(centerX + Math.cos(angle) * 122, centerY + Math.sin(angle) * 122);
			context.stroke();
			context.restore();

			animationFrame = window.requestAnimationFrame(draw);
		};

		resize();
		const parent = canvas.parentElement;
		const observer = parent ? new ResizeObserver(resize) : null;
		if (observer && parent) {
			observer.observe(parent);
		}

		animationFrame = window.requestAnimationFrame(draw);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			observer?.disconnect();
		};
	}, []);

	return (
		<div className="canvas-demo">
			<div className="canvas-demo__header">
				<div>
					<p>{title}</p>
					<span>{subtitle}</span>
				</div>
			</div>
			<canvas ref={canvasRef} aria-label={title} role="img" />
		</div>
	);
}