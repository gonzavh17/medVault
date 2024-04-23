import React from "react";
import { Image } from "../image";

function GoogleLogin() {
  return (
<div className="flex justify-center items-center">
  <a href="http://localhost:8080/auth/google" className="flex items-center text-blue-500 hover:underline">
    <div className="bg-blue-500 rounded-full p-2 mr-2 shadow-md"> {/* Agrega la clase shadow-md para una sombra */}
      <img src={Image.googleSvg} alt="Google Logo" className="w-6 h-6" />
    </div>
    <span>Registrarse con Google</span>
  </a>
</div>
  );
}

export default GoogleLogin;
