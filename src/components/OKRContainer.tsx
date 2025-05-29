import React, { useState } from 'react';
import OKRForm from './OKRForm';
import LoadingSpinner from './LoadingSpinner';
import { generateSmartGoal, retry } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Heart } from 'lucide-react';

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

const OKRContainer: React.FC<OKRContainerProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleFormSubmit = async (data: OKRData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await retry(() => generateSmartGoal(data));

      if (response.success) {
        setResult(response.result);
        setRetryCount(0);
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
        setRetryCount(0);
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
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {typeof result === 'string' ? (
                <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                  <p className="text-slate-800 whitespace-pre-line">{result}</p>
                </div>
              ) : Array.isArray(result) ? (
                result.map((goal, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg mb-2">Goal #{index + 1}</h3>
                          <p className="text-slate-900 font-semibold">{goal.goal}</p>
                        </div>
                        {goal.description && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1">Description</h4>
                            <p className="text-slate-600 text-sm">{goal.description}</p>
                          </div>
                        )}
                        {goal.kpi && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1">KPI</h4>
                            <div className="flex items-center gap-2 text-blue-700 font-medium">
                              <TrendingUp size={16} />
                              {goal.kpi}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        {goal.topBetsAlignment && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1">Company Alignment</h4>
                            <p className="text-slate-600 text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                              {goal.topBetsAlignment}
                            </p>
                          </div>
                        )}
                        {goal.frameworkAlignment && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1">Framework Alignment</h4>
                            <p className="text-slate-600 text-sm bg-green-50 p-2 rounded border-l-4 border-green-400">
                              {goal.frameworkAlignment}
                            </p>
                          </div>
                        )}
                        {goal.coreValues && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-2">
                              <Heart size={16} className="text-red-500" />
                              Core Values Alignment
                            </h4>
                            <p className="text-slate-600 text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                              {goal.coreValues}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(result).map(([key, value], index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{key}</h3>
                    <p className="text-slate-600 whitespace-pre-line">{String(value)}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OKRContainer;
