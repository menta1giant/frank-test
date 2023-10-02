<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: (e?: MouseEvent) => void = () => {};
	export let isEdited: boolean = false;
</script>

<Button className={`edit-button ${isEdited ? 'button--danger' : ''}`} {onClick} disableSubmit>
	{#if isEdited}
		<i class="fa-solid fa-xmark" />
	{:else}
		<i class="fa-solid fa-pen" />
	{/if}
</Button>

<style lang="scss">
	@keyframes ButtonHover {
		25% {
			rotate: -20deg;
		}

		50% {
			scale: 1.25;
			rotate: 0deg;
		}

		75% {
			rotate: 20deg;
		}

		100% {
			scale: 1;
			rotate: 0;
		}
	}

	:global(.edit-button.edit-button) {
		padding: 0.75rem;
		font-size: 1em;

		i {
			display: block;
			line-height: 1rem;
		}

		&:hover {
			i {
				animation: 400ms linear 0s ButtonHover forwards;
			}
		}
	}
</style>
