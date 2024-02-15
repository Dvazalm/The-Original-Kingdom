import React, { useState, useEffect } from 'react';

function UserProfileMenu({ userEmail }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/data/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Aquí podrías enviar el token de autorización necesario
          },
          // No es necesario enviar ningún cuerpo en la solicitud GET
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

  if (!userData) {
    return null; // Puedes retornar un spinner o un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="user-profile-menu">
      <div className="user-profile-info">
        <img src={userData.image} alt="Profile" className="profile-image" />
        <span className="username">{userData.username}</span>
        <span className="user-email">{userData.email}</span>
      </div>
    </div>
  );
}

export default UserProfileMenu;
