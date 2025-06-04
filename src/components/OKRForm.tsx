
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Target, Users, FileText, CheckCircle, Building2, Briefcase } from 'lucide-react';

interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

interface OKRFormProps {
  onSubmit: (data: OKRData) => void;
  isLoading?: boolean;
}

const OKRForm: React.FC<OKRFormProps> = ({ onSubmit, isLoading = false }) => {  
  const [formData, setFormData] = useState<OKRData>({
    department: '',
    jobTitle: '',
    goalDescription: '',
    keyResult: '',
    managersGoal: '',
    dueDate: ''
  });  
  const handleInputChange = (field: keyof OKRData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {


    e.preventDefault();
    onSubmit(formData);
  };
  const handleReset = () => {
    setFormData({
      department: '',
      jobTitle: '',
      goalDescription: '',
      keyResult: '',
      managersGoal: '',
      dueDate: ''
    });
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <Target className="text-blue-600" size={28} />
          Create Your OKR (Objectives & Key Results)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-slate-700 font-semibold flex items-center gap-2">
                <Building2 size={16} className="text-blue-600" />
                Department
              </Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Enter your department"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-slate-700 font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-blue-600" />
                Job Title
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="Enter your job title"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="managersGoal" className="text-slate-700 font-semibold flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              Manager's Goal
            </Label>
            <Input
              id="managersGoal"
              value={formData.managersGoal}
              onChange={(e) => handleInputChange('managersGoal', e.target.value)}
              placeholder="Aligned manager's objective"
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalDescription" className="text-slate-700 font-semibold flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              Goal Description
            </Label>
            <Textarea
              id="goalDescription"
              value={formData.goalDescription}
              onChange={(e) => handleInputChange('goalDescription', e.target.value)}
              placeholder="Provide a detailed description of your objective and its business impact"
              rows={4}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyResult" className="text-slate-700 font-semibold flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-600" />
              Key Result
            </Label>
            <Textarea
              id="keyResult"
              value={formData.keyResult}
              onChange={(e) => handleInputChange('keyResult', e.target.value)}
              placeholder="Define measurable outcomes that indicate goal achievement (include specific metrics, percentages, or quantities)"
              rows={3}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-slate-700 font-semibold flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>          <div className="pt-4">
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-colors duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate SMART Goals & KPIs'}
            </Button>
            
            <div className="mt-3 text-center">
              <button 
                type="button"
                onClick={handleReset}
                className="text-slate-600 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OKRForm;
