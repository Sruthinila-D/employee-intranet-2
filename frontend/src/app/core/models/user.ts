export interface User {
  name: string;
  role: 'Employee' | 'Manager' | 'HR' | 'Admin';
  location: 'Riyadh' | 'Jeddah' | 'Dammam';
}