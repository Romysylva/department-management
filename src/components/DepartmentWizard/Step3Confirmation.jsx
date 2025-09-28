export const Step3Confirmation = ({ data }) => {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Confirmation
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            Department Name
          </div>
          <div className="md:col-span-3 text-sm text-foreground font-medium">
            {data.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            Department Info
          </div>
          <div className="md:col-span-3 text-sm text-foreground">
            {data.description}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            Team Roles
          </div>
          <div className="md:col-span-3">
            {data.roles.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                No roles selected
              </span>
            ) : (
              <div className="space-y-1">
                {data.roles.map((role, index) => (
                  <div key={index} className="text-sm text-foreground">
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
