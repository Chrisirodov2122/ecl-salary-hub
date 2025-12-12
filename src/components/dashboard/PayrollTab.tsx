import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const fullEmployeeData = [
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'Jan 2024', gross: '₹1,35,000', net: '₹92,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'Feb 2024', gross: '₹1,36,000', net: '₹93,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'Mar 2024', gross: '₹1,37,000', net: '₹94,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'Apr 2024', gross: '₹1,38,000', net: '₹94,500' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'May 2024', gross: '₹1,38,500', net: '₹95,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', month: 'Jun 2024', gross: '₹1,39,000', net: '₹95,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'Jan 2024', gross: '₹92,000', net: '₹75,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'Feb 2024', gross: '₹93,000', net: '₹76,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'Mar 2024', gross: '₹93,500', net: '₹77,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'Apr 2024', gross: '₹94,000', net: '₹77,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'May 2024', gross: '₹94,500', net: '₹78,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', month: 'Jun 2024', gross: '₹95,000', net: '₹78,500' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'Jan 2024', gross: '₹1,45,000', net: '₹1,10,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'Feb 2024', gross: '₹1,46,000', net: '₹1,11,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'Mar 2024', gross: '₹1,47,000', net: '₹1,12,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'Apr 2024', gross: '₹1,48,000', net: '₹1,13,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'May 2024', gross: '₹1,49,000', net: '₹1,14,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', month: 'Jun 2024', gross: '₹1,50,000', net: '₹1,15,060' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'Jan 2024', gross: '₹90,000', net: '₹80,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'Feb 2024', gross: '₹91,000', net: '₹81,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'Mar 2024', gross: '₹92,000', net: '₹82,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'Apr 2024', gross: '₹93,000', net: '₹83,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'May 2024', gross: '₹94,000', net: '₹84,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', month: 'Jun 2024', gross: '₹95,000', net: '₹85,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'Jan 2024', gross: '₹80,000', net: '₹70,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'Feb 2024', gross: '₹81,000', net: '₹71,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'Mar 2024', gross: '₹82,000', net: '₹72,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'Apr 2024', gross: '₹83,000', net: '₹73,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'May 2024', gross: '₹84,000', net: '₹74,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', month: 'Jun 2024', gross: '₹85,000', net: '₹75,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'Jan 2024', gross: '₹1,20,000', net: '₹88,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'Feb 2024', gross: '₹1,21,000', net: '₹89,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'Mar 2024', gross: '₹1,22,000', net: '₹90,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'Apr 2024', gross: '₹1,23,000', net: '₹91,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'May 2024', gross: '₹1,24,000', net: '₹92,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', month: 'Jun 2024', gross: '₹1,25,000', net: '₹93,000' },
];

const months = ['All Months', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];

const PayrollTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = fullEmployeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = selectedMonth === 'All Months' || employee.month === selectedMonth;
    return matchesSearch && matchesMonth;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="stat-card"
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">Payroll Data</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field pl-10 py-2 text-sm min-w-[200px]"
            />
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="input-field py-2 px-3 text-sm min-w-[130px]"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Employee Code</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Department</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Month</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Gross</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Net</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((employee, index) => (
              <motion.tr
                key={`${employee.code}-${employee.month}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="table-row"
              >
                <td className="py-3 px-4 text-sm text-muted-foreground">{employee.code}</td>
                <td className="py-3 px-4 text-sm font-medium text-foreground">{employee.name}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{employee.department}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{employee.month}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{employee.gross}</td>
                <td className="py-3 px-4 text-sm font-medium text-ecl-green">{employee.net}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No records found</div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          Showing {paginatedData.length} of {filteredData.length} records
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PayrollTab;
