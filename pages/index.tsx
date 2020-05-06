import React from 'react';
import Link from 'next/link';

export default () => {
  return (
    <div>
      <Link href={'/smart-counter'}>
        <a>smart counter</a>
      </Link>
    </div>
  );
};