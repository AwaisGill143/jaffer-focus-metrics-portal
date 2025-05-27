
import React, { useState } from 'react';
import Header from '@/components/Header';
import OKRForm from '@/components/OKRForm';
import AWResults from '@/components/AWResults';
import Login from '@/components/Login';

interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submittedOKR, setSubmittedOKR] = useState<OKRData | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOKRSubmit = (data: OKRData, result?: any) => {
    console.log('OKR submitted:', data);
    setSubmittedOKR(data);
    if (result) {
      console.log('AI result received:', result);
      setAiResult(result);
    }
  };
  const handleNewOKR = () => {
    setSubmittedOKR(null);
    setAiResult(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSubmittedOKR(null);
    setAiResult(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8 px-4">

        {/* this condition will occur when we have to prompt the AI to generate the goals  */}       
         {!submittedOKR ? (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Define Your Objectives & Key Results
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Create measurable goals aligned with business objectives. Our system will generate 
                SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and KPIs to help you achieve success.
              </p>
            </div>
            <OKRForm onSubmit={handleOKRSubmit} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Your SMART Goals Action Plan
              </h2>
              <p className="text-slate-600 mb-4">
                Below are your generated SMART goals and key performance indicators.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleNewOKR}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
                >
                  Create New OKR
                </button>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-semibold underline transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Display the generated SMART goal */}
            <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Generated SMART Goal</h3>
              <div className="prose prose-blue max-w-none">
                {aiResult ? (
                  typeof aiResult === 'string' ? (
                    <p>{aiResult}</p>
                  ) : (
                    Object.entries(aiResult).map(([key, value]) => (
                      <div key={key} className="mb-4">
                        <h4 className="text-lg font-medium text-slate-800">{key}</h4>
                        <p className="text-slate-600">{String(value)}</p>
                      </div>
                    ))
                  )
                ) : (
                  <p>Your goal has been submitted successfully!</p>
                )}
              </div>
            </div>
          </div>
        )}
        
      </main>

      <footer className="bg-slate-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-300">
            © {new Date().getFullYear()} Jaffer Business System - OKR Management Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
