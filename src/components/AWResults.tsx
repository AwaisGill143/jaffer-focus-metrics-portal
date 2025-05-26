
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Calendar, Target } from 'lucide-react';

interface OKRData {
  goalName: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

interface AWResultsProps {
  okrData: OKRData;
}

const AWResults: React.FC<AWResultsProps> = ({ okrData }) => {
  const generateAWs = (goalName: string, keyResult: string) => {
    const baseAWs = [
      {
        id: 1,
        action: `Conduct weekly progress reviews for ${goalName}`,
        description: "Schedule and facilitate regular checkpoint meetings to assess advancement toward key results",
        priority: "High",
        timeline: "Weekly",
        kpi: "Weekly completion rate ≥ 95%"
      },
      {
        id: 2,
        action: `Implement measurement framework for ${goalName}`,
        description: "Establish tracking mechanisms and data collection processes for key result metrics",
        priority: "High", 
        timeline: "First 2 weeks",
        kpi: "All metrics tracked with 100% accuracy"
      },
      {
        id: 3,
        action: `Create milestone checkpoints for ${goalName}`,
        description: "Break down the key result into smaller, measurable milestones with specific deadlines",
        priority: "Medium",
        timeline: "Monthly",
        kpi: "90% of milestones achieved on time"
      }
    ];

    return baseAWs;
  };

  const actionWorkflows = generateAWs(okrData.goalName, okrData.keyResult);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

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
                <h3 className="font-semibold text-slate-700 mb-1">Objective</h3>
                <p className="text-slate-900 font-medium">{okrData.goalName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-1">Manager's Goal</h3>
                <p className="text-slate-600">{okrData.managersGoal}</p>
              </div>
            </div>
            <div className="space-y-3">
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

      {/* Generated Action Workflows */}
      <Card className="shadow-xl border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <CheckCircle size={24} />
            Generated Action Workflows (AWs) & KPIs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">#</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Action Workflow</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Description</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Priority</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Timeline</th>
                  <th className="text-left p-4 font-semibold text-slate-700">KPI</th>
                </tr>
              </thead>
              <tbody>
                {actionWorkflows.map((aw, index) => (
                  <tr key={aw.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                    <td className="p-4 text-slate-600 font-medium">{aw.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{aw.action}</div>
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs">
                      {aw.description}
                    </td>
                    <td className="p-4">
                      <Badge className={`${getPriorityColor(aw.priority)} font-medium`}>
                        {aw.priority}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{aw.timeline}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-blue-700 font-medium">
                        <TrendingUp size={16} />
                        {aw.kpi}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AWResults;
