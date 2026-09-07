import React from "react";

function LoadingPage() {
  return (
    <>
      <style>{`
        .loading-page {
          width: 100%;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          background: #07150f;
          color: #d9f99d;

          font-family: Arial, sans-serif;
        }

        .loading {
          text-align: center;
        }

        .spinner {
          width: 30px;
          height: 30px;

          margin: 0 auto 15px;

          border: 3px solid #294436;
          border-top: 3px solid #84cc16;

          border-radius: 50%;

          animation: spin 0.8s linear infinite;
        }

        .loading p {
          margin: 0;

          font-size: 13px;
          letter-spacing: 2px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="loading-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>LOADING...</p>
        </div>
      </div>
    </>
  );
}

export default LoadingPage;