import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Calendar, Target, Heart } from 'lucide-react';

interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

interface AWResultsProps {
  okrData: OKRData;
  aiResult?: any;
}


  

const AWResults: React.FC<AWResultsProps> = ({ okrData, aiResult }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
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
      </Card>      {/* Generated SMART Goals */}
      {aiResult && (
        <Card className="shadow-xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <CheckCircle size={24} />
              AI Generated SMART Goals & Strategic Alignment
            </CardTitle>
            <p className="text-blue-200 text-sm mt-2">
              Specific • Measurable • Achievable • Relevant • Time-bound
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {typeof aiResult === 'string' ? (
                <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                  <p className="text-slate-800">{aiResult}</p>
                </div>
              ) : Array.isArray(aiResult) ? (
                aiResult.map((goal, index) => (
                  <div key={goal.id || index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg mb-2">Goal #{goal.id || index + 1}</h3>
                          <p className="text-slate-900 font-semibold">{goal.goal}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">Description</h4>
                          <p className="text-slate-600 text-sm">{goal.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">KPI</h4>
                          <div className="flex items-center gap-2 text-blue-700 font-medium">
                            <TrendingUp size={16} />
                            {goal.kpi}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">Company Top Bets Alignment</h4>
                          <p className="text-slate-600 text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                            {goal.topBetsAlignment}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">3E Framework Alignment</h4>
                          <p className="text-slate-600 text-sm bg-green-50 p-2 rounded border-l-4 border-green-400">
                            {goal.frameworkAlignment}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-2">
                            <Heart size={16} className="text-red-500" />
                            Core Values Alignment
                          </h4>
                          <p className="text-slate-600 text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                            {goal.coreValues}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(aiResult).map(([key, value], index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{key}</h3>
                    <p className="text-slate-600">{String(value)}</p>
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

export default AWResults;
