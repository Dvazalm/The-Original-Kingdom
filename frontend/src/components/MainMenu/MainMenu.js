import React from "react";

const MainMenu = ({ handleClickStart }) => {
    return (
        <div id='MainMenu'>
            <div className="logo">
                <img src="./resources/img/logoLetters.png" className="logoIMG" alt="Logo" />
            </div>
            <div className='startDiv'>
                <div className='startButton' onClick={handleClickStart}>START</div>
            </div>
        </div>
    );
};

export default MainMenu;