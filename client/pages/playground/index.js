import { useRouter } from 'next/router';
import React from 'react';

export default function Playground() {
  const router = useRouter();
  console.log('router: ', router.query);
  return <div>Playground</div>;
}
