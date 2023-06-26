import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const ProgramCard = ({ name, exercises, id }) => {

    return (
        <>
        {exercises ? 
            <div id={name} style={{backgroundColor: 'white', border: '5px solid #2a2a2a', color: '#2a2a2a', padding: '20px', margin: '10px 500px 10px 500px'}}>
            <Link to={`/browse/${name}`}>
                <h2>{name}</h2>
            </Link>
            
                {exercises?.map(e => (
                    <p key={e}>{e}</p>
                ))}
            </div> : null
        }
        
        </>
    )
}

export default ProgramCard