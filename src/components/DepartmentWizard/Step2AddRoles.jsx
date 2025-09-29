import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Trash2,
  Plus,
  ArrowBigDownIcon,
  ArrowDownIcon,
  SearchCheck,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Apiclient from "../../services/apiClient";
import { RippleLoader } from "@components/ui/Loader";

export const Step2AddRoles = ({ selectedRoles, onUpdate, departmentName }) => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  // const [newRoleName, setNewRoleName] = useState("");

  // ✅ Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await Apiclient.get("/roles");
        setRoles(res.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // const handleAddRoleToDB = async () => {
  //   if (!newRoleName.trim()) return;

  //   const newRole = {
  // id: Date.now().toString(),
  //     name: newRoleName,
  //     department: departmentName || "Unassigned",
  //     description: "Newly added role",
  //   };

  //   try {
  //     const res = await Apiclient.post("/roles", newRole);
  //     setRoles((prev) => [...prev, res.data]);
  //     setNewRoleName("");
  //   } catch (error) {
  //     console.error("Failed to add role:", error);
  //   }
  // };

  // const handleDeleteRole = async (id) => {
  //   try {
  //     await Apiclient.delete(`/roles/${id}`);
  //     setRoles((prev) => prev.filter((r) => r.id !== id));
  //   } catch (error) {
  //     console.error("Failed to delete role:", error);
  //   }
  // };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      role.department.toLowerCase() === filter.toLowerCase();
    const notSelected = !selectedRoles.includes(role.name);
    return matchesSearch && matchesFilter && notSelected;
  });

  const addRole = (roleName) => {
    onUpdate([...selectedRoles, roleName]);
  };

  const removeRole = (roleName) => {
    onUpdate(selectedRoles.filter((role) => role !== roleName));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilter("all");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8 ">
        <RippleLoader />{" "}
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-accent-foreground text-black min-h-screen">
      <h2 className="text-xl font-semibold text-foreground mb-6 ">Add Roles</h2>

      <div className="flex justify-between items-center">
        <div>
          <div className="relative flex-1 mb-3 w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4  " />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full border-0 border-b-2 border-gray-400 focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-accent-foreground text-gray-600">
              <SelectItem value="all">
                <span>Filter</span>
              </SelectItem>
              <SelectItem value="accounting">Accounting</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="text-muted-foreground"
        >
          RESET FILTERS
        </Button>
      </div>

      {/* Available and Selected Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Roles */}
        <div>
          <h3 className="text-lg font-medium mb-2">Available</h3>
          <p className="text-sm text-foreground mb-4 font-semibold">
            {filteredRoles.length} Role(s)
          </p>

          <div className="bg-gray-50 rounded-t-lg">
            <div className="grid grid-cols-3 gap-4 p-3 text-sm font-medium text-button-secondary">
              <span className="flex gap-0.5 items-center w-2xs">
                <span>Role(s)</span>
                <ArrowDownIcon size={15} />
              </span>
              <span className="flex gap-0.5 items-center w-2xs">
                <span>On Department(s)</span>
                <ArrowDownIcon size={15} />
              </span>
              <span></span>
            </div>
          </div>

          <div className="border border-t-0 sm:min-h-200 md:overflow-y-auto ">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="grid grid-cols-3 gap-4 p-3 border-b last:border-b-0 items-center"
              >
                <span className="text-sm">{role.name}</span>
                <span className="text-sm text-muted-foreground">
                  {role.department}
                </span>
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    onClick={() => addRole(role.name)}
                    className="justify-self-end"
                  >
                    ADD
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Roles */}
        <div>
          <h3 className="text-lg font-medium mb-2">
            In {departmentName || "New"} Department
          </h3>
          <p className="text-sm text-foreground mb-4 font-semibold">
            {selectedRoles.length} Role(s)
          </p>

          <div className=" border-muted-foreground ">
            <div className="bg-gray-50 rounded-t-lg shadow-gray-50">
              <div className="grid grid-cols-3 gap-4 p-3 text-sm font-medium text-black">
                <span className="flex gap-1 items-center">
                  Name <ArrowDownIcon size={15} />
                </span>

                <span className="flex gap-0.5 items-center w-2xs">
                  <span>On Department(s)</span>
                  <ArrowDownIcon size={15} />
                </span>
              </div>
            </div>

            <div className="sm:min-h-200 border border-t-0 border-b ">
              {selectedRoles.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-black py-16 text-center  ">
                  <div className=" mb-4 opacity-30 sm:mt-50 w-20 h-20 sm:w-50 sm:h-50">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-black"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M35 45 L45 55 L65 35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <p className="text-black text-sm sm:text-xl">
                    You currently don't have any roles in the Department.
                  </p>
                </div>
              ) : (
                <>
                  {/* <div className="bg-gray-50 rounded-t-lg">
                <div className="grid grid-cols-3 gap-4 p-3 text-sm font-medium text-black">
                  <span className="flex gap-1 items-center">
                    Name <ArrowDownIcon size={15} />
                  </span>

                  <span className="flex gap-0.5 items-center w-2xs">
                    <span>On Department(s)</span>
                    <ArrowDownIcon size={15} />
                  </span>
                  <span></span>
                </div>
              </div> */}

                  <div className="border border-t-0 rounded-b-lg text-black">
                    {selectedRoles.map((roleName, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 p-3 border-b last:border-b-0 items-center"
                      >
                        <span className="text-sm  ">{roleName}</span>
                        <span className="text-sm">-</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRole(roleName)}
                          className="justify-self-end p-1 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
