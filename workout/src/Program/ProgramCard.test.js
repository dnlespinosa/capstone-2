import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProgramCard from "./ProgramCard";
import { UserProvider } from "../testUtils";



describe('<ProgramCard />', () => {


    const exercises = [
        'Barbell Bench Press',
        'Dumbbell Alternating Single Arm Press',
        'Cable Pec Fly',
        'Cable Overhead Tricep Extension',
        'Push Up'
    ]

    // smoke test
    it("renders without crashing", function () {
        render(
            <MemoryRouter>
            <UserProvider>
                <ProgramCard />
            </UserProvider>
            </MemoryRouter>,
        );
    });
  
    // snapshot 
    it('matches snapshot', function() {
        const { asFragment } = render(
                <MemoryRouter>
                    <UserProvider>
                        <ProgramCard exercises={exercises}/>
                    </UserProvider>
                </MemoryRouter>
            )
        expect(asFragment()).toMatchSnapshot();
        })
    })

