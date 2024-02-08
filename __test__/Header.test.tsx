
/**
 * @jest-environment jsdom
 */
import {fireEvent, getByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Header } from '@/app/components/header'
import '@testing-library/jest-dom'
import { Providers } from '@/app/reactQuery/providers'
import '@testing-library/jest-dom'
import ThemeRegistry from '@/app/theme/ThemeRegistry'
import mediaQuery from 'css-mediaquery';

type TestElement = Document | Element | Window | Node

interface ProvidersWrapperProps {
    children: React.ReactNode
}


const ProvidersWrapper:React.FC = () =>  {
    return (
        <ThemeRegistry deviceType={"desktop"}>
        <Header/>
        </ThemeRegistry>
    );
  }
  jest.mock('next/navigation', () => {
    return {
      __esModule: true,
      usePathname: () => ({ pathname: '' }),
      useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn()
      }),
      useSearchParams: () => ({ get: () => {} }),
      useServerInsertedHTML: jest.fn()
    };
  });


describe('Test component Header on minimal functional ', () => {
    beforeAll(() => {
        function createMatchMedia(width: number) {
          return (query: string): MediaQueryList => ({
            matches: mediaQuery.match(query, { width }) as boolean,
            media: '',
            addListener: () => {},
            removeListener: () => {},
            onchange: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true,
          });
        }
        // mock matchMedia for useMediaQuery to work properly
        window.matchMedia = createMatchMedia(window.innerWidth);
      });
    function hasInputValue(e: TestElement, inputValue: string) {
        return screen.getByDisplayValue(inputValue) === e
      }
     
    it('check is logo true',   async () => {
        const header = render(<ProvidersWrapper/>, {wrapper: Providers})
        expect(getByText(header.container, "GRID")).toBeInTheDocument()
    })
    it('check is all links', async() => {
        const header = render(<ProvidersWrapper/>, {wrapper: Providers})
        expect(getByText(header.container, "STORE")).toBeInTheDocument()
        expect(getByText(header.container, "LIBRARY")).toBeInTheDocument()
        expect(getByText(header.container, "INSTALL")).toBeInTheDocument()
    })
    it('check is have search input with placeholder', async() => {
        const header = render(<ProvidersWrapper/>, {wrapper: Providers})
        const inputNode = screen.getByPlaceholderText('Search')
        expect(inputNode)
    })
    it('check is work input if typing', async() => {
        const header = render(<ProvidersWrapper/>, {wrapper: Providers})
        const inputNode = screen.getByPlaceholderText('Search')
        fireEvent.change(inputNode, { target: { value: '123' } })
        expect(hasInputValue(inputNode, "123")).toBe(true)
    })

    it('check is have search', async() => {
        const header = render(<ProvidersWrapper/>, {wrapper: Providers})
        const inputNode = screen.getByPlaceholderText('Search')
        fireEvent.change(inputNode, { target: { value: '123' } })
        fireEvent.focus(inputNode)
    
    })

 })