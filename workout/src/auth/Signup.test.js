import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Signup from "./Signup";
import { UserProvider } from "../testUtils";



it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Signup />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Signup />
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});