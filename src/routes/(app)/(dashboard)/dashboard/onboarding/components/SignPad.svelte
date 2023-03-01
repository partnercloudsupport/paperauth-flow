<script lang="ts">
	import type { PointGroup } from 'signature_pad';
	import SignaturePad from 'signature_pad';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { Button, IconButton } from 'lib/components/_index';
	import { Redo, TrashCan, Undo } from 'carbon-icons-svelte';

	const dispatch = createEventDispatcher();

	let signPad: SignaturePad;
	let signData: PointGroup[] = [];
	let signDataHistory: PointGroup[] = [];

	let canvas: HTMLCanvasElement;

	function submitSignature() {
		if (signData.length === 0 || signPad.isEmpty()) return;
		let signature = signPad.toSVG();
		signature = trimSignatureWhitespace(signature);
		signature = optimizeSignature(signature);

		dispatch('sign_submit', signature);
	}

	function undoCanvas() {
		if (signData.length > 0) {
			signDataHistory.push(signData.pop()!);
			signDataHistory = signDataHistory.slice(-10);
			signPad.fromData(signData);
		}
	}

	function redoCanvas() {
		if (signDataHistory.length > 0) {
			signData.push(signDataHistory.pop()!);
			signPad.fromData(signData);
			signData = signData;
		}
	}

	function clearCanvas() {
		if (confirm('Pressing "OK" will delete your current eSignature.')) {
			signData = [];
			signPad.clear();
		}
	}

	function resizeCanvas() {
		if (!canvas) return;
		const ratio = Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;

		const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
		ctx.scale(ratio, ratio);
		signPad.clear();
	}

	function trimSignatureWhitespace(svg: string) {
		const pathData = svg.match(/d="([^"]+)"/g);
		if (!pathData) return svg;
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		pathData.map((path) => {
			const points = path
				.replace('d="', '')
				.replace(/(Z|M|L|C|Q|T|S|A)/g, ' $1 ')
				.replace(/"/g, '')
				.trim()
				.split(' ');
			points.map((point) => {
				if (point === 'Z') return;
				const [x, y] = point.split(',').map((coord) => parseInt(coord, 10));
				if (x < minX) minX = x - 10;
				if (x > maxX) maxX = x + 10;
				if (y < minY) minY = y - 10;
				if (y > maxY) maxY = y + 10;
			});
		});
		const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
		const trimmedSvg = svg.replace(/viewBox="([^"]+)"/, `viewBox="${viewBox}"`);
		return trimmedSvg;
	}

	function optimizeSignature(svg: string) {
		if (svg.charCodeAt(0) === 0xfeff) svg = svg.slice(1);

		const trimedSVG = svg
			.replace(
				'><path',
				'><defs><style type="text/css"><![CDATA[path {fill:none;stroke:currentColor;stroke-linecap:round;}]]></style></defs><path'
			)
			.trim()
			.replaceAll('.[0-9]{3}', '.[0-9]')
			.replaceAll('.000', '')
			.replaceAll(/\s+/g, ' ')
			.replaceAll(/"/g, "'")
			.replaceAll('></path>', '/>')
			.replaceAll("stroke='currentColor' fill='none' stroke-linecap='round'", '');

		return trimedSVG;
	}

	onMount(() => {
		signPad = new SignaturePad(canvas, {
			dotSize: 2,
			throttle: 8,
			penColor: 'currentColor'
		});
		resizeCanvas();

		signPad.addEventListener('endStroke', () => {
			signData = signPad.toData();
			signDataHistory = [];
		});
	});
</script>

<svelte:window
	on:resize={resizeCanvas}
	on:keydown={(e) => {
		if (e.ctrlKey && e.key === 'z') undoCanvas();
		if (e.ctrlKey && e.key === 'y') redoCanvas();
	}}
/>
<div class="wrapper column">
	<div class="pad">
		<canvas bind:this={canvas} />
		<div class="pad__label">
			<p class="type-body-1">Draw your <span class="type-bold">official</span> signature</p>
		</div>
	</div>

	<div class="pad__actions row j--sb a--center">
		<div class="pad__actions-inner row">
			<IconButton buttonTitle="Clear canvas" on:button_click={clearCanvas}>
				<TrashCan title="Clear canvas" />
			</IconButton>
			<IconButton buttonTitle="Undo stroke" on:button_click={undoCanvas}>
				<Undo />
			</IconButton>
			{#if signDataHistory.length > 0}
				<IconButton buttonTitle="Redo stroke" on:button_click={redoCanvas}>
					<Redo />
				</IconButton>
			{/if}
		</div>
		{#if signData.length > 0}
			<div class="aggreements row a--center">
				<Button on:button_click={submitSignature}>Submit to your safe</Button>
				<p class="type-utility-1">
					By submitting, I agree to use the drawing above as an electronic representation of my very
					own signature (including on legally binding documents) just the same as my pen-and-paper
					signature.
				</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 1rem;
	}

	.pad {
		position: relative;
		aspect-ratio: 3 / 1;

		background-color: var(--grey-20);

		color: var(--theme-text-color--light);
	}

	canvas {
		z-index: 1;
		cursor: crosshair;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.pad__label {
		z-index: 0;
		user-select: none;
		opacity: 0.5;
		position: absolute;
		bottom: 10%;
		padding: 0 5%;
		width: 100%;

		color: var(--theme-text-color--light);

		p {
			width: 100%;
			padding-top: 0.5rem;
			text-align: center;

			color: inherit;
			border-top: 1px solid var(--theme-text-color--light);
		}
	}

	.pad__actions,
	.pad__actions-inner {
		column-gap: 0.5rem;
	}

	.aggreements {
		column-gap: 1rem;
	}

	@supports not (aspect-ratio: 3 / 1) {
		.pad {
			&::before {
				float: left;
				padding-top: 33%;
				content: '';
			}
			&::after {
				display: block;
				content: '';
				clear: both;
			}
		}
	}
</style>
