import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navigation from "./Navigation";
import { UserProvider } from "../testUtils";
import jest from 'jest'


// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
  const { asFragment } = render(
          <MemoryRouter>
              <UserProvider>
                  <Navigation />
              </UserProvider>
          </MemoryRouter>
      )
  expect(asFragment()).toMatchSnapshot();
})







