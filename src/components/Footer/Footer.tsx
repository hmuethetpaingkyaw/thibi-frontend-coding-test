import layoutConfig from '@/config/layoutConfig';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="py-6 bg-accent">
      <div className="container flex items-center justify-between  px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <img
            className="block w-auto h-8 lg:hidden"
            src={layoutConfig.logo.mobile}
            alt={layoutConfig.logo.alt}
            loading="lazy"
          />
          <img
            className="hidden w-auto h-8 lg:block"
            src={layoutConfig.logo.desktop}
            alt={layoutConfig.logo.alt}
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-gray-300 text-sm underline decoration-gray-400">
            <Link href={'/contact-us'}>Contact Us</Link>
          </span>
        </div>
      </div>
      <div className=" text-center text-sm flex-end text-white">© 2023, All Rights Reserved.</div>
    </div>
  );
};

export default Footer;
