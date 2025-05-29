import React, { useState } from 'react';
import OKRForm from './OKRForm';
import LoadingSpinner from './LoadingSpinner';
import { generateSmartGoal, retry } from '@/lib/api';

interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

interface OKRContainerProps {
  onSubmit: (data: OKRData, aiResult?: any, isFallback?: boolean) => void;
}

const OKRContainer: React.FC<OKRContainerProps> = ({ onSubmit }) => {  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const handleFormSubmit = async (data: OKRData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use retry mechanism for more reliable API calls
      const response = await retry(() => generateSmartGoal(data));
      
      if (response.success) {
        setResult(response.result);
        setRetryCount(0); // Reset retry count on success
        // Pass both the form data and AI result to the parent component
        onSubmit(data, response.result, response.isFallback);
      } else {
        setError(response.error || 'Failed to generate SMART goal');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      setError('Maximum retry attempts reached. Please try again later.');
      return;
    }
    
    setRetryCount(prevCount => prevCount + 1);
    setError(null);
    setLoading(true);
    
    try {
      const response = await generateSmartGoal(result);
      
      if (response.success) {
        setResult(response.result);
        onSubmit(result, response.result, response.isFallback);
        setRetryCount(0); // Reset retry count on success
      } else {
        setError(`Retry failed (${retryCount + 1}/${maxRetries}): ${response.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setError(`Retry failed (${retryCount + 1}/${maxRetries}): An unexpected error occurred`);
      console.error('Error during retry:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <OKRForm onSubmit={handleFormSubmit} isLoading={loading} />
        {loading && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-md flex flex-col items-center justify-center">
          <LoadingSpinner size="large" text="Generating your SMART goals..." />
          <p className="text-blue-600 mt-3">This may take a few moments...</p>
        </div>
      )}
        {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          <div className="flex flex-col gap-3">
            <p>{error}</p>
            <button
              onClick={handleRetry}
              className="self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Generated SMART Goal</h3>
          <div className="prose prose-blue max-w-none">
            {typeof result === 'string' ? (
              <p>{result}</p>
            ) : (
              Object.entries(result).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <h4 className="text-lg font-medium text-slate-800">{key}</h4>
                  <p className="text-slate-600">{String(value)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OKRContainer;
