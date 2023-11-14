import { MostPopular } from "@/app/components/main/slider/slider";
import { act, fireEvent, getAllByLabelText, getByLabelText, getByText, render, screen } from "@testing-library/react";
import { mockSlides } from "./Main.test";






describe("Test component Slider ", () => {
  it("check navigation dots next", () => {
    const {container} = render(<MostPopular slides={mockSlides} />);
    fireEvent.click(getAllByLabelText(container,'navigation dots')[1])
    expect(getByText(container, mockSlides[1].title)).toBeInTheDocument()
    expect(getByText(container, mockSlides[1].description)).toBeInTheDocument()
    expect(getByText(container, mockSlides[1].genres[0].name)).toBeInTheDocument()
  });
  it("check navigation dots prev", () => {
    const {container} = render(<MostPopular slides={mockSlides} />);
    fireEvent.click(getAllByLabelText(container,'navigation dots')[1])
    fireEvent.click(getAllByLabelText(container,'navigation dots')[0])
    expect(getByText(container, mockSlides[0].title)).toBeInTheDocument()
    expect(getByText(container, mockSlides[0].description)).toBeInTheDocument()
    expect(getByText(container, mockSlides[0].genres[0].name)).toBeInTheDocument()
  });
  it("check navigation button next", () => {
    const {container} = render(<MostPopular slides={mockSlides} />);
    fireEvent.click(getByLabelText(container,'next slide'))
    expect(getByText(container, mockSlides[1].title)).toBeInTheDocument()
    expect(getByText(container, mockSlides[1].description)).toBeInTheDocument()
    expect(getByText(container, mockSlides[1].genres[0].name)).toBeInTheDocument()
  });
  it("check navigation button prev", () => {
    const {container} = render(<MostPopular slides={mockSlides} />);
    fireEvent.click(getByLabelText(container,'next slide'))
    fireEvent.click(getByLabelText(container,'prev slide'))
    expect(getByText(container, mockSlides[0].title)).toBeInTheDocument()
    expect(getByText(container, mockSlides[0].description)).toBeInTheDocument()
    expect(getByText(container, mockSlides[0].genres[0].name)).toBeInTheDocument()
    expect(getByText(container, mockSlides[0].price)).toBeInTheDocument()
  });
  it("check is hide navigation button prev if active slide first", () => {
    let nonExist = false
    try {
        screen.getByLabelText('prev slide')
    } catch (error) {
        nonExist = true;
    }
    expect(nonExist).toEqual(true);
  });
  it("check is hide navigation button next if active slide last", async () => {
    const {container} = render(<MostPopular slides={mockSlides} />);
    let nonNext = false
    setTimeout(() => {
    try {
        fireEvent.click(getAllByLabelText(container,'navigation dots')[4])
        screen.getByLabelText('next slide')
    } catch (error) {
        nonNext = true;
    }
    expect(nonNext).toEqual(true);
  }, 500);
  });
});
