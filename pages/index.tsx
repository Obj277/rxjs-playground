import React from 'react';
import Link from 'next/link';

export default () => {
  return (
    <ul>
      <li>
        <Link href={'/smart-counter'}>
          <a>smart counter</a>
        </Link>
      </li>
      <li>
        <Link href={'/progress-bar'}>
          <a>progress bar</a>
        </Link>
      </li>
    </ul>
  );
};
