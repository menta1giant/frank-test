<script lang="ts">
	export let onOutsideClick: Function;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="modal-overlay" on:mousedown={(e) => onOutsideClick()}>
	<div class="modal" on:mousedown={(e) => e.stopPropagation()}>
		<slot />
	</div>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		left: 0;
		top: 0;

		display: flex;
		align-items: center;

		width: 100%;
		height: 100%;
		background: rgb(0, 0, 0, 0.6);
	}

	.modal {
		margin: auto;
	}
</style>
