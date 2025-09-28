# Department Management System

A modern React.js application for managing departments and roles within an organization. Built with Vite, JavaScript, and Tailwind CSS.

## Features

- **Multi-step Department Creation Wizard**

  - Step 1: Name & Description with character count
  - Step 2: Add/Remove Roles with search and filtering
  - Step 3: Confirmation and review

- **Department Management Dashboard**

  - View all departments in a clean table format
  - Search and filter functionality
  - Manage individual departments
  - Real-time data updates

- **Mock API Integration**

  - Simulated API calls with loading states
  - Error handling and user feedback
  - Mock data for departments and roles

- **Responsive Design**
  - Mobile-first approach
  - Clean, professional interface
  - Consistent design system

## Technology Stack

- **Frontend**: React 19, JavaScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Form Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd department-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Mock API

The application uses a mock API with simulated delays to demonstrate real-world behavior:

- **getDepartments()** - Fetch all departments (500ms delay)
- **getRoles()** - Fetch all available roles (300ms delay)
- **createDepartment()** - Create a new department (800ms delay)

## Key Components

### DepartmentWizard

Multi-step wizard for creating departments with validation and state management.

### DepartmentTable

Responsive table component for displaying department information.

### StepIndicator

Visual progress indicator for the multi-step wizard.

## Design System

The application uses a consistent design system with:

- Custom CSS variables for colors and theming
- Semantic color tokens
- Responsive breakpoints
- Consistent spacing and typography

## Future Enhancements

- Real backend API integration
- User authentication and authorization
- Advanced filtering and sorting
- Department analytics and reporting
- Bulk operations
- Export functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
