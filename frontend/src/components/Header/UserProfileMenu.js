import React, { useState, useEffect } from 'react';

function UserProfileMenu({ userEmail, handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuUpdateOpen, setMenuUpdateOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // Estado para controlar si las contraseñas coinciden

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/data/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userEmail]);

  const toggleMenu = () => {
    if (!menuUpdateOpen) {
      setMenuOpen(!menuOpen);
      const profileImage = document.querySelector('.profile-image');
      profileImage.classList.toggle('menu-open', !menuOpen);
    };
  };

  const toggleUpdateMenu = () => {
    setMenuOpen(!menuOpen);
    setMenuUpdateOpen(!menuUpdateOpen);
    const profileImage = document.querySelector('.profile-image');
    profileImage.classList.toggle('menu-open', !menuOpen);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Verificar que las contraseñas coincidan

    if (event.target.password.value !== event.target.confirmPassword.value) {
      setPasswordMatch(false);
      return;
    }

    // Aquí debes implementar la lógica para enviar los datos actualizados del usuario al backend.
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/update/${userData.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
          image: event.target.image.value,
          // maxscore y rol no se deben cambiar
        }),
      });

      if (response.ok) {
        setMenuOpen(!menuOpen);
        // Aquí puedes manejar la respuesta exitosa del servidor
        console.log('User data updated successfully');
        // Puedes cerrar el menú de actualización después de actualizar los datos
        setMenuUpdateOpen(false);
      } else {
        throw new Error('Error updating user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }


    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/data/${userData.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        throw new Error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    };


  };

  return (
    <div className="user-profile-menu">
      <div className="user-profile-info" onClick={toggleMenu}>
        <img src={userData?.image} alt="Profile" className="profile-image" />
      </div>
      {menuOpen && (
        <div className="user-details">
          <p>Username</p>
          <span className="username">{userData?.username}</span>
          {/* 
          <p>Email</p>
          <span className="user-email">{userData?.email}</span>
          */}
          <p>Best score</p>
          <span className="user-score">{userData?.maxscore}</span>
          <button onClick={toggleUpdateMenu} className='UpdateProfile'><p>Edit</p> <img alt='' className='UpdateProfileImg' src='./resources/img/setting.png' /></button>

          <button className='logoutButton' onClick={handleLogout}><p>Logout</p> <img alt='' className='logoutLogo' src='./resources/img/logoutLogo.png' /></button>
          <div className="user-id">ID: {userData?._id}</div>
        </div>
      )}

      {menuUpdateOpen && (
        <div className="update-profile-menu">
          <button className='closeEditMenu' onClick={() => setMenuUpdateOpen(!menuUpdateOpen)}>X</button>
          <form onSubmit={handleFormSubmit}>
            <h2>Update Profile</h2>
            <p className='infoUpdateText'>It is not necessary to complete all fields to edit a value.</p>
            <label htmlFor="username">Edit username</label>
            <input type="text" id="username" name="username" placeholder=''/>

            <label htmlFor="password">Update password</label>
            <input type="password" id="password" name="password" placeholder=''/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder=''/>

            <label htmlFor="image">Change profile picture</label>
            <input type="text" id="image" name="image" placeholder='Url or link'/>

            <button type="submit" className='submit'>Submit</button>
            {!passwordMatch && <p className="error-message">Passwords do not match</p>}     
            {passwordMatch && <p className="error-message">&nbsp;</p>}
          </form>


        </div>
      )}
    </div>
  );
}

export default UserProfileMenu;
