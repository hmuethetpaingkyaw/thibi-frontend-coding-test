import { render, screen } from '@testing-library/react';
import { readFakeLayoutData } from '../__mocks__/fakeData';
import I18nProvider from 'next-translate/I18nProvider';
import commonEN from '../../locales/en/common.json';
import Navbar from '@/components/NavBar';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Components/Navbar', () => {
  it('Navbar has proper props based nav items', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);
    const data = await readFakeLayoutData();
    const { logo, navBar } = data;
    const { menuItems, bgColor, textColor } = navBar;
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Navbar logo={logo} menuItems={menuItems} bgColor={bgColor} textColor={textColor} />
      </I18nProvider>
    );

    const englishNavText = screen.getByText(/english/i);
    const burmeseNavText = screen.getByText(/မြန်မာ/i);

    expect(englishNavText).toBeInTheDocument();
    expect(burmeseNavText).toBeInTheDocument();
  });
});
