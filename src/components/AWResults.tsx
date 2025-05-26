
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
  const generateSMARTGoals = (goalName: string, keyResult: string) => {
    const smartGoals = [
      {
        id: 1,
        smartType: "Specific",
        goal: `Define clear weekly milestones for ${goalName}`,
        description: "Establish specific, well-defined objectives that leave no room for ambiguity",
        priority: "High",
        timeline: "Weekly",
        kpi: "100% of milestones clearly defined"
      },
      {
        id: 2,
        smartType: "Measurable",
        goal: `Track quantifiable metrics for ${goalName}`,
        description: "Implement measurement systems to monitor progress with concrete numbers and data",
        priority: "High", 
        timeline: "Daily",
        kpi: "All metrics tracked with 95% accuracy"
      },
      {
        id: 3,
        smartType: "Achievable",
        goal: `Set realistic targets for ${goalName}`,
        description: "Ensure goals are challenging yet attainable with available resources and constraints",
        priority: "Medium",
        timeline: "Monthly review",
        kpi: "90% of targets achieved within timeline"
      },
      {
        id: 4,
        smartType: "Relevant",
        goal: `Align ${goalName} with business objectives`,
        description: "Confirm goal alignment with organizational priorities and strategic direction",
        priority: "High",
        timeline: "Quarterly",
        kpi: "100% alignment with company strategy"
      },
      {
        id: 5,
        smartType: "Time-bound",
        goal: `Set deadline-driven checkpoints for ${goalName}`,
        description: "Establish clear deadlines and time-bound milestones for accountability",
        priority: "Medium",
        timeline: "Bi-weekly",
        kpi: "95% of deadlines met on schedule"
      }
    ];

    return smartGoals;
  };

  const smartGoals = generateSMARTGoals(okrData.goalName, okrData.keyResult);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getSMARTColor = (smartType: string) => {
    switch (smartType) {
      case 'Specific': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Measurable': return 'bg-green-100 text-green-800 border-green-200';
      case 'Achievable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Relevant': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Time-bound': return 'bg-red-100 text-red-800 border-red-200';
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

      {/* Generated SMART Goals */}
      <Card className="shadow-xl border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <CheckCircle size={24} />
            Generated SMART Goals & KPIs
          </CardTitle>
          <p className="text-blue-200 text-sm mt-2">
            Specific • Measurable • Achievable • Relevant • Time-bound
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">#</th>
                  <th className="text-left p-4 font-semibold text-slate-700">SMART Type</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Goal</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Description</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Priority</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Timeline</th>
                  <th className="text-left p-4 font-semibold text-slate-700">KPI</th>
                </tr>
              </thead>
              <tbody>
                {smartGoals.map((goal, index) => (
                  <tr key={goal.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                    <td className="p-4 text-slate-600 font-medium">{goal.id}</td>
                    <td className="p-4">
                      <Badge className={`${getSMARTColor(goal.smartType)} font-medium`}>
                        {goal.smartType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{goal.goal}</div>
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs">
                      {goal.description}
                    </td>
                    <td className="p-4">
                      <Badge className={`${getPriorityColor(goal.priority)} font-medium`}>
                        {goal.priority}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{goal.timeline}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-blue-700 font-medium">
                        <TrendingUp size={16} />
                        {goal.kpi}
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
