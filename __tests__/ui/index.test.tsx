import { render, screen } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import commonEN from '../../locales/en/common.json';
import Home from '../../src/pages/index';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Pages/index', () => {
  it('Home/Index Page shows header/footer correctly', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Home />
      </I18nProvider>
    );

    const englishNavText = screen.getByText(/english/i);
    const burmeseNavText = screen.getByText(/မြန်မာ/i);
    const footerText = screen.getByText(/all right reserved\. blah blah blah/i);
    expect(englishNavText).toBeInTheDocument();
    expect(burmeseNavText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  it('Home/Index Page Layout has correct heading and content', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);
    render(
      <I18nProvider lang="en" namespaces={{ common: commonEN }}>
        <Home />
      </I18nProvider>
    );

    const heading = screen.getByRole('heading', { name: /hello world/i });
    const content = screen.getByText(
      /lorem ipsum dolor, sit amet consectetur adipisicing elit\. voluptates omnis natus temporibus magnam nisi at nostrum commodi ea autem, error dolores laboriosam ipsam maxime corporis quae, reprehenderit ipsum quasi harum!/i
    );

    expect(heading).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
