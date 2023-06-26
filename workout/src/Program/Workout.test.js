import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import Workout from "./Workout";
import { UserProvider } from "../testUtils";




// smoke test
it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Workout />
        </UserProvider>
      </MemoryRouter>,
  );
});

// snapshot 
it('matches snapshot', function() {
    const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <Workout />
                </UserProvider>
            </MemoryRouter>
        )
    expect(asFragment()).toMatchSnapshot();
  })






