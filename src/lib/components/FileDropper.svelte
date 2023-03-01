<script lang="ts">
	// @ts-nocheck
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Button } from './_index';
	import { Close, Upload } from 'carbon-icons-svelte';
	const dispatch = createEventDispatcher();

	export let fileMaxTotalSize = 1500000; // --------------------Int in bytes (default set to 1.5mb)
	export let disabled = false; // -------------------------Bool
	export let fileFormats = ['']; // -----------------------Array
	export let fileAllowMultiple = false; // ----------------Bool

	let acceptedFormats = fileFormats.map((format) => `.${format}`).join(', ');

	let files: File[] = [];
	let hasFile = false;
	let errorText = '';
	let totalSize = 0;
	let dragClass = '';

	function addFile(file) {
		files = [...file];
		errorText = '';
		totalSize = 0;

		files.forEach((file) => {
			const currentFormat = file.type.split('/').pop() ?? '';

			if (!fileFormats.includes(currentFormat)) {
				errorText = files.find((f) => f === file).name + ' has an invalid format';
				files = files.filter((f) => f !== file);
			} else {
				checkIfOverMaxSize(files);
			}
		});

		if (files.length > 0) hasFile = !hasFile;
	}

	function removeFile(fileName) {
		files = files.filter((file) => file.name !== fileName);
		checkIfOverMaxSize(files);
		if (files.length < 1) hasFile = !hasFile;
	}

	function checkIfOverMaxSize(files) {
		totalSize = 0;

		for (let i = 0; i < files.length; i++) {
			totalSize += files[i].size;
		}

		if (totalSize <= fileMaxTotalSize) {
			errorText = '';
			dispatchFiles(files);
		} else {
			errorText = `Maximum size reached: ${(totalSize / 1000000).toFixed(2)}mb / ${(
				fileMaxTotalSize / 1000000
			).toFixed(2)}mb`;
		}
	}

	function dispatchFiles(files) {
		dispatch('file_drop', files);
	}
</script>

<div class="wrapper">
	<div class="wrapper__file-dropper column" role="button" class:disabled={disabled === true}>
		{#if hasFile === false && disabled === false}
			<input
				tabindex={disabled ? -1 : 0}
				class="assistive--full"
				type="file"
				name="file-dropper"
				id="file-dropper"
				multiple={fileAllowMultiple}
				accept={acceptedFormats}
				bind:files
				on:change={() => addFile(files)}
				on:dragenter={() => (dragClass = 'drag--enter')}
				on:dragleave={() => (dragClass = '')}
				on:drop|preventDefault={(e) => {
					dragClass = '';
					if (e.dataTransfer) addFile(e.dataTransfer.files);
				}}
			/>
		{/if}
		<label for="file-dropper" class="file-dropper__content flex ja--center {dragClass}">
			{#if hasFile === false}
				<div class="content column ja--center" in:fly={{ y: 110, duration: 240, delay: 110 }}>
					<Upload size={24} />
					<p class="content-label type-bold type-utility-2">Choose a file or drag it here</p>
					<p class="type-utility-1">
						Max file size is {(fileMaxTotalSize / 1000000).toFixed(2)}mb and only
						<i>{acceptedFormats.replace(/,(?=[^,]*$)/, ' &')}</i> are allowed.
					</p>
				</div>
			{:else}
				<div
					class="file__wrapper column a--center"
					class:j--center={files.length <= 3}
					in:fly={{ y: 110, duration: 240, delay: 110 }}
				>
					{#each files as f (f.name)}
						<div class="file row j--sb a--center">
							<p id={f.name} class="file-name type-utility-2">
								{f.name}
							</p>
							<Button buttonStyle="secondary" on:button_click={() => removeFile(f.name)}>
								<Close title="Remove file" />
							</Button>
						</div>
					{/each}
				</div>
			{/if}
		</label>
	</div>
	<p class="type-error">{errorText}</p>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
	}

	.wrapper__file-dropper {
		position: relative;
		width: 100%;
		height: 12rem;
	}

	.file-dropper__content {
		overflow: hidden;
		position: relative;
		padding: 0.5rem;
		width: 100%;
		height: 100%;

		background-color: var(--grey-20);

		color: var(--theme-text-secondary);
		text-align: center;

		transition: background-color var(--fastest) var(--standard-productive);
	}

	.drag--enter {
		outline: 4px solid var(--blue-40);
		outline-offset: 2px;
	}

	.content {
		position: relative;
		padding: 0.5rem;
		width: 100%;
		height: 100%;

		border: 1px dashed var(--theme-border-color);
	}

	.content-label {
		margin: 0.5rem 0 0.25rem;
	}

	.assistive--full {
		cursor: pointer;
		opacity: 0;
		z-index: 2;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	input:hover + .file-dropper__content {
		background-color: var(--grey-30);
	}

	input:focus + .file-dropper__content {
		outline: 4px solid var(--blue-40);
		outline-offset: 2px;
	}

	.file__wrapper {
		overflow: visible auto;
		width: 80%;
		max-width: 20rem;
		height: 100%;
		max-height: 9.25rem;

		&::-webkit-scrollbar {
			background-color: var(--grey-30);
			padding: 0 4px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: var(--theme-border-color);
		}
	}

	.file {
		z-index: 999;
		margin-bottom: -1px;
		width: 100%;
		border-top: 1px solid var(--theme-border-color);
		border-bottom: 1px solid var(--theme-border-color);
		background-color: var(--grey-20);
	}

	.file-name {
		overflow: hidden;
		margin-left: 1rem;
		padding-right: 1rem;

		word-break: break-word;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
