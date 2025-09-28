import { useState, useEffect } from "react";
import { ArrowLeft, Search, Plus, Filter, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { DepartmentTable } from "../components/DepartmentManagement/DepartmentTable";
import { DepartmentWizard } from "../components/DepartmentWizard/DepartmentWizard";
// import { mockAPI } from "../data/mockData";
import { useToast } from "../hooks/use-toast";
import Apiclient from "../services/apiClient";
import { ProgressBarLoader } from "@components/ui/Loader";

export const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showWizard, setShowWizard] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // fetchDepartments();
    fetchFromDataBase();
  }, []);

  // const fetchDepartments = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await mockAPI.getDepartments();
  //     setDepartments(data);
  //   } catch (error) {
  //     console.log(error);
  // toast({
  //   title: "Error",
  //   description: "Failed to fetch departments. Please try again.",
  //   variant: "destructive",
  // });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchFromDataBase = async () => {
    setLoading(true);
    try {
      const res = await Apiclient.get("/departments"); // axios
      const data = res.data; // axios gives data here
      setDepartments(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch departments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || department.status === filter;
    return matchesSearch && matchesFilter;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setShowMobileFilters(false);
  };

  const handleManage = (department) => {
    toast({
      title: "Navigate to Management",
      description: `Managing ${department.name} department...`,
    });
  };

  const handleWizardSuccess = () => {
    fetchFromDataBase();
  };

  const hasActiveFilters = searchTerm !== "" || filter !== "all";

  if (loading) {
    return <ProgressBarLoader />;
  }

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background border-border px-4 py-3 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground truncate">
              Departments
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`p-2 ${
                hasActiveFilters ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowWizard(true)}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 space-y-4 w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileFilters(false)}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>

              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="flex-1"
                >
                  Reset Filters
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="w-full">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8 w-full">
            <div className="">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground text-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK
              </Button>
              <h1 className="text-2xl font-semibold text-foreground">
                Department Management
              </h1>
            </div>
            <Button
              onClick={() => setShowWizard(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD DEPARTMENT
            </Button>
          </div>
          <div className="border-2 border-gray-50 mb-4 -mt-6 font-bold opacity-10"></div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 w-full">
            <div>
              <Select value={filter} onValueChange={setFilter} className="pt-4">
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent className="bg-background text-button-secondary-hover">
                  <SelectItem value="all">Filter</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex py-4 items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full border-0 border-b-2 border-gray-400 focus:border-blue-500 focus:ring-0 outline-none"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-muted-foreground whitespace-nowrap"
              disabled={!hasActiveFilters}
            >
              RESET FILTERS
            </Button>
          </div>

          {/* Active Filters Indicator (Mobile) */}
          {hasActiveFilters && (
            <div className="lg:hidden mb-4 flex flex-wrap gap-2 w-full">
              {searchTerm && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  <span>Search: "{searchTerm}"</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="p-0 h-4 w-4 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {filter !== "all" && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  <span>Status: {filter}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="p-0 h-4 w-4 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Department Count */}
          <div className="mb-4 flex items-center justify-between w-full">
            <span className="text-sm font-medium text-foreground">
              {filteredDepartments.length} Department
              {filteredDepartments.length !== 1 ? "s" : ""}
            </span>

            {/* Mobile Add Department Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setShowWizard(true)}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Empty State */}
          {filteredDepartments.length === 0 && (
            <div className="text-center py-12 w-full">
              <div className="text-muted-foreground mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No departments found
                </h3>
                <p className="text-sm">
                  {hasActiveFilters
                    ? "Try adjusting your search criteria or filters"
                    : "Get started by adding your first department"}
                </p>
              </div>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={() => setShowWizard(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              )}
            </div>
          )}

          {/* Departments Table */}
          {filteredDepartments.length > 0 && (
            <div className="bg-card rounded-lg overflow-hidden w-full">
              <DepartmentTable
                departments={filteredDepartments}
                onManage={handleManage}
              />
            </div>
          )}

          {/* Wizard Modal */}
          {showWizard && (
            <DepartmentWizard
              onClose={() => setShowWizard(false)}
              onSuccess={handleWizardSuccess}
            />
          )}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden w-full" />
    </div>
  );
};
