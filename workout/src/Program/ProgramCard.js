import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const ProgramCard = ({ name, exercises, id }) => {


    return (
        <>
        <Link to={`/browse/${name}`}>
            <h2>{name}</h2>
        </Link>
            {exercises.map(e => (
                <p key={e}>{e}</p>
            ))}
        
        </>
    )
}

export default ProgramCard