import React from 'react';

function UserProfileMenu() {
  // Supongamos que tienes el nombre de usuario y la URL de la foto de perfil en el estado o en el contexto de la aplicación
  const username = 'JohnDoe';
  const profileImageUrl = 'https://example.com/profile-image.jpg';

  return (
    <div className="user-profile-menu">
      <div className="user-profile-info">
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
        <span className="username">{username}</span>
      </div>
      {/* Aquí puedes agregar más elementos de menú o funcionalidades, como un botón para cerrar sesión */}
    </div>
  );
}

export default UserProfileMenu;
