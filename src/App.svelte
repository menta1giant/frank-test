<script lang="ts">
	import BlogPost from './components/BlogPost.svelte';
	import Button from './components/Button.svelte';
	import Modal from './components/Modal.svelte';

	import { editPost, getPosts } from './lib/helpers/posts';
	import { formatDate } from './lib/helpers/date';

	const formName: any = `blog-post`;
	let posts = getPosts();
	let selectedPostId: number | null = null;
	let isModalOpen = false;

	const handlePostEdit = (e: SubmitEvent, postId?: number) => {
		e.preventDefault();

		const form = document.forms[formName];
		const formData = new FormData(form);

		const selectedPost = posts.find((post) => post.id === postId);
		const currentDate = formatDate(new Date());
		const [title, content] = [formData.get('title') as string, formData.get('content') as string];
		if (!title || !content) return;

		const newPost = {
			id: postId,
			title: title,
			content: content,
			dateCreated: selectedPost?.dateCreated || currentDate,
			dateEdited: currentDate
		};

		editPost(newPost);
		handleModalToggle();
		posts = getPosts();
	};

	const handlePostRead = (postId?: number) => {
		selectedPostId = typeof postId == 'number' ? postId : null;
		isModalOpen = true;
	};

	const handleModalToggle = () => {
		isModalOpen = !isModalOpen;
	};
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog" />
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</svelte:head>

<h1>Блог</h1>
<Button onClick={() => handlePostRead()}>Создать пост</Button>
<div class="blog-posts-container">
	{#each posts as post (post.id)}
		<BlogPost {...post} onClick={() => handlePostRead(post.id)} />
	{/each}
</div>

{#if isModalOpen}
	<Modal onOutsideClick={handleModalToggle}>
		<form
			name={formName}
			on:submit={(e) => handlePostEdit(e, selectedPostId !== null ? selectedPostId : undefined)}
		>
			{#if selectedPostId !== null}
				<BlogPost {...posts[selectedPostId]} isSelected />
			{:else}
				<BlogPost isSelected />
			{/if}
		</form>
	</Modal>
{/if}

<style lang="scss">
	.blog-posts-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: 1rem;

		margin-block: 1rem;
	}
</style>
