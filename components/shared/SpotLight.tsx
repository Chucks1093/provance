"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function SpotLight({
	position = "top",
}: {
	position?: "top" | "bottom";
}) {
	const isTop = position === "top";

	const W = 560;
	const H = 900;
	const cx = W / 2;

	// Rings
	const outerCY = 62;
	const outerRX = 85;
	const outerRY = 24;
	const innerCY = 62;
	const innerRX = 42;
	const innerRY = 12;

	// Beam
	const outerBottom = 1600;
	const innerBottom = 2200;
	const outerHalfW = 420;
	const innerHalfW = 280;

	const outerBeamPath = [
		`M ${cx - outerRX},${outerCY}`,
		`A ${outerRX},${outerRY} 0 0 1 ${cx + outerRX},${outerCY}`,
		`L ${cx + outerHalfW},${outerBottom} L ${cx - outerHalfW},${outerBottom} Z`,
	].join(" ");

	const innerBeamPath = [
		`M ${cx - innerRX},${innerCY}`,
		`A ${innerRX},${innerRY} 0 0 1 ${cx + innerRX},${innerCY}`,
		`L ${cx + innerHalfW},${innerBottom} L ${cx - innerHalfW},${innerBottom} Z`,
	].join(" ");

	// Flicker
	const flickerKeyframes = [
		1, 0, 1, 0, 1, 0, 0.9, 0, 1, 0, 1, 0, 0.8, 1, 0, 1, 0, 1, 0, 0.95, 1,
	];
	const totalCycleDuration = 5.3;
	const burstDuration = 0.28;
	const flickerEnd = burstDuration / totalCycleDuration;
	const step = flickerEnd / (flickerKeyframes.length - 1);
	const flickerTimes = flickerKeyframes.map((_, i) => i * step);

	// Running lights around outer ring
	const runningLights = Array.from({ length: 8 }, (_, i) => {
		const angle = (i / 8) * Math.PI;
		return {
			x: cx + Math.cos(angle) * outerRX,
			y: outerCY + Math.sin(angle) * outerRY,
			delay: i * 0.18,
		};
	});

	const swayControls = useAnimationControls();
	const beamControls = useAnimationControls();

	useEffect(() => {
		const SWAY_MS = 15000;
		const BEAM_MS = 7000;
		let t1: ReturnType<typeof setTimeout>;
		let t2: ReturnType<typeof setTimeout>;
		let t3: ReturnType<typeof setTimeout>;

		const swayAnim = {
			y: [0, 28, 0, 22, 0] as number[],
			x: [0, 5, -5, 3, -3, 0] as number[],
			transition: {
				y: { duration: 8, ease: "easeInOut" as const, repeat: Infinity, repeatType: "loop" as const },
				x: { duration: 13, ease: "easeInOut" as const, repeat: Infinity, repeatType: "loop" as const },
			},
		};

		function startSway() {
			beamControls.start({ opacity: 0, transition: { duration: 0.5 } });
			t1 = setTimeout(startBeam, SWAY_MS);
		}

		function startBeam() {
			beamControls.start({ opacity: 1, transition: { duration: 0 } });
			t2 = setTimeout(() => {
				beamControls.start({ opacity: 0, transition: { duration: 0.5 } });
				t3 = setTimeout(startSway, 500);
			}, BEAM_MS);
		}

		// Entry animation then kick off cycle
		swayControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } })
			.then(() => {
				swayControls.start(swayAnim);
				t1 = setTimeout(startBeam, SWAY_MS);
			});

		return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className='absolute inset-x-0 pointer-events-none '
			style={{
				top: isTop ? "32px" : "auto",
				bottom: isTop ? "auto" : "32px",
				height: 0,
			}}>
			{/* Hover float + sway */}
			<motion.div
				className='absolute left-1/2 -translate-x-1/2'
				style={{ top: 0 }}
				initial={{ opacity: 0, y: -50 }}
				animate={swayControls}>
				<motion.svg
					style={{
						overflow: "visible",
						width: "min(560px, 100vw)",
						height: "100vh",
					}}
					viewBox={`0 0 ${W} ${H}`}
					preserveAspectRatio='xMidYMin meet'
					animate={{ opacity: flickerKeyframes }}
					transition={{
						duration: totalCycleDuration,
						times: flickerTimes,
						ease: "linear",
						repeat: Infinity,
						delay: 1.2,
					}}>
					<defs>
						<linearGradient
							id='outerGrad'
							x1='0'
							y1={outerCY}
							x2='0'
							y2={outerBottom}
							gradientUnits='userSpaceOnUse'>
							<stop
								offset='0%'
								stopColor='white'
								stopOpacity='0.28'
							/>
							<stop
								offset='15%'
								stopColor='white'
								stopOpacity='0.05'
							/>
							<stop
								offset='65%'
								stopColor='white'
								stopOpacity='0'
							/>
							<stop
								offset='100%'
								stopColor='white'
								stopOpacity='0'
							/>
						</linearGradient>
						<linearGradient
							id='innerGrad'
							x1='0'
							y1={innerCY}
							x2='0'
							y2={innerBottom}
							gradientUnits='userSpaceOnUse'>
							<stop
								offset='0%'
								stopColor='white'
								stopOpacity='0.42'
							/>
							<stop
								offset='15%'
								stopColor='white'
								stopOpacity='0.06'
							/>
							<stop
								offset='40%'
								stopColor='white'
								stopOpacity='0.01'
							/>
							<stop
								offset='55%'
								stopColor='white'
								stopOpacity='0'
							/>
							<stop
								offset='100%'
								stopColor='white'
								stopOpacity='0'
							/>
						</linearGradient>
						{/* Hull dome gradient */}
						<radialGradient
							id='domeGrad'
							cx='50%'
							cy='80%'
							r='60%'>
							<stop
								offset='0%'
								stopColor='white'
								stopOpacity='0.12'
							/>
							<stop
								offset='100%'
								stopColor='white'
								stopOpacity='0'
							/>
						</radialGradient>
						{/* Engine glow under hull */}
						<radialGradient
							id='engineGlow'
							cx='50%'
							cy='50%'
							r='50%'>
							<stop
								offset='0%'
								stopColor='white'
								stopOpacity='0.3'
							/>
							<stop
								offset='100%'
								stopColor='white'
								stopOpacity='0'
							/>
						</radialGradient>
					</defs>

					{/* Beam */}
					<motion.g
						initial={{ opacity: 0 }}
						animate={beamControls}>
						<path
							d={outerBeamPath}
							fill='url(#outerGrad)'
						/>
						<path
							d={innerBeamPath}
							fill='url(#innerGrad)'
						/>
					</motion.g>

					{/* Hull dome */}
					<motion.g
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}>
						{/* Hull body */}
						<ellipse
							cx={cx}
							cy={outerCY - 10}
							rx={outerRX * 0.88}
							ry={32}
							fill='url(#domeGrad)'
						/>
						{/* Hull rim */}
						<ellipse
							cx={cx}
							cy={outerCY - 10}
							rx={outerRX * 0.88}
							ry={32}
							fill='none'
							stroke='rgba(255,255,255,0.42)'
							strokeWidth='1'
						/>
						{/* Top dome cap */}
						<ellipse
							cx={cx}
							cy={outerCY - 28}
							rx={outerRX * 0.45}
							ry={18}
							fill='none'
							stroke='rgba(255,255,255,0.28)'
							strokeWidth='1'
						/>
					</motion.g>

					{/* Engine glow between hull and beam — pulses */}
					<motion.ellipse
						cx={cx}
						cy={outerCY + 2}
						rx={outerRX * 0.6}
						ry={10}
						fill='url(#engineGlow)'
						animate={{ opacity: [0.6, 1, 0.6], ry: [10, 13, 10] }}
						transition={{
							duration: 2.2,
							ease: "easeInOut",
							repeat: Infinity,
						}}
					/>

					{/* Outer ring */}
					<motion.ellipse
						cx={cx}
						cy={outerCY}
						rx={outerRX}
						ry={outerRY}
						fill='none'
						stroke='rgba(255,255,255,0.95)'
						strokeWidth='5'
						style={{
							filter:
								"drop-shadow(0 0 6px white) drop-shadow(0 0 18px rgba(255,255,255,0.65))",
						}}
						animate={{
							filter: [
								"drop-shadow(0 0 6px white) drop-shadow(0 0 18px rgba(255,255,255,0.65))",
								"drop-shadow(0 0 10px white) drop-shadow(0 0 28px rgba(255,255,255,0.9))",
								"drop-shadow(0 0 6px white) drop-shadow(0 0 18px rgba(255,255,255,0.65))",
							],
						}}
						transition={{
							duration: 2.2,
							ease: "easeInOut",
							repeat: Infinity,
						}}
					/>

					{/* Inner ring */}
					<motion.ellipse
						cx={cx}
						cy={innerCY}
						rx={innerRX}
						ry={innerRY}
						fill='none'
						stroke='rgba(255,255,255,0.95)'
						strokeWidth='5'
						style={{
							filter:
								"drop-shadow(0 0 6px white) drop-shadow(0 0 14px rgba(255,255,255,0.6))",
						}}
						animate={{
							filter: [
								"drop-shadow(0 0 6px white) drop-shadow(0 0 14px rgba(255,255,255,0.6))",
								"drop-shadow(0 0 10px white) drop-shadow(0 0 22px rgba(255,255,255,0.85))",
								"drop-shadow(0 0 6px white) drop-shadow(0 0 14px rgba(255,255,255,0.6))",
							],
						}}
						transition={{
							duration: 2.2,
							ease: "easeInOut",
							repeat: Infinity,
							delay: 0.3,
						}}
					/>

					{/* Running lights — blink sequentially */}
					{runningLights.map((light, i) => (
						<motion.circle
							key={i}
							cx={light.x}
							cy={light.y}
							r={2.5}
							fill='white'
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 0] }}
							transition={{
								duration: 1.4,
								ease: "easeInOut",
								repeat: Infinity,
								delay: 1.5 + light.delay,
								repeatDelay: 0.6,
							}}
						/>
					))}
				</motion.svg>
			</motion.div>
		</div>
	);
}
