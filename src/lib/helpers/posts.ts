import type { IBlogPost } from '../interfaces/BlogPost';
import { getLocalStorageDataByKey, setLocalStorageData } from './localStorage';

let largestPostId: number = -1;
let cachedPosts: IBlogPost[] = [];

export function getPosts(): IBlogPost[] {
	if (cachedPosts.length) return cachedPosts;

	const posts = getLocalStorageDataByKey('posts');

	if (!posts || !posts.length) {
		largestPostId = 0;
		return [];
	}

	cachedPosts = JSON.parse(posts);

	largestPostId = cachedPosts.at(-1)!.id! + 1;

	return cachedPosts;
}

export function editPost(updatedPost: IBlogPost) {
	if (typeof updatedPost.id !== 'number') {
		addPost(updatedPost);
		return;
	}

	cachedPosts = cachedPosts.map((post) => {
		if (post.id !== updatedPost.id) return post;

		return Object.assign({}, post, updatedPost);
	});

	updatePostsInLocalStorage();
}

export function addPost(post: IBlogPost) {
	if (largestPostId < 0) return;
	cachedPosts.push(Object.assign({}, post, { id: largestPostId }));
	largestPostId++;

	updatePostsInLocalStorage();
}

function updatePostsInLocalStorage() {
	setLocalStorageData('posts', JSON.stringify(cachedPosts));
}
