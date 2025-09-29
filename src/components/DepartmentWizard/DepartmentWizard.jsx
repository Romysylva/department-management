import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Step1NameDescription } from "./Step1NameDescription";
import { Step2AddRoles } from "./Step2AddRoles";
import { Step3Confirmation } from "./Step3Confirmation";
import { useToast } from "../../hooks/use-toast";
import { apiclient } from "../../services/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const steps = [
  { number: 1, title: "Name & Description" },
  { number: 2, title: "Add Roles" },
  { number: 3, title: "Confirmation" },
];

export const DepartmentWizard = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    roles: [],
  });

  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await apiclient.createDepartment({
        name: formData.name,
        description: formData.description,
        roles: formData.roles,
      });

      toast({
        title: "Success",
        description: `Department "${formData.name}" has been created successfully.`,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create department. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name.trim() !== "" && formData.description.trim() !== ""
        );
      case 2:
        return formData.roles.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const updateStep1Data = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updateStep2Data = (roles) => {
    setFormData((prev) => ({ ...prev, roles }));
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-gray-200 bg-white flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 sm:mx-22">
          {currentStep === 3 ? "Create a Team" : "Create Department"}
        </h1>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors sm:mx-22"
        >
          <X className="w-4 h-4" />
          <span className="text-sm sm:text-lg font-medium ">CANCEL</span>
        </button>
      </div>

      <div className="border-2 border-gray-50 mb-4 -mt-6 font-bold opacity-10 sm:mx-30"></div>
      {/* Step Indicator */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 flex-shrink-0 sm:mx-20 ">
        <div className="flex items-center justify-center ">
          <div className="flex items-center space-x-4 sm:space-x-8 ">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="sm:flex items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step.number
                        ? "bg-primary text-white"
                        : currentStep > step.number
                        ? "bg-primary text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {/* Step Label */}
                  <span
                    className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs sm:text-xl -ml-2">
                      {step.title}
                    </span>
                  </span>
                </div>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="ml-6   sm:w-3xl h-0.5 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="h-full flex flex-col">
          <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
            <div className="sm:mx-18 sm:min-w-6xl">
              {currentStep === 1 && (
                <div className="max-w-2xl ">
                  <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center sm:text-left">
                    Name & Description
                  </h2>

                  <div className="space-y-6">
                    {/* Department Name */}
                    <div>
                      <Label className="block text-sm text-gray-600 mb-2">
                        Department Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="Department Name"
                        value={formData.name}
                        onChange={(e) =>
                          updateStep1Data({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Department Info */}
                    <div>
                      <Label className="block text-sm text-gray-600 mb-2">
                        Department Info
                      </Label>
                      <Textarea
                        placeholder="Department Info"
                        value={formData.description}
                        onChange={(e) =>
                          updateStep1Data({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={6}
                        maxLength={500}
                      />
                      <div className="flex justify-start ">
                        <span className="text-xs text-gray-500">
                          {formData.description.length}/100
                        </span>
                      </div>
                    </div>

                    {/* Form Validation Feedback */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            canProceed() ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-700">
                          {canProceed()
                            ? "Ready to proceed to next step"
                            : "Please complete all required fields"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className=" overflow-x-clip ">
                  <Step2AddRoles
                    selectedRoles={formData.roles}
                    onUpdate={updateStep2Data}
                    departmentName={formData.name}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className=" mx-auto">
                  <Step3Confirmation data={formData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation - Fixed at bottom */}
      <div className="flex justify-end items-center gap-6 px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200 bg-gray-50 flex-shrink-0 sm:mx-19">
        <Button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            currentStep === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          BACK
        </Button>

        <div>
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                canProceed()
                  ? "bg-primary text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              NEXT
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={!canProceed() || isSubmitting}
              className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                canProceed() && !isSubmitting
                  ? "bg-primary text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Creating..." : "FINISH"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
