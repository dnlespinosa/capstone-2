import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SingleWorkout from "./SingleWorkout";
import { UserProvider } from "../testUtils";


// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <SingleWorkout />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
    const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <SingleWorkout />
                </UserProvider>
            </MemoryRouter>
        )
    expect(asFragment()).toMatchSnapshot();
  })




