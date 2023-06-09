import React from "react";
import { render } from "@testing-library/react";
import Routes from "./Routes";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Routes />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
  const { asFragment } = render(
          <MemoryRouter>
              <UserProvider>
                  <Routes />
              </UserProvider>
          </MemoryRouter>
      )
  expect(asFragment()).toMatchSnapshot();
})


