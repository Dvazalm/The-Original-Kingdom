import React from 'react';

const MainMenu = ({ handleClickStart }) => {

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

    
    return (
        <div id='MainMenu'>
            <div className="logo">
                <img src="./resources/img/logoLetters.png" className="logoIMG" alt="Logo" />
            </div>
            <div className='startDiv'>
                <div className='startButton' onClick={() => { handleClickStart(); playSoundSFX('./resources/music/silend.ogg'); playSound('./resources/music/menuMusic.mp3')}}>START</div>
            </div>

        </div>
    );
};

export default MainMenu;
