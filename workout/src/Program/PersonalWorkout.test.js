import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PersonalWorkout from "./PersonalWorkout";
import { UserProvider } from "../testUtils";


// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <PersonalWorkout />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
    const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <PersonalWorkout />
                </UserProvider>
            </MemoryRouter>
        )
    expect(asFragment()).toMatchSnapshot();
  })