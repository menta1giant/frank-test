<script lang="ts">
	export let className: string = '';
	export let onClick: (e?: MouseEvent) => void = () => {};
	export let disableSubmit: boolean = false;
</script>

<button
	class={`button ${className}`}
	on:click={(e) => onClick()}
	type={disableSubmit ? 'button' : 'submit'}
>
	<slot />
</button>

<style lang="scss">
	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 1rem 1.25rem;
		height: max-content;

		background-color: var(--primary-button-background-color);
		color: white;
		font-size: 1.5em;
		font-weight: 500;

		transition: background-color 0.2s ease-in;

		&:focus-visible {
			outline: 1px solid var(--primary-button-background-color);
			outline-offset: 2px;
		}

		&:hover {
			background-color: var(--primary-button-background-color-hover);
		}

		&:active {
			transition-duration: 0.1s;
			background-color: var(--primary-button-background-color-active);
		}

		&--small {
			font-size: 1rem;
			padding: 0.5rem 0.75rem;
		}

		&--danger, &--danger:is(:hover, :active, :focus, :focus-visible) {
			background-color: hsl(6, 58%, 54%);
		}
	}
</style>
