import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export const Step1NameDescription = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Section */}
      <div className="bg-background border-b border-border p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Create Department
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Start by providing basic information about your new department
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg shadow-sm p-6 sm:p-8">
            {/* Step Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Name & Description
              </h2>
              <p className="text-sm text-muted-foreground">
                Provide a clear name and detailed description for your
                department
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              {/* Department Name */}
              <div className="space-y-3">
                <Label
                  htmlFor="department-name"
                  className="text-sm font-semibold text-foreground"
                >
                  Department Name *
                </Label>
                <Input
                  id="department-name"
                  placeholder="Enter department name (e.g., Product, Engineering, Marketing)"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="text-base py-3 px-4 border-border focus:border-primary focus:ring-primary"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Choose a clear, descriptive name that reflects the
                  department's purpose
                </p>
              </div>

              {/* Department Description */}
              <div className="space-y-3">
                <Label
                  htmlFor="department-info"
                  className="text-sm font-semibold text-foreground"
                >
                  Department Info *
                </Label>
                <Textarea
                  id="department-info"
                  placeholder="Describe the department's role, responsibilities, and objectives..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="text-base min-h-[150px] resize-none border-border focus:border-primary focus:ring-primary"
                  maxLength={500}
                  required
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Provide details about what this department does and its key
                    responsibilities
                  </p>
                  <span className="text-xs text-muted-foreground font-medium">
                    {formData.description.length}/500
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Form Progress
                  </span>
                  <span className="text-xs font-medium text-primary">
                    Step 1 of 3
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>

              {/* Form Validation Status */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.name && formData.description
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm text-foreground">
                    {formData.name && formData.description
                      ? "Ready to proceed to next step"
                      : "Please complete all required fields"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Need help getting started?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Department Name Tips:
                </h4>
                <ul className="space-y-1">
                  <li>• Keep it concise and clear</li>
                  <li>• Use standard naming conventions</li>
                  <li>• Avoid abbreviations when possible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Description Tips:
                </h4>
                <ul className="space-y-1">
                  <li>• Explain the department's main purpose</li>
                  <li>• Mention key responsibilities</li>
                  <li>• Include how it fits in the organization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-background border-t border-border p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Step 1: Basic Information</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Next: Add team roles and assignments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
