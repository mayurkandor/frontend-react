import { useState, useEffect } from "react";

import "./App.css";

interface Employee {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("http://13.210.238.173:3000/employees");
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
