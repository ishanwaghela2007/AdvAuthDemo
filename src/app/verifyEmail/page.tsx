"use client";
import axios from "axios";
import { request } from "http";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Token is missing.");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      {loading && <p className="text-lg text-gray-600">Verifying your email...</p>}

      {!loading && verified && (
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified Successfully!</h1>
          <Link href="/login" className="text-blue-600 hover:underline">
            Click here to login
          </Link>
        </div>
      )}

      {!loading && error && (
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
          <p className="text-gray-700">{error}</p>
          <Link href="/resend-verification" className="text-blue-600 hover:underline mt-4 block">
            Resend Verification Email
          </Link>
        </div>
      )}
    </div>
  );
}
