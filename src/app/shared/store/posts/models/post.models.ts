import { PostComment } from '@@features/comments/models/models';
import { FormControl } from '@angular/forms';

export interface Post {
	_id: string;
	title: string;
	body: string;
	likes: number;
	author: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	comments: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface SelectedPost {
	payload: string;
	_id: string;
	title: string;
	body: string;
	likes: number;
	author: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	comments: PostComment[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CreatePostRequestBody {
	title: string;
	body: string;
	message: string;
}

export interface PostForm {
	title: FormControl<string>;
	body: FormControl<string>;
}
