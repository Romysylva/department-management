
export const mockRoles = [
  { id: '1', name: 'Finance Manager', department: 'Accounting' },
  { id: '2', name: 'Accountant', department: 'Accounting' },
  { id: '3', name: 'Engineering Manager', department: 'Engineering' },
  { id: '4', name: 'Software Engineer', department: 'Engineering' },
  { id: '5', name: 'QA Engineer', department: 'Engineering' },
  { id: '6', name: 'DevOps Engineer', department: 'Engineering' },
  { id: '7', name: 'Billing Specialist', department: 'Accounting' },
  { id: '8', name: 'Product Manager', department: 'Product' },
  { id: '9', name: 'Product Designer', department: 'Product' },
  { id: '10', name: 'UX Researcher', department: 'Product' },
  { id: '11', name: 'Marketing Manager', department: 'Marketing' },
  { id: '12', name: 'Content Creator', department: 'Marketing' },
  { id: '13', name: 'Support Specialist', department: 'Support' },
  { id: '14', name: 'Customer Success Manager', department: 'Support' },
];

export const mockDepartments = [
  {
    id: '1',
    name: 'Product',
    description: 'Product department is responsible for defining the vision, strategy, and roadmap of the company\'s digital products. The team collaborates closely with engineering, design, and customer-facing departments to ensure product-market fit and long-term value.',
    roles: ['Product Manager', 'Product Designer', 'UX Researcher'],
    members: 0,
  },
  {
    id: '2',
    name: 'Accounting',
    description: 'Handles financial records, invoicing, budgeting, and compliance to ensure the company\'s financial health and regulatory adherence.',
    roles: ['Finance Manager', 'Accountant', 'Billing Specialist'],
    members: 24,
  },
  {
    id: '3',
    name: 'Engineering',
    description: 'Builds and maintains software products, ensuring performance, scalability, and technical excellence through collaborative development practices.',
    roles: ['Engineering Manager', 'Software Engineer'],
    members: 4,
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Drives brand awareness, customer engagement, and lead generation through strategic campaigns and creative content development.',
    roles: ['Marketing Manager', 'Content Creator'],
    members: 4,
  },
  {
    id: '5',
    name: 'Support',
    description: 'Provides timely assistance to customers and internal teams, resolving issues and ensuring a positive user experience.',
    roles: ['Support Specialist', 'Customer Success Manager'],
    members: 12,
  },
];

// Mock API functions
export const mockAPI = {
  async getDepartments() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDepartments;
  },

  async getRoles() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockRoles;
  },

  async createDepartment(data) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newDepartment = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      roles: data.roles,
      members: 0,
    };
    mockDepartments.push(newDepartment);
    return newDepartment;
  },
};