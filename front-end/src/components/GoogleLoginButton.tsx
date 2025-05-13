"use client";
import { useEffect } from "react";

const GoogleLoginButton = ({ isSignUp }: { isSignUp: boolean }) => {
  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    // Inisialisasi akun Google
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response) => {
        const token = response.credential;
        console.log("Token dari Google:", token);

        try {
          const res = await fetch("http://localhost:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          const data = await res.json();
          console.log("Login sukses:", data);
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch (err) {
          console.error("Gagal login:", err);
        }
      },
    });

    // Render tombol login Google di elemen dengan ID ini
    window.google.accounts.id.renderButton(
      document.getElementById("google-button")!,
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        logo_alignment: "left",
        text: isSignUp ? "signup_with" : "signin_with",
      }
    );
  }, [isSignUp]);

  return <div id="google-button" className="flex justify-center mt-4" />;
};

export default GoogleLoginButton;
