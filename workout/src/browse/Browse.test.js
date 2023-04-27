import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Browse from "./Browse";
import { UserProvider } from "../testUtils";


it("renders without crashing", function () {
    render(
        <MemoryRouter>
          <UserProvider>
            <Browse />
          </UserProvider>
        </MemoryRouter>,
    );
  });