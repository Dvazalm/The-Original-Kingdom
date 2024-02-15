import React, { useState, useEffect } from 'react';

function UserProfileMenu({ userEmail }) {
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/petition/userImg/${userEmail}`);
        if (response.ok) {
          const imageUrl = await response.text();
          setProfileImageUrl(imageUrl);
        } else {
          console.error('Error al obtener la imagen del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
      }
    };

    fetchUserImage();
  }, [userEmail]);

  return (
    <div className="user-profile-menu">
      <div className="user-profile-info">
        <img src={profileImageUrl} alt={profileImageUrl} className="profile-image" />
        <span className="username">{username}</span> 
      </div>
    </div>
  );
}

export default UserProfileMenu;
