import React from "react";

function r(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function generateStars(count: number) {
	return Array.from({ length: count }, () => ({
		x: r(0, 100),
		y: r(0, 100),
		s: Math.random() > 0.85 ? 2 : Math.random() > 0.5 ? 1.5 : 1,
		o: r(0.2, 0.6),
		d: r(2, 6),
		delay: r(0, 4),
	}));
}

const STARS = generateStars(20);

export default function StarField() {
	return (
		<div
			className='fixed inset-0 pointer-events-none z-0'
			aria-hidden>
			<style>{`
				@keyframes twinkle {
					0%, 100% { opacity: var(--o); }
					50% { opacity: calc(var(--o) * 0.1); }
				}
			`}</style>
			{STARS.map((star, i) => (
				<span
					key={i}
					style={
						{
							position: "absolute",
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: star.s,
							height: star.s,
							borderRadius: "50%",
							background: "white",
							"--o": star.o,
							opacity: star.o,
							animation: `twinkle ${star.d}s ease-in-out ${star.delay}s infinite`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
}
