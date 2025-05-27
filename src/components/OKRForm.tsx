
import React, { useState } from 'react';
import axios from 'axios';
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
  onSubmit: (data: OKRData, aiResult?: any) => void;
}

const OKRForm: React.FC<OKRFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<OKRData>({
    department: '',
    jobTitle: '',
    goalDescription: '',
    keyResult: '',
    managersGoal: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: keyof OKRData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // First, call the onSubmit prop from parent component
      onSubmit(formData);
      
      // Then make the API call
      // response will be a string
      const response = await axios.post('http://localhost:5000/api/generate-smart-goal', {
        goal: formData.goalDescription,
        deadline: formData.dueDate,
        department: formData.department,
        jobTitle: formData.jobTitle,
        keyResult: formData.keyResult,
        managersGoal: formData.managersGoal
      });      if (response.data) {
        console.log('Generated SMART goal:', response.data);
        setResult(response.data);
        // Also pass the result back to the parent component
        onSubmit(formData, response.data);
      } else {
        setError('Failed to generate SMART goal');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while connecting to the server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
      //  this condition will check if all fields are filled
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
              disabled={!isFormValid || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-colors duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate SMART Goals & KPIs'}
            </Button>
          </div>        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OKRForm;
