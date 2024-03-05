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

        const pointsPorcent = (data.points / 2) * 10;

        const factionElement = document.getElementById(faction);
        if (factionElement) {
            if (data.points > 16) {
                factionElement.style.background = `linear-gradient(0deg, green 0%, green ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;

            } else if (data.points >= 7 && data.points <= 16) {
                factionElement.style.background = `linear-gradient(0deg, orange 0%, orange ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100% )`;

            } else {
                factionElement.style.background = `linear-gradient(0deg, red 0%, red ${pointsPorcent}%, grey ${pointsPorcent}%, grey 100%)`;
                if(pointsPorcent === 0){
                    factionElement.style.background = `#575757`;
                }
            }
        }
    });
};




// Función para manejar el hover y cambiar gradualmente el color solo de las facciones afectadas
export const applyHoverColorChanges = (factions, pointsChange, affectedFactions) => {

    const previousPointsMap = {}; // Almacenar los puntos anteriores antes de comenzar la animación
    const velocidad = 5;

    affectedFactions.forEach(faction => {
        previousPointsMap[faction] = factions[faction].points;
        
        const newPoints = factions[faction].points + (pointsChange[faction] || 0);
        const pointsPorcent = (newPoints / 20) * 100; // Calcular el porcentaje basado en el nuevo valor
        const factionElement = document.getElementById(faction);
        
        if (factionElement) {
            let currentPercentage = (previousPointsMap[faction] / 20) * 100; // Iniciar la animación desde el valor anterior
            const increment = (pointsPorcent - currentPercentage) / 10; // Dividir el cambio total en 10 pasos
            
            const interval = setInterval(() => {
                // Incrementar gradualmente el porcentaje del color de fondo
                currentPercentage += increment;
                if (currentPercentage >= pointsPorcent) {
                    clearInterval(interval); // Detener la animación cuando alcance el porcentaje deseado
                }
                
                // Aplicar el color de fondo actualizado
                if (newPoints > 16) {
                    factionElement.style.background = `linear-gradient(0deg, green 0%, green ${currentPercentage}%, grey ${currentPercentage}%, grey 100% )`;
                } else if (newPoints >= 7 && newPoints <= 16) {
                    factionElement.style.background = `linear-gradient(0deg, orange 0%, orange ${currentPercentage}%, grey ${currentPercentage}%, grey 100% )`;
                } else if (newPoints >= 1 && newPoints <= 6) {
                    factionElement.style.background = `linear-gradient(0deg, red 0%, red ${currentPercentage}%, grey ${currentPercentage}%, grey 100%)`;
                } else {
                    factionElement.style.background = `#383838`;
                }
            }, velocidad); // Cambiar el color cada 50ms para crear una animación suave
        }
    });
    
    // Almacenar los puntos anteriores antes de comenzar la animación
    return previousPointsMap;
};

