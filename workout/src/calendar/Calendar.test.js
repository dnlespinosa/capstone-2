import React from "react";
import { render } from "@testing-library/react";
import Calendar from "./Calendar";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Calendar />
        </UserProvider>
      </MemoryRouter>,
  );
});
