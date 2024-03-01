import React, { useState, useEffect } from "react";

const GameMenu = ({ handleClickMainMenu }) => {
    const [decisionData, setDecisionData] = useState(null);

    //Busqueda en la base de datos
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
    

    //Animacion para subir y bajar
    const fetchAnimation = () => {
    const DecisionMenu = document.getElementById('DecisionMenu');
    const points = document.getElementById('points');

    DecisionMenu.style.transition = 'transform 2s ease';
    DecisionMenu.style.transform = 'translateY(200%)';

    points.style.transition = 'transform 2.5s ease';
    points.style.transform = 'translateY(200%)';

    const revertAnimation = () => {
        DecisionMenu.style.transform = 'translateY(0)';
        points.style.transform = 'translateY(0)';
    };
    setTimeout(revertAnimation, 2000); 
    };

    //Seleciona una animacion nueva
    const newDecision = () => {
            fetchAnimation();
            //Pequño timeOut para que no se vea en pantalla como cambia de decision
        const FetchTimeout = () => {
            fetchData();
        };
        setTimeout(FetchTimeout, 2000); 
    };

    //Hace que se active la primera pregunta
    useEffect(() => {
        fetchData(); 
        fetchAnimation();
    }, []);


    return (
        <div id='GameMenu'>
            <div id='MainMenuButton' onClick={handleClickMainMenu}>Main menu</div>

            <button onClick={newDecision}>siguiente pregunta</button>
            <div id="DecisionMenu">
                <div className="NPCimg">
                    <img src="./resources/NPCs/villagers/8.png" alt="" />
                </div>
                <div id="decision">
                    <h2>{decisionData ? decisionData.title : "Loading..."}</h2>
                    <p>{decisionData ? decisionData.description : "Loading..."}</p>
                </div>
            </div>
            <div id="points">
                <div id="acceptPoints">
                    <h1>ACCEPT</h1>
                    {decisionData && decisionData.acceptPoints && (
                        <ul  className="decisionList">
                            {Object.entries(decisionData.acceptPoints).map(([type, value]) => (
                                <li key={type}>{type}: {value}</li>
                            ))} 
                        </ul>
                    )}
                </div>
                <div id="declinePoints">
                    <h1>DECLINE</h1>
                    {decisionData && decisionData.declinePoints && (
                        <ul className="decisionList">
                            {Object.entries(decisionData.declinePoints).map(([type, value]) => (
                                <li key={type}>{type}: {value}</li>
                            ))} 
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameMenu;