// UserProfileMenu.js
import React, { useState, useEffect } from 'react';

function UserProfileMenu({ userEmail }) {
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/data/${userEmail}`, {
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
    setMenuOpen(!menuOpen);
    const profileImage = document.querySelector('.profile-image');
    profileImage.classList.toggle('menu-open', !menuOpen);
};

  if (!userData) {
    return null;
  }

  return (
    <div className="user-profile-menu">
      <div className="user-profile-info" onClick={toggleMenu}>
        <img src={userData.image} alt="Profile" className="profile-image" />
      </div>
      {menuOpen && (
        <div className="user-details">
          <p>Username</p>
          <span className="username">{userData.username}</span>
          <p>Email</p>
          <span className="user-email">{userData.email}</span>
          <p>Best score</p>
          <span className="user-score">{userData.maxscore}</span>
          <div className="user-id">ID: {userData._id}</div>
        </div>
      )}
    </div>
  );
}

export default UserProfileMenu;
