export interface user {
 id: number;
 name: string;
 username: string;
 bio: string;
 email: string;
 profile: string;
 posts: number;
 cover: string;
 followings: number;
 followers: number;
};

export interface alert {
 message: string;
 type: "error" | "success" | "warning";
 timeout?: number; 
};

export interface post {
 id: number;
 status?: string;
 photo?: string;
 userId: number;
 likes: number;
 comments: number;
 bookmarks: number;
 createdAt: string;
 username: string;
 name: string;
 profile: string;
 isLiked: boolean;
 isBookmarked: boolean;
};


export interface comment {
 id: number;
 postId: number;
 comment: string;
 userInteracted: number;
 username: string;
 createdAt: string;
};