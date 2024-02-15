
export const handleLoginSuccess = (setIsLoggedIn, setShowLoginForm) => {
    console.log("El usuario se ha logueado correctamente");
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };
  
  export const handleLoginFailure = () => {
    console.log("No se pudo iniciar sesión correctamente");
  };
  
  export const handleToggleForm = (formType, setShowRegisterForm, setShowLoginForm) => {
    if (formType === "register") {
      setShowRegisterForm(prevState => !prevState);
      setShowLoginForm(false);
    } else if (formType === "login") {
      setShowLoginForm(prevState => !prevState);
      setShowRegisterForm(false);
    }
  };
  