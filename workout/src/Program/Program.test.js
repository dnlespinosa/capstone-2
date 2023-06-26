import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Program from "./Program";
import { UserProvider } from "../testUtils";


// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Program />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
    const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <Program />
                </UserProvider>
            </MemoryRouter>
        )
    expect(asFragment()).toMatchSnapshot();
  })