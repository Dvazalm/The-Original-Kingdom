import React, { useState, useEffect } from "react";
import { handlePoints, applyColorChanges } from "./PointsController";

const GameMenu = () => {
    const [decisionData, setDecisionData] = useState(null);
    const [factions, setFactions] = useState({
        religion: {
            points: 10
        },
        science: {
            points: 10
        },
        population: {
            points: 10
        },
        protection: {
            points: 10
        },
        economy: {
            points: 10
        },

    });

    //Busqueda en la base de datos
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/decision/randomDecision`);
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

    // Función para manejar el clic en acceptPoints o declinePoints
    const handlePointsClick = (points) => {
        newDecision();
        if (points && factions) {
            const newFactions = handlePoints(factions, points);
            setFactions(newFactions); // Actualizar las facciones con los nuevos puntos
        }
        applyColorChanges(factions);
    };


    return (
        <div id='GameMenu'>

            <div id="factionsBlock">
                <div className="faction" id="religion">
                    <img alt="religion" src="./resources/factionLogo/religion.png" />
                    {/* {factions.religion.points} */}
                </div>
                <div className="faction" id="population">
                    <img alt="population" src="./resources/factionLogo/population.png" />
                    {/* {factions.population.points} */}
                </div>
                <div className="faction" id="science">
                    <img alt="science" src="./resources/factionLogo/science.png" />
                    {/* {factions.science.points} */}
                </div>
                <div className="faction" id="protection">
                    <img alt="protection" src="./resources/factionLogo/protection.png" />
                    {/* {factions.protection.points} */}
                </div>
                <div className="faction" id="economy">
                    <img alt="economy" src="./resources/factionLogo/economy.png" />
                    {/* {factions.economy.points} */}
                </div>

            </div>
            <div id="DecisionMenu">
                <div className="NPCimg">
                    <img src={decisionData ? decisionData.NpcImg : "./resources/NPCs/villagers/8.png"} alt="" />
                </div>
                <div id="decision">
                    <h2>{decisionData ? decisionData.title : "Loading..."}</h2>
                    <p>{decisionData ? decisionData.description : "Loading..."}</p>
                </div>
            </div>
            <div id="points">
                <div id="acceptPoints" onClick={() => handlePointsClick(decisionData.acceptPoints)}>
                    <h1>ACCEPT</h1>
                    {decisionData && decisionData.acceptPoints && (
                        <ul className="decisionList">
                            {Object.entries(decisionData.acceptPoints).map(([type, value]) => (
                                <li key={type}>{type}: {value}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div id="declinePoints" onClick={() => handlePointsClick(decisionData.declinePoints)}>
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