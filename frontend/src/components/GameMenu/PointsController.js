// pointsController.js

// Función para manejar los puntos
export const handlePoints = (factions, points) => {
    let newFactions = { ...factions };

    if (points) {
        Object.entries(points).forEach(([faction, value]) => {
            // Actualizar los puntos de la facción
            newFactions[faction].points += value;

            // Verificar si la facción llegó a 0 puntos o menos
            if (newFactions[faction].points <= 0) {
                console.log(`PERDISTE, la facción ${faction} llegó a 0`);
                newFactions[faction].points = 0; // Establecer los puntos en 20
            }

            // Verificar si la facción llegó a 20 o más puntos
            if (newFactions[faction].points >= 20) {
                newFactions[faction].points = 20; // Establecer los puntos en 20
            }
        });
    }

    return newFactions;
};

// Función para verificar la puntuación de las facciones y aplicar cambios de color
export const applyColorChanges = (factions) => {

    Object.entries(factions).forEach(([faction, data]) => {

        const pointsPorcent = (data.points / 2) * 10;

        const factionElement = document.getElementById(faction);
        if (factionElement) {
            if (data.points > 16) {
                factionElement.style.background = `linear-gradient(0deg, #1EC300 0%, #1EC300 ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else if (data.points >= 12 && data.points <= 16) {
                factionElement.style.background = `linear-gradient(0deg, yellow 0%, yellow ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else if (data.points >= 7 && data.points <= 11) {
                factionElement.style.background = `linear-gradient(0deg, orange 0%, orange ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else {
                factionElement.style.background = `linear-gradient(0deg, red 0%, red ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100%)`;
                if (pointsPorcent === 0) {
                    factionElement.style.background = `#575757`;
                }
            }

            if (data.points > 19) {
                factionElement.style.boxShadow = `0 0 10px rgb(0, 200, 0)`;
            } else if (data.points < 6) {
                factionElement.style.boxShadow = `0 0 10px rgb(200, 0, 0)`;
            }else{
                factionElement.style.boxShadow = `0 0 20px rgb(0, 0, 0)`;
            }

        }
    });
};




export const applyHoverColorChanges = (factions, pointsChange, affectedFactions) => {

    const previousPointsMap = {}; // Almacenar los puntos anteriores antes de comenzar la animación

    affectedFactions.forEach(faction => {
        previousPointsMap[faction] = factions[faction].points;

        const newPoints = factions[faction].points + (pointsChange[faction] || 0);
        const pointsPorcent = (newPoints / 20) * 100; // Calcular el porcentaje basado en el nuevo valor
        const factionElement = document.getElementById(faction);

        if (factionElement) {
            // Aplicar directamente el color de fondo final sin animación

            if(newPoints >16) {
                factionElement.style.background = `linear-gradient(0deg, #1EC300 0%, #1EC300 ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else if (newPoints >= 12 && newPoints <= 16) {
                factionElement.style.background = `linear-gradient(0deg, yellow 0%, yellow ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else if (newPoints >= 7 && newPoints <= 11) {
                factionElement.style.background = `linear-gradient(0deg, orange 0%, orange ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;
            } else if (newPoints >= 1 && newPoints <= 6) {
                factionElement.style.background = `linear-gradient(0deg, red 0%, red ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100%)`;
            } else {
                factionElement.style.background = `#383838`;
            }

            if (newPoints > 19) {
                factionElement.style.boxShadow = `0 0 10px rgb(0, 200, 0)`;
            } else if (newPoints < 6) {
                factionElement.style.boxShadow = `0 0 10px rgb(200, 0, 0)`;
            }else{
                factionElement.style.boxShadow = `0 0 20px rgb(0, 0, 0)`;
            };
        }
    });

    // Almacenar los puntos anteriores antes de comenzar la animación
    return previousPointsMap;
};

