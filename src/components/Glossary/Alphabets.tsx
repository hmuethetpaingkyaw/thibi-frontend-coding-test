import { getAlphabet } from '@/utils/getAlphabet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

export const Alphabets: FC = () => {
  const alphabet: string[] = getAlphabet();
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="md:flex overflow-x-scroll whitespace-nowrap lg:overflow-hidden lg:whitespace-wrap">
        <ul className="md:mx-4 md:flex md:flex-row inline-block md:inline">
          <li
            className={`md:mr-4 px-4 md:px-0 inline-block md:inline 
            ${
              router.pathname === '/'
                ? 'text-blue-600 underline decoration-gray-500'
                : 'text-gray-400'
            }
             hover:text-blue-600 hover:underline hover:decoration-gray-500`}
          >
            <Link href={`/`}>#</Link>
          </li>

          {alphabet.map((letter) => (
            <li
              key={letter}
              className={`md:mr-4 px-4 md:px-0 inline-block md:inline 
                ${
                  router.query.filter === letter
                    ? 'text-blue-600 underline decoration-gray-500'
                    : 'text-gray-400'
                }
                 hover:text-blue-600 hover:underline hover:decoration-gray-500`}
            >
              <Link href={`/${letter}`}>{letter}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
