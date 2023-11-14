import { fireEvent, getByAltText, getByText, render, screen } from '@testing-library/react'
import { Header } from '@/app/components/header'
import '@testing-library/jest-dom'
type TestElement = Document | Element | Window | Node


describe('Test component Header on minimal functional ', () => {
    function hasInputValue(e: TestElement, inputValue: string) {
        return screen.getByDisplayValue(inputValue) === e
      }

    it('check is logo true', () => {
        const header = render(<Header />)
        const image = getByAltText(header.container ,'logo');
        expect(getByText(header.container, "GRID")).toBeInTheDocument()
        expect(image).toHaveAttribute('src', '/logo.svg')
    })
    it('check is all links', () => {
        const header = render(<Header />)
        expect(getByText(header.container, "STORE")).toBeInTheDocument()
        expect(getByText(header.container, "LIBRARY")).toBeInTheDocument()
        expect(getByText(header.container, "INSTALL")).toBeInTheDocument()
    })
    it('check is have search input with placeholder', () => {
        render(<Header />)
        const inputNode = screen.getByPlaceholderText('Search')
        expect(inputNode)
    })
    it('check is work input if typing', () => {
        render(<Header />)
        const inputNode = screen.getByPlaceholderText('Search')
        fireEvent.change(inputNode, { target: { value: '123' } })
        expect(hasInputValue(inputNode, "123")).toBe(true)
    })
    it('check is have avatar', () => {
        const header = render(<Header />)
        expect(getByText(header.container, "H")).toBeInTheDocument()
    })

})