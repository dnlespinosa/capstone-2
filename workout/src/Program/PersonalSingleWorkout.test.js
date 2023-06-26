import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PersonalSingleWorkout from "./PersonalSingleWorkout";
import { UserProvider } from "../testUtils";



describe('<PersonalSingleWorkout />', () => {


    const exercise = {
        Category: 'Barbell', 
        Difficulty: 'Beginner', 
        Force: 'Pull',
        Grips: 'Overhand', 
        exercise_name: 'Barbell Pronated Row', 
        id: 47,
        steps: [
            "Grab the barbell with an overhand grip. Hinge forward while keeping your back flat until your torso is about parallel with the ground.",
            "Let your arms hang freely.",
            "Pull the bar to your torso while tucking your elbows in slightly.",
            "Extend your elbows fully before initiating the next rep."
        ], 
        target: {
            Primary: ['Lats'],
            Secondary: ['Biceps']
        }, 
        videoURL: [
            "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-pronated-row-front.mp4#t=0.1",
            "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-pronated-row-side.mp4#t=0.1"
        ]
    }

    // smoke test
    it("renders without crashing", function () {
        render(
            <MemoryRouter>
            <UserProvider>
                <PersonalSingleWorkout exercise={exercise}/>
            </UserProvider>
            </MemoryRouter>,
        );
    });
  
    // snapshot 
    it('matches snapshot', function() {
        const { asFragment } = render(
                <MemoryRouter>
                    <UserProvider>
                        <PersonalSingleWorkout exercise={exercise}/>
                    </UserProvider>
                </MemoryRouter>
            )
        expect(asFragment()).toMatchSnapshot();
        })

    it('adder', () => {
        const { getByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <PersonalSingleWorkout exercise={exercise}/>
                </UserProvider>
            </MemoryRouter>
        )
        console.log(getByText('Complete Exercise'))
    })

})

