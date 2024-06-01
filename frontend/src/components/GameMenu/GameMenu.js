import React, { useState, useEffect } from "react";
import { handlePoints, applyColorChanges, applyHoverColorChanges } from "./PointsController";





const GameMenu = ({ handleClickMainMenu }) => {


    const playSoundSFX = (soundPath) => {
        const audioElement = document.getElementById('audioRefSFX');
        audioElement.src = soundPath;
        audioElement.play();
    };
    const playSound = (soundPath) => {
        const audioElement = document.getElementById('audioRef');
        audioElement.src = soundPath;
        audioElement.play();
    };

    const [decisionData, setDecisionData] = useState(null);
    const [factions, setFactions] = useState({
        religion: { points: 10 },
        science: { points: 10 },
        population: { points: 10 },
        protection: { points: 10 },
        economy: { points: 10 },
    });
    const [lose, setlose] = useState(false); // Estado para controlar si el jugador ha perdido
    const [playerPoints, setplayerPoints] = useState(0); // Estado para controlar si el jugador ha perdido
    const [loseFaction, setloseFaction] = useState(""); // Estado para almacenar la facción que llegó a 0
    const [shopOpen, setShopOpen] = useState(false);



    //Busqueda en la base de datos
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/decision/randomDecision`);
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
        const NPCimg = document.getElementById('NPCimg');

        const points = document.getElementById('points');

        DecisionMenu.style.transition = 'transform 2s ease';
        DecisionMenu.style.transform = 'translateY(200%)';
        NPCimg.style.transition = 'transform 2s ease';
        NPCimg.style.transform = 'translateY(200%)';

        points.style.transition = 'transform 0 ease';
        points.style.transform = 'translateY(200%)';

        const revertAnimation = () => {
            DecisionMenu.style.transform = 'translateY(0)';
            NPCimg.style.transform = 'translateY(0)';

        };
        setTimeout(revertAnimation, 1000);

        const revertButton = () => { points.style.transform = 'translateY(0)'; };
        setTimeout(revertButton, 2700);

    };

    //Seleciona una animacion nueva
    const newDecision = () => {
        fetchAnimation();
        const decisionElement = document.getElementById('decision');
        decisionElement.style.transform = 'rotate(0deg) translateX(0px)';
        decisionElement.style.boxShadow = '0 0 20px rgb(0, 0, 0)';
        //Pequño timeOut para que no se vea en pantalla como cambia de decision
        const FetchTimeout = () => {
            fetchData();
        };
        setTimeout(FetchTimeout, 1000);
    };




    // Función para manejar el hover sobre acceptPoints
    const handleAcceptPointsHover = () => {

        playSoundSFX("./resources/music/paper-sound-effect.mp3");

        if (decisionData && decisionData.acceptPoints) {
            const affectedFactions = Object.keys(decisionData.acceptPoints);
            applyHoverColorChanges(factions, decisionData.acceptPoints, affectedFactions);

            const decisionElement = document.getElementById('decision');
            decisionElement.style.transform = 'rotate(-3deg) translateX(-30px)';
            decisionElement.style.boxShadow = '0 0 20px rgb(0, 255, 0)';

        }
    };
    // Función para manejar el hover sobre declinePoints
    const handleDeclinePointsHover = () => {

        playSoundSFX("./resources/music/paper-sound-effect.mp3");

        if (decisionData && decisionData.declinePoints) {
            const affectedFactions = Object.keys(decisionData.declinePoints);
            applyHoverColorChanges(factions, decisionData.declinePoints, affectedFactions);

            const decisionElement = document.getElementById('decision');
            decisionElement.style.transform = 'rotate(3deg) translateX(30px)';
            decisionElement.style.boxShadow = '0 0 20px rgb(255, 0, 0)';
        }
    };

    // Función para manejar el leave del hover sobre acceptPoints
    const handleAcceptPointsLeave = () => {
        applyColorChanges(factions);
        const decisionElement = document.getElementById('decision');
        decisionElement.style.transform = 'rotate(0deg) translateX(0px)';
        decisionElement.style.boxShadow = '0 0 20px rgb(0, 0, 0)';
    };

    // Función para manejar el leave del hover sobre declinePoints
    const handleDeclinePointsLeave = () => {
        applyColorChanges(factions);
        const decisionElement = document.getElementById('decision');
        decisionElement.style.transform = 'rotate(0deg) translateX(0px)';
        decisionElement.style.boxShadow = '0 0 20px rgb(0, 0, 0)';

    };



    // Función para manejar el clic en acceptPoints o declinePoints
    const handlePointsClick = (points) => {

        playSoundSFX("./resources/music/paper-sound-slider.mp3");

        newDecision();
        if (points && factions) {
            const newFactions = handlePoints(factions, points);
            setFactions(newFactions); // Actualizar las facciones con los nuevos puntos
        }
        applyColorChanges(factions);
        if (!lose) {
            setplayerPoints(playerPoints + 10);
        };
    };







    //Hace que se active la primera pregunta
    useEffect(() => {
        fetchData();
        fetchAnimation();
    }, []);

    useEffect(() => {

        const islose = Object.values(factions).some(faction => faction.points <= 0);
        if (islose) {

            playSound("./resources/music/loseMusic.mp3");

            setTimeout(() => {
                playSound("./resources/music/silend.ogg");
            }, 3500);

            setlose(true);

            const loseFaction = Object.entries(factions).find(([faction, data]) => data.points <= 0);
            if (loseFaction) {
                const [factionName] = loseFaction;
                setloseFaction(factionName); // Establecer la facción que llegó a 0
            }

            const deleteTimeout = () => {
                const points = document.getElementById('points');
                const DecisionMenu = document.getElementById('DecisionMenu');
                DecisionMenu.remove();
                points.remove();
            };
            setTimeout(deleteTimeout, 1000);

            const userEmail = localStorage.getItem('email');
            if (userEmail) {

                // Envía la solicitud de actualización si la puntuación actual es mayor que la anterior
                const updateMaxScore = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/update/${userEmail}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                maxscore: playerPoints // Actualiza el maxscore con la puntuación actual del jugador
                            })
                        });
                        if (!response.ok) {
                            throw new Error('No se pudo actualizar la puntuación máxima del usuario');
                        }
                        console.log('La puntuación máxima del usuario se ha actualizado correctamente');
                    } catch (error) {
                        console.error('Error al actualizar la puntuación máxima del usuario:', error);
                    }
                };

                updateMaxScore(); // Llama a la función para enviar la solicitud de actualización
            }

        }
    }, [factions, playerPoints]);



    return (
        <div id='GameMenu'>
            <div id="LateralMenu">
                <div id="poitsMenu">
                    <h1>POINTS</h1>
                    <p>{playerPoints} </p>
                </div>
               
               {/* MENU DE TIENDA */}
               {/* 
                <div id="shopMenu" onClick={() => setShopOpen(!shopOpen)} >
                    <img src="./resources/img/shopIcon.png" alt="Shop" />
                </div>
                */}



            </div>
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
                <div id="NPCimg">
                    <img src={decisionData ? decisionData.NpcImg : "./resources/NPCs/villagers/8.png"} alt="" />
                </div>
                <div id="decision">
                    <h2>{decisionData ? decisionData.title : "Loading..."}</h2>
                    <p>{decisionData ? decisionData.description : "Loading..."}</p>
                </div>
            </div>

            <div id="points">

                <div id="acceptPoints" onClick={() => handlePointsClick(decisionData.acceptPoints)} onMouseEnter={handleAcceptPointsHover} onMouseLeave={handleAcceptPointsLeave} />
                <div id="declinePoints" onClick={() => handlePointsClick(decisionData.declinePoints)} onMouseEnter={handleDeclinePointsHover} onMouseLeave={handleDeclinePointsLeave} />

            </div>

            {shopOpen && (
                <div className="shop-menu">
                    <h1>SHOP</h1>

                    <div>
                        <img src="./resources/img/icon.png" />
                        <h2>Jousting tournament</h2>
                        <button /*onClick={() => }*/>-5 economy</button>
                    </div>
                </div>

            )}



            {lose && (
                <div className="loss-menu">
                    <h1>LOSE</h1>

                    <p>The <b>{loseFaction}</b> faction fell to 0. Now you will suffer the consequences...</p>
                    <p className="playerPoints">Your points <br /> <b>{playerPoints}</b></p>
                    <button onClick={handleClickMainMenu}><p>Main menu</p></button>

                </div>
            )}



            {/*
                        //////  CONTENIDO DESCARTADO PARA VER CUANTO SUMA Y RESTA CASA DECICION //////

                                   <h1>ACCEPT</h1>
                    {decisionData && decisionData.acceptPoints && (
                        <ul className="decisionList">
                            {Object.entries(decisionData.acceptPoints).map(([type, value]) => (
                                <li key={type}>{type}: {value}</li>
                            ))}
                        </ul>
                    )}


                <h1>DECLINE</h1>
                    {decisionData && decisionData.declinePoints && (
                        <ul className="decisionList">
                            {Object.entries(decisionData.declinePoints).map(([type, value]) => (
                                <li key={type}>{type}: {value}</li>
                            ))}
                        </ul>
                    )}
                */}



        </div>
    );
};

export default GameMenu;