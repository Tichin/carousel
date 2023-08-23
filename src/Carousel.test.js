import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("renders without crashing", function () {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});

it('matches snapshot', function () {

  const { container } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);

  expect(container).toMatchSnapshot();

});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();


  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  // move forward in the carousel
  fireEvent.click(rightArrow);
  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the second image to Not show, but the first to show
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("Arrows are hidden or not", function(){
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  expect(leftArrow).toHaveClass("hidden")
  expect(rightArrow).not.toHaveClass("hidden")

  //move forward twice
  fireEvent.click(rightArrow)
  //TODO: expect left and right arrow are not hidden here 
  fireEvent.click(rightArrow)

  expect(rightArrow).toHaveClass("hidden")
  expect(leftArrow).not.toHaveClass("hidden")
})

