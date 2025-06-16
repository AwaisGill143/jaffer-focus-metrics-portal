import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Target, Heart, Download, FileJson } from 'lucide-react';
import { exportToPdf, exportToJson } from '@/lib/export';
import { SmartGoalResultsProps } from '@/types/index'; // Assuming you have a types file for OKRData and SmartGoalResultsProps
import { useState, useEffect } from "react"


const SmartGoalResults: React.FC<SmartGoalResultsProps> = ({ okrData, aiResult, isFallback = false }) => {

  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExportToPdf = () => {
    exportToPdf('smart-goal-results');
  };

  const handleExportToJson = () => {
    exportToJson(okrData, aiResult);
  };
  const handleSendSelectedGoal = (index: number) => {
    try {
      setLoading(true);
      setError(null);

      // If a goal is already selected, deselect it
      if (selectedGoalIndex === index) {
        setSelectedGoalIndex(null);
        setLoading(false);
      }
      setSelectedGoalIndex(index);
      console.log("Index of user selected goal:", index);
      
      // complete the logic to send the selected goal index and result
      // const response = await sendGoalSelection(index, result);
    } catch (err: any) {
      console.error('Error selecting goal:', err);
      setError('An error occurred while selecting the goal. Please try again.');
    }
  }


  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" id="smart-goal-results">
      {/* Export buttons */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleExportToPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Download size={16} />
          Export as PDF
        </Button>
        <Button
          onClick={handleExportToJson}
          className="bg-slate-700 hover:bg-slate-800 text-white flex items-center gap-2"
        >
          <FileJson size={16} />
          Export as JSON
        </Button>
      </div>

      {/* OKR Summary */}
      <Card className="shadow-xl border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <Target className="text-blue-600" size={24} />
            OKR Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Department</h3>
                <p className="text-slate-900 font-medium">{okrData.department}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Job Title</h3>
                <p className="text-slate-900 font-medium">{okrData.jobTitle}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Manager's Goal</h3>
                <p className="text-slate-600">{okrData.managersGoal}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Goal Description</h3>
                <p className="text-slate-600">{okrData.goalDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Key Result</h3>
                <p className="text-slate-600">{okrData.keyResult}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Due Date</h3>
                <p className="text-slate-600 flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  {new Date(okrData.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Generated Results */}
      {aiResult && (
        <Card className="shadow-xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <CheckCircle size={24} />
            AI Generated SMART Goals
          </CardTitle>
            <p className="text-blue-200 text-sm mt-2">
              Specific • Measurable • Achievable • Relevant • Time-bound
            </p>
            {isFallback && (
              <div className="bg-yellow-600 text-white text-sm p-2 mt-3 rounded">
                Note: Using locally generated goals due to API server unavailability
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">              {typeof aiResult === 'string' ? (
              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <p className="text-slate-800 whitespace-pre-line">{aiResult}</p>
              </div>
            ) : Array.isArray(aiResult?.goals) ? (
              <>
                {aiResult.goals.map((goal, index) => (

                  <div
                    key={index}
                    className={`border rounded-lg p-6 cursor-pointer ${index === selectedGoalIndex
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50'
                      }`
                    }
                    onClick={() => setSelectedGoalIndex(index)}
                  >                    {/* ⬇️ Add checkbox to select goal */}
                    <div className="flex items-center mb-4">
                      <input 
                        type="checkbox"
                        checked={selectedGoalIndex === index}
                        onChange={() => handleSendSelectedGoal(index)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded" 
                      />
                      <span className="font-semibold text-slate-700">Select Goal #{index + 1}</span>
                    </div>

                    {/* <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50"> */}
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
                          {goal.companyTopBetAlignment && (
                            <div>
                              <h4 className="font-semibold text-slate-700 mb-1">Company Top Bets Alignment</h4>
                              <p className="text-slate-600 text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                                {goal.companyTopBetAlignment}
                              </p>
                            </div>
                          )}

                          {goal.framework3E && (
                            <div>
                              <h4 className="font-semibold text-slate-700 mb-1">3E Framework Alignment</h4>
                              <p className="text-slate-600 text-sm bg-green-50 p-2 rounded border-l-4 border-green-400">
                                {goal.framework3E}
                              </p>
                            </div>
                          )}

                          {goal.coreValue && (
                            <div>
                              <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-2">
                                <Heart size={16} className="text-red-500" />
                                Core Values Alignment
                              </h4>
                              <p className="text-slate-600 text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                                {goal.coreValue}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  // </div>
                )


                )}
                {/* {//array ends heere} */}
                <div className="mt-4 flex justify-end">
                  <button
                    className={`px-4 py-2 rounded text-white transition ${selectedGoalIndex !== null
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    disabled={selectedGoalIndex === null}
                    onClick={() =>
                      selectedGoalIndex !== null &&
                      handleSendSelectedGoal(selectedGoalIndex)
                    }
                  >
                    Submit Goal
                  </button>
                </div>

              </>

            )


              : (
                <div className="text-red-600 font-medium">
                  No SMART goals found in response.
                </div>
              )}




            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartGoalResults;
