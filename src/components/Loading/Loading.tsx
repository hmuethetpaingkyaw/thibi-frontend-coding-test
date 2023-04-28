import Image from 'next/image';
import React from 'react';

function FullScreenLoading() {
  return (
    <div className="container flex justify-center">
      <Image src="/icons/spinner.png" alt="loading image" width={100} height={100} />
    </div>
  );
}
export default FullScreenLoading;
