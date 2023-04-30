import { getAlphabets } from '@/utils/getAlphabets';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

export const Alphabets: FC = () => {
  const alphabets: string[] = getAlphabets();
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="md:flex overflow-x-scroll whitespace-nowrap lg:overflow-hidden lg:whitespace-wrap">
        <ul className="md:mx-4 md:flex md:flex-row inline-block md:inline py-4">
          <li
            className={`md:mr-4 px-4 md:px-0 inline-block md:inline 
            ${
              !router.query.filter
                ? 'text-blue-600 underline decoration-gray-500'
                : 'text-gray-400'
            }
             hover:text-blue-600 hover:underline hover:decoration-gray-500`}
          >
            <Link href={`/`}>#</Link>
          </li>

          {alphabets.map((alphabet) => (
            <li
              key={alphabet}
              className={`md:mr-4 px-4 md:px-0 inline-block md:inline 
                ${
                  router.query.filter === alphabet
                    ? 'text-blue-600 underline decoration-gray-500'
                    : 'text-gray-400'
                }
                 hover:text-blue-600 hover:underline hover:decoration-gray-500`}
            >
              <Link href={`/?filter=${alphabet}`}>{alphabet}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
