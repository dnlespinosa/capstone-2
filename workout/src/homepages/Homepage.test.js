import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
          <UserProvider>
            <Homepage />
          </UserProvider>
        </MemoryRouter>,
    );
  });

  // snapshot 
it('matches snapshot', function() {
  const { asFragment } = render(
          <MemoryRouter>
              <UserProvider>
                  <Homepage />
              </UserProvider>
          </MemoryRouter>
      )
  expect(asFragment()).toMatchSnapshot();
})

// it('queries', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <UserProvider>
//           <Homepage />
//       </UserProvider>
//     </MemoryRouter>,
//   )

//   console.log(getByText('Welcome To The Workout App', {exact: false}))
// })