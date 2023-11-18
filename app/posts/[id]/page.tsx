import React from 'react'

async function getPost(postId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    { next: { revalidate: 10 }}
  )

  // 일부러 에러를 발생시켜보는 테스트
  if (!res.ok) {
    // 에러가 트리거 되면 가장 가까이에 있는 error.js 파일이 actived 된다
    // 즉 같은 뎁스에 error.tsx 파일을 넣어두면 그 파일이 활성화 된다
    throw new Error('Failed to fetch data');
  }

  const data = res.json();
  return data;
}

const PostDetailPage = async ({params}: any) => {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div>
        <h3>{post.title}</h3>
        <p>{post.created}</p>
      </div>
    </div>
  )
}

export default PostDetailPage