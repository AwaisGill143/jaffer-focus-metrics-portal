
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
}

const AWResults: React.FC<AWResultsProps> = ({ okrData }) => {
  const generateSMARTGoals = (department: string, jobTitle: string, keyResult: string) => {
    const smartGoals = [
      {
        id: 1,
        goal: `Establish weekly progress tracking system for ${department} ${jobTitle} with automated reporting`,
        description: "Implement a comprehensive tracking system that monitors key metrics daily and generates automated weekly reports to stakeholders, ensuring transparency and accountability throughout the project lifecycle.",
        kpi: "100% of weekly reports delivered on time with 95% data accuracy",
        topBetsAlignment: "Operational Excellence - Streamlines decision-making through data-driven insights",
        frameworkAlignment: "Efficiency - Reduces manual reporting time by 75% while improving data quality",
        coreValues: "Accountability & Transparency - Demonstrates commitment to honest communication and taking ownership of results through consistent, accurate reporting"
      },
      {
        id: 2,
        goal: `Create measurable milestone checkpoints for ${department} objectives with stakeholder validation`,
        description: "Define 5-7 specific, quantifiable milestones with clear success criteria and stakeholder sign-off requirements. Each milestone includes resource allocation, risk assessment, and contingency planning.",
        kpi: "90% of milestones achieved on schedule with stakeholder approval rating above 4.5/5",
        topBetsAlignment: "Customer Centricity - Ensures deliverables meet stakeholder expectations through regular validation",
        frameworkAlignment: "Effectiveness - Validates that efforts are producing intended business outcomes",
        coreValues: "Excellence & Customer Focus - Strives for high-quality deliverables that exceed expectations while maintaining strong stakeholder relationships"
      },
      {
        id: 3,
        goal: `Develop cross-functional collaboration framework for ${department} execution`,
        description: "Establish clear communication channels, role definitions, and escalation procedures across all teams involved. Include regular sync meetings, shared documentation, and conflict resolution protocols.",
        kpi: "Team collaboration score above 4.2/5, 95% meeting attendance, zero unresolved conflicts beyond 48 hours",
        topBetsAlignment: "Innovation Culture - Fosters collaborative environment that drives creative problem-solving",
        frameworkAlignment: "Engagement - Increases team satisfaction and reduces project delivery risks through clear communication",
        coreValues: "Collaboration & Respect - Promotes inclusive teamwork and values diverse perspectives while maintaining mutual respect across all interactions"
      }
    ];

    return smartGoals;
  };

  const smartGoals = generateSMARTGoals(okrData.department, okrData.jobTitle, okrData.keyResult);

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
      </Card>

      {/* Generated SMART Goals */}
      <Card className="shadow-xl border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <CheckCircle size={24} />
            Generated SMART Goals & Strategic Alignment
          </CardTitle>
          <p className="text-blue-200 text-sm mt-2">
            Specific • Measurable • Achievable • Relevant • Time-bound
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {smartGoals.map((goal) => (
              <div key={goal.id} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">Goal #{goal.id}</h3>
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AWResults;
