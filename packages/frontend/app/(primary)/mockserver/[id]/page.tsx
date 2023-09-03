import { useRouter } from 'next/router';

interface Params {
  id: number;
}

interface Props {
  params: Params;
}

export default function Post({ params }: Props) {
  const { id } = params;

  return <p>Post: {id}</p>;
}
