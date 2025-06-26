"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Target, Users, FileText, CheckCircle, Building2, Briefcase, RotateCcw } from "lucide-react"
import type { OKRData, OKRFormProps } from "@/types/index"

const OKRForm: React.FC<OKRFormProps> = ({ onSubmit, isLoading = false, user }) => {
  // Manager goal options
  const managerGoalOptions = [
    "Increase operational efficiency by 25%",
    "Drive digital transformation initiatives",
    "Improve customer satisfaction scores",
    "Enhance team productivity and collaboration",
    "Reduce costs while maintaining quality",
    "Accelerate product development cycles",
    "Strengthen market position and competitiveness",
    "Foster innovation and continuous improvement",
    "Build sustainable business practices",
    "Expand market reach and customer base"
  ]

  const [formData, setFormData] = useState<OKRData>({
    department: user?.department || "",
    jobTitle: user?.designation || "",
    goalDescription: "Automate the goal making process",
    keyResult: "Reduce meetings with supervisors by 30%",
    startDate: new Date().toISOString().split("T")[0],
    managersGoal: user?.managers_goal || "",
    dueDate: "",
  })

  // State for managing multiple selected manager goals
  const [selectedManagerGoals, setSelectedManagerGoals] = useState<string[]>([])

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        department: user.department || prevData.department,
        jobTitle: user.designation || prevData.jobTitle,
        managersGoal: user.managers_goal || prevData.managersGoal,
      }))
    }
  }, [user])

  // Update managersGoal whenever selectedManagerGoals changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      managersGoal: selectedManagerGoals.join("; ")
    }))
  }, [selectedManagerGoals])

  const handleInputChange = (field: keyof OKRData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    if (formData.startDate && field === "dueDate") {
      const startDate = new Date(formData.startDate)
      const dueDate = new Date(value)
      if (dueDate < startDate) {
        alert("Due date must be after the start date")
        setFormData({
          ...formData,
          dueDate: "",
        })
      }
    }
  }

  const handleManagerGoalToggle = (goal: string) => {
    setSelectedManagerGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal)
      } else {
        return [...prev, goal]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData({
      department: user?.department || "",
      jobTitle: user?.designation || "",
      goalDescription: "",
      keyResult: "",
      managersGoal: user?.managers_goal || "",
      startDate: "",
      dueDate: "",
    })
    setSelectedManagerGoals([])
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <div className="font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .input-focus-glow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-focus-glow:focus {
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1), 0 0 20px rgba(20, 184, 166, 0.1);
          transform: translateY(-1px);
        }
        .button-hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .button-hover-lift:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .label-slide {
          transition: all 0.2s ease-out;
        }
        .label-slide:hover {
          transform: translateX(2px);
        }
      `}</style>

      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 rounded-2xl overflow-hidden animate-fade-in-up">
        <CardHeader className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-slate-100 p-8">
          <CardTitle className="text-3xl font-bold text-slate-800 flex items-center gap-4 tracking-tight animate-scale-in">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white shadow-lg">
              <Target size={32} />
            </div>
            Create Your OKR
            <span className="text-lg font-medium text-slate-600 ml-2">(Objectives & Key Results)</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 bg-gradient-to-br from-white to-slate-50">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Department and Job Title Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <Label
                  htmlFor="department"
                  className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
                >
                  <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg text-white">
                    <Building2 size={14} />
                  </div>
                  Department
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  //non editable
                  disabled={true}
                  // onChange={(e) => handleInputChange("department", e.target.value)}
                  placeholder="Enter your department"
                  className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow transition-all duration-300"
                />
              </div>

              <div className="space-y-3 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <Label
                  htmlFor="jobTitle"
                  className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
                >
                  <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg text-white">
                    <Briefcase size={14} />
                  </div>
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  disabled={true}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  placeholder="Enter your job title"
                  className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow transition-all duration-300"
                />
              </div>
            </div>

            {/* Manager's Goal */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Label
                htmlFor="managersGoal"
                className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
              >
                <div className="p-1.5 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg text-white">
                  <Users size={14} />
                </div>
                Department Head Objectives (Select Multiple)
              </Label>
              
              {/* Display selected goals */}
              {selectedManagerGoals.length > 0 && (
                <div className="mb-3 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <p className="text-sm font-medium text-teal-700 mb-2">Selected objectives ({selectedManagerGoals.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedManagerGoals.map((goal, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full"
                      >
                        {goal.length > 40 ? `${goal.substring(0, 40)}...` : goal}
                        <button
                          type="button"
                          onClick={() => handleManagerGoalToggle(goal)}
                          className="ml-1 hover:bg-teal-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkbox options */}
              <div className="border-2 border-slate-200 rounded-xl p-4 max-h-60 overflow-y-auto space-y-2">
                {managerGoalOptions.map((goal, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedManagerGoals.includes(goal)}
                      onChange={() => handleManagerGoalToggle(goal)}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Goal Description */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Label
                htmlFor="goalDescription"
                className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
              >
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white">
                  <FileText size={14} />
                </div>
                Goal Description
              </Label>
              <Textarea
                id="goalDescription"
                value={formData.goalDescription}
                onChange={(e) => handleInputChange("goalDescription", e.target.value)}
                placeholder="Provide a detailed description of your objective and its business impact"
                rows={4}
                className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow resize-none leading-relaxed transition-all duration-300"
              />
            </div>

            {/* Key Result */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Label
                htmlFor="keyResult"
                className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
              >
                <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg text-white">
                  <CheckCircle size={14} />
                </div>
                Key Result
              </Label>
              <Textarea
                id="keyResult"
                value={formData.keyResult}
                onChange={(e) => handleInputChange("keyResult", e.target.value)}
                placeholder="Define measurable outcomes that indicate goal achievement (include specific metrics, percentages, or quantities)"
                rows={3}
                className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow resize-none leading-relaxed transition-all duration-300"
              />
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: "0.6s" }}>
                <Label
                  htmlFor="startDate"
                  className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
                >
                  <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white">
                    <Calendar size={14} />
                  </div>
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow transition-all duration-300"
                />
              </div>

              <div className="space-y-3 animate-slide-in-right" style={{ animationDelay: "0.7s" }}>
                <Label
                  htmlFor="dueDate"
                  className="text-slate-700 font-semibold flex items-center gap-3 text-sm uppercase tracking-wide label-slide"
                >
                  <div className="p-1.5 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg text-white">
                    <Calendar size={14} />
                  </div>
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="border-2 border-slate-200 focus:border-teal-500 focus:ring-0 rounded-xl px-4 py-3 text-slate-800 font-medium input-focus-glow transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="pt-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 text-lg font-bold rounded-xl transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xl button-hover-lift border-0"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-b-transparent rounded-full"></div>
                    Generating SMART Goals...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Target size={20} />
                    Generate SMART Goals & KPIs
                  </div>
                )}
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 text-sm font-semibold transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  <RotateCcw size={16} />
                  Reset Form
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OKRForm



// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Calendar, Target, Users, FileText, CheckCircle, Building2, Briefcase } from "lucide-react"
// import type { OKRData, OKRFormProps } from "@/types/index"

// const OKRForm: React.FC<OKRFormProps> = ({ onSubmit, isLoading = false, user }) => {
//   // console.log('OKRForm user:', user);
//   const [formData, setFormData] = useState<OKRData>({
//     department: user?.department || "",
//     jobTitle: user?.designation || "",
//     goalDescription: "Automate the goal making process",
//     keyResult: "Reduce meetings with supervisors by 30%",
//     startDate: new Date().toISOString().split("T")[0], // Default to today
//     managersGoal: user?.managers_goal || "",
//     dueDate: "",
//   })

//   // Update form data when user prop changes
//   useEffect(() => {
//     if (user) {
//       setFormData((prevData) => ({
//         ...prevData,
//         department: user.department || prevData.department,
//         jobTitle: user.designation || prevData.jobTitle,
//         managersGoal: user.managers_goal || prevData.managersGoal,
//       }))
//     }
//   }, [user])

//   const handleInputChange = (field: keyof OKRData, value: string) => {
//     setFormData({
//       ...formData,
//       [field]: value,
//     })
//     // if its due date then see if its after start date
//     if (formData.startDate && field === "dueDate") {
//       const startDate = new Date(formData.startDate)
//       const dueDate = new Date(value)
//       if (dueDate < startDate) {
//         alert("Due date must be after the start date")
//         setFormData({
//           ...formData,
//           dueDate: "",
//         })
//       }
//     }
//   }
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   const handleReset = () => {
//     setFormData({
//       department: user?.department || "",
//       jobTitle: user?.designation || "",
//       goalDescription: "",
//       keyResult: "",
//       managersGoal: user?.managers_goal || "",
//       startDate: "",
//       dueDate: "",
//     })
//   }

//   const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

//   return (
//     <Card className="w-full max-w-4xl mx-auto shadow-xl border-slate-200">
//       <CardHeader className="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-b border-slate-200">
//         <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
//           <Target className="text-teal-600" size={28} />
//           Create Your OKR (Objectives & Key Results)
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-8">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="department" className="text-slate-700 font-semibold flex items-center gap-2">
//                 <Building2 size={16} className="text-teal-600" />
//                 Department
//               </Label>
//               <Input
//                 id="department"
//                 value={formData.department}
//                 onChange={(e) => handleInputChange("department", e.target.value)}
//                 placeholder="Enter your department"
//                 className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="jobTitle" className="text-slate-700 font-semibold flex items-center gap-2">
//                 <Briefcase size={16} className="text-teal-600" />
//                 Job Title
//               </Label>
//               <Input
//                 id="jobTitle"
//                 value={formData.jobTitle}
//                 onChange={(e) => handleInputChange("jobTitle", e.target.value)}
//                 placeholder="Enter your job title"
//                 className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="managersGoal" className="text-slate-700 font-semibold flex items-center gap-2">
//               <Users size={16} className="text-teal-600" />
//               Department Head Objective
//             </Label>
//             <Textarea
//               id="managersGoal"
//               value={formData.managersGoal}
//               onChange={(e) => handleInputChange("managersGoal", e.target.value)}
//               placeholder="Aligned manager's objective"
//               rows={4}
//               className="border-slate-300 focus:border-teal-500 focus:ring-teal-500 resize-y min-h-[80px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="goalDescription" className="text-slate-700 font-semibold flex items-center gap-2">
//               <FileText size={16} className="text-teal-600" />
//               Goal Description
//             </Label>
//             <Textarea
//               id="goalDescription"
//               value={formData.goalDescription}
//               onChange={(e) => handleInputChange("goalDescription", e.target.value)}
//               placeholder="Provide a detailed description of your objective and its business impact"
//               rows={4}
//               className="border-slate-300 focus:border-teal-500 focus:ring-teal-500 resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="keyResult" className="text-slate-700 font-semibold flex items-center gap-2">
//               <CheckCircle size={16} className="text-teal-600" />
//               Key Result
//             </Label>
//             <Textarea
//               id="keyResult"
//               value={formData.keyResult}
//               onChange={(e) => handleInputChange("keyResult", e.target.value)}
//               placeholder="Define measurable outcomes that indicate goal achievement (include specific metrics, percentages, or quantities)"
//               rows={3}
//               className="border-slate-300 focus:border-teal-500 focus:ring-teal-500 resize-none"
//             />{" "}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="startDate" className="text-slate-700 font-semibold flex items-center gap-2">
//                 <Calendar size={16} className="text-teal-600" />
//                 Start Date
//               </Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => handleInputChange("startDate", e.target.value)}
//                 className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="dueDate" className="text-slate-700 font-semibold flex items-center gap-2">
//                 <Calendar size={16} className="text-red-600" />
//                 Due Date
//               </Label>
//               {/* the due date should be after than that of startDate */}
//               <Input
//                 id="dueDate"
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e) => handleInputChange("dueDate", e.target.value)}
//                 className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
//               />
//             </div>
//           </div>

//           <div className="pt-4">
//             <Button
//               type="submit"
//               disabled={!isFormValid || isLoading}
//               className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 text-lg font-semibold transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg"
//             >
//               {isLoading ? "Generating..." : "Generate SMART Goals & KPIs"}
//             </Button>

//             <div className="mt-3 text-center">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="text-slate-600 hover:text-red-600 text-sm font-medium transition-colors"
//               >
//                 Reset Form
//               </button>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default OKRForm
