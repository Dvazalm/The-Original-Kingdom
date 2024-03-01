import React, { useState, useEffect } from "react";

const GameMenu = ({ handleClickMainMenu }) => {
    const [decisionData, setDecisionData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/decision/data`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la decisión');
                }
                const data = await response.json();
                setDecisionData(data);
            } catch (error) {
                console.error('Error al obtener la decisión:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div id='GameMenu'>
            <div id='MainMenuButton' onClick={handleClickMainMenu}>Main menu</div>
            <div id="DecisionMenu">
                <div className="NPCimg">
                    <img src="./resources/NPCs/villagers/8.png" alt="" />
                </div>
                <div id="decision">
                    <h2>{decisionData ? decisionData.title : "Loading..."}</h2>
                    <p>{decisionData ? decisionData.description : "Loading..."}</p>

                </div>
                <div id="points">
                    <div id="acceptPoints">
                        <h1>ACCEPT</h1>
                        {decisionData && decisionData.acceptPoints && (
                            <ul>
                                {Object.entries(decisionData.acceptPoints).map(([type, value]) => (
                                    <li key={type}>{type}: {value}</li>
                                ))} 
                            </ul>
                        )}
                    </div>
                    <div id="declinePoints">
                        <h1>REFUSE</h1>
                        Ejemplo 1
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameMenu;
