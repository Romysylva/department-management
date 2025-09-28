import { ArrowDownIcon } from "lucide-react";
import { Button } from "../ui/button";

export const DepartmentTable = ({ departments, onManage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Make table horizontally scrollable on small screens */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="bg-gray-50">
            <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-foreground border-b">
              <div className="text-left flex gap-1.5 items-center">
                <span>Name</span>
                <ArrowDownIcon size={15} />
              </div>
              <div className="col-span-2 text-left flex gap-1.5 items-center">
                <span>Department Info</span>
                <ArrowDownIcon size={15} />
              </div>
              <div className="text-center flex gap-1.5 items-center justify-center">
                <span>Roles</span>
                <ArrowDownIcon size={15} />
              </div>
              <div className="text-center flex gap-1.5 items-center justify-center">
                <span>Members</span>
                <ArrowDownIcon size={15} />
              </div>
              <div className="text-center flex gap-1.5 items-center justify-center">
                <span>Action</span>
                <ArrowDownIcon size={15} />
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {departments.map((department) => (
              <div
                key={department.id}
                className="grid grid-cols-6 gap-4 p-4 items-center border-b text-foreground last:border-b-0"
              >
                <div className="text-left font-medium">{department.name}</div>
                <div className="col-span-2 text-left text-sm text-muted-foreground">
                  {department.description}
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">
                    {department.roles.length}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">
                    {department.members}
                  </span>
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManage(department)}
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    MANAGE
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
