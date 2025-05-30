import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Target, Heart, Download, FileJson } from 'lucide-react';
import { exportToPdf, exportToJson } from '@/lib/export';

interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

interface SmartGoalResultsProps {
  okrData: OKRData;
  aiResult?: any;
  isFallback?: boolean;
}

const SmartGoalResults: React.FC<SmartGoalResultsProps> = ({ okrData, aiResult, isFallback = false }) => {
  const handleExportToPdf = () => {
    exportToPdf('smart-goal-results');
  };
  
  const handleExportToJson = () => {
    exportToJson(okrData, aiResult);
  };
  
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
                aiResult.goals.map((goal, index) => (
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
                        {goal.topBetsAlignment && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-1">Company Top Bets Alignment</h4>
                            <p className="text-slate-600 text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                              {goal.topBetsAlignment}
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
                ))
              ) : (
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
