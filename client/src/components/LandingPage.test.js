import React from 'react';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react'


describe("<LandingPage />", () => {

  it('Should have the name of the app: "Countries App"', () => {
    const component = render(<BrowserRouter><LandingPage/></BrowserRouter>);
    expect(component.container).toHaveTextContent('Countries App');
  })

  it('Should have the name of the author: "Anderson Marín"', () => {
    const component = render(<BrowserRouter><LandingPage/></BrowserRouter>);
    expect(component.container).toHaveTextContent('Anderson Marín');
  })

  it('Should have a button to go /home', () => {
    const component = render(<BrowserRouter><LandingPage/></BrowserRouter>);
    expect(component.getAllByRole('button').length).toBe(1);
  })

})