<script lang="ts">
	import EditButton from './EditButton.svelte';
	import Button from './Button.svelte';

	export let id: number | null = null;
	export let title: string = '';
	export let content: string = '';
	export let dateEdited: string = '';
	export let dateCreated: string = '';
	export let isSelected: boolean = false;
	export let onClick: Function = () => {};

	const isNewPost = !(typeof id === 'number');
	let isEdited: boolean = isNewPost;

	const editPost = (e?: MouseEvent) => {
		e?.stopPropagation();

		if (isEdited && isNewPost) return;

		isEdited = !isEdited;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class={`blog-post ${!isSelected ? 'clickable' : ''}`} on:click={(e) => onClick()}>
	<div class="blog-post__header">
		{#if !isEdited}
			<h2 class="blog-post__title">{title}</h2>
		{:else}
			<input name="title" placeholder="Заголовок поста" value={title} />
		{/if}
		{#if isSelected}
			<EditButton onClick={(e) => editPost(e)} {isEdited} />
		{/if}
	</div>
	{#if isEdited}
		<textarea name="content" placeholder="Содержимое поста" value={content} />
	{:else if isSelected}
		<p class="blog-post__content">{content}</p>
	{/if}
	<div class="blog-post__footer">
		{#if !isEdited}
			<span class="blog-post__date-created">{dateCreated}</span>
		{:else}
			<Button className="button--small">Сохранить изменения</Button>
		{/if}
		{#if dateEdited !== dateCreated}
			<span class="blog-post__date-edited">Отредактировано {dateEdited}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.blog-post {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.25rem;

		min-width: min(80vw, 30rem);
		max-width: min(80vw, 45rem);
		padding: 1.25rem 1.75rem;

		border-radius: 3px;
		background: white;
		box-shadow: 0px 0px 3px 2px hsla(248, 70%, 40%, 0.05);
		transition-duration: 300ms;

		overflow: hidden;

		&:hover {
			box-shadow: 0px 0px 3px 3px hsla(248, 70%, 40%, 0.1);
		}

		&__header {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
		}

		&__title {
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;

			font-size: 1.75rem;
			font-weight: 600;
		}

		&__content {
			font-size: 1.25rem;
		}

		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			margin-top: 1rem;

			font-size: 1rem;

			span {
				text-align: left;

				&:last-child {
					text-align: right;
				}
			};
		}

		&__date-edited {
			font-size: 0.8em;
			color: rgb(0, 0, 0, 0.5);
		}
	}
</style>
