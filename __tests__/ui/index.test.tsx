import { render, screen } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import commonEN from '../../locales/en/common.json';
import Home from '../../src/pages/index';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pages/index', () => {
  it('Home/Index Page shows header/footer correctly', async () => {
    useRouter.mockImplementation(() => ({
      query: { myParam: 'A' },
    }));
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Home />
      </I18nProvider>
    );

    const englishNavText = screen.getByText(/English/i);
    const burmeseNavText = screen.getByText(/မြန်မာ/i);
    const footerText = screen.getByText(/© 2023, All Rights Reserved./i);
    expect(englishNavText).toBeInTheDocument();
    expect(burmeseNavText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  it('Home/Index Page Layout has correct link to filter', async () => {
    useRouter.mockImplementation(() => ({
      query: { myParam: 'A' },
    }));
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Home />
      </I18nProvider>
    );
    const link = screen.getByText('A');

    expect(link.getAttribute('href')).toBe('/A');
  });

  it('Home/Index Page Layout has alphabets from A to Z', async () => {
    useRouter.mockImplementation(() => ({
      query: { myParam: '' },
    }));
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Home />
      </I18nProvider>
    );
    const alphabet_A = screen.getByText('A');
    const alphabet_Z = screen.getByText('Z');

    expect(alphabet_A).toBeInTheDocument();
    expect(alphabet_Z).toBeInTheDocument();
  });
});
