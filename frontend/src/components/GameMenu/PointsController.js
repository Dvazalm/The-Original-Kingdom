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
                console.log(`La facción ${faction} ha llegado a 20 puntos`);
                newFactions[faction].points = 20; // Establecer los puntos en 20
            }
        });
    }

    return newFactions;
};

// Función para verificar la puntuación de las facciones y aplicar cambios de color
export const applyColorChanges = (factions) => {
    Object.entries(factions).forEach(([faction, data]) => {
        const factionElement = document.getElementById(faction);
        if (factionElement) {
            if (data.points > 16) {
                factionElement.style.background = "green";
            } else if (data.points >= 7 && data.points <= 16) {
                factionElement.style.background = "orange";
            } else {
                factionElement.style.background = "red";
            }
        }
    });
};
