import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Calendar, Building2, MapPin, Filter, X, Upload, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import * as XLSX from 'xlsx';

interface EmployeeRecord {
  code: string;
  name: string;
  department: string;
  collieryArea: string;
  month: string;
  gross: string;
  net: string;
}

const defaultEmployeeData: EmployeeRecord[] = [
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'Jan 2024', gross: '₹1,35,000', net: '₹92,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'Feb 2024', gross: '₹1,36,000', net: '₹93,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'Mar 2024', gross: '₹1,37,000', net: '₹94,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'Apr 2024', gross: '₹1,38,000', net: '₹94,500' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'May 2024', gross: '₹1,38,500', net: '₹95,000' },
  { code: 'ECL001', name: 'Rajesh Kumar', department: 'Mining', collieryArea: 'Rajmahal', month: 'Jun 2024', gross: '₹1,39,000', net: '₹95,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'Jan 2024', gross: '₹92,000', net: '₹75,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'Feb 2024', gross: '₹93,000', net: '₹76,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'Mar 2024', gross: '₹93,500', net: '₹77,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'Apr 2024', gross: '₹94,000', net: '₹77,500' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'May 2024', gross: '₹94,500', net: '₹78,000' },
  { code: 'ECL002', name: 'Priya Sharma', department: 'HR', collieryArea: 'Sonepur Bazari', month: 'Jun 2024', gross: '₹95,000', net: '₹78,500' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'Jan 2024', gross: '₹1,45,000', net: '₹1,10,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'Feb 2024', gross: '₹1,46,000', net: '₹1,11,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'Mar 2024', gross: '₹1,47,000', net: '₹1,12,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'Apr 2024', gross: '₹1,48,000', net: '₹1,13,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'May 2024', gross: '₹1,49,000', net: '₹1,14,000' },
  { code: 'ECL003', name: 'Amit Singh', department: 'Finance', collieryArea: 'Kunustoria', month: 'Jun 2024', gross: '₹1,50,000', net: '₹1,15,060' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'Jan 2024', gross: '₹90,000', net: '₹80,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'Feb 2024', gross: '₹91,000', net: '₹81,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'Mar 2024', gross: '₹92,000', net: '₹82,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'Apr 2024', gross: '₹93,000', net: '₹83,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'May 2024', gross: '₹94,000', net: '₹84,000' },
  { code: 'ECL004', name: 'Chunab Kumar', department: 'Operations', collieryArea: 'Sripur', month: 'Jun 2024', gross: '₹95,000', net: '₹85,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'Jan 2024', gross: '₹80,000', net: '₹70,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'Feb 2024', gross: '₹81,000', net: '₹71,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'Mar 2024', gross: '₹82,000', net: '₹72,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'Apr 2024', gross: '₹83,000', net: '₹73,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'May 2024', gross: '₹84,000', net: '₹74,000' },
  { code: 'ECL005', name: 'Neya Kumar', department: 'IT', collieryArea: 'Rajmahal', month: 'Jun 2024', gross: '₹85,000', net: '₹75,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'Jan 2024', gross: '₹1,20,000', net: '₹88,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'Feb 2024', gross: '₹1,21,000', net: '₹89,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'Mar 2024', gross: '₹1,22,000', net: '₹90,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'Apr 2024', gross: '₹1,23,000', net: '₹91,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'May 2024', gross: '₹1,24,000', net: '₹92,000' },
  { code: 'ECL006', name: 'Sanjay Verma', department: 'Mining', collieryArea: 'Kajora', month: 'Jun 2024', gross: '₹1,25,000', net: '₹93,000' },
];

const months = ['All Months', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
const departments = ['All Departments', 'Mining', 'HR', 'Finance', 'Operations', 'IT'];
const collieryAreas = ['All Areas', 'Rajmahal', 'Sonepur Bazari', 'Kunustoria', 'Sripur', 'Kajora'];

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

const PayrollTab = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeRecord[]>(defaultEmployeeData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedCollieryArea, setSelectedCollieryArea] = useState('All Areas');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [recordCount, setRecordCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('loading');
    setUploadMessage('Reading file...');

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        setUploadMessage('Parsing data...');
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setUploadMessage('Processing records...');
        
        // Simulate processing time for better UX
        setTimeout(() => {
          const processedData: EmployeeRecord[] = jsonData.map((row: any) => ({
            code: String(row['Employee Code'] || row['code'] || ''),
            name: String(row['Name'] || row['name'] || ''),
            department: String(row['Department'] || row['department'] || ''),
            collieryArea: String(row['Colliery Area'] || row['collieryArea'] || row['Area'] || ''),
            month: String(row['Month'] || row['month'] || ''),
            gross: String(row['Gross'] || row['gross'] || ''),
            net: String(row['Net'] || row['net'] || ''),
          })).filter(record => record.code && record.name);

          if (processedData.length === 0) {
            setUploadStatus('error');
            setUploadMessage('No valid records found. Please check your file format.');
            return;
          }

          setEmployeeData(processedData);
          setRecordCount(processedData.length);
          setUploadStatus('success');
          setUploadMessage(`Successfully imported ${processedData.length} records!`);
          setCurrentPage(1);
        }, 1000);
      } catch (error) {
        setUploadStatus('error');
        setUploadMessage('Error reading file. Please ensure it is a valid CSV or XLSX file.');
      }
    };

    reader.onerror = () => {
      setUploadStatus('error');
      setUploadMessage('Failed to read file. Please try again.');
    };

    reader.readAsBinaryString(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const closeUploadDialog = () => {
    setIsUploadOpen(false);
    setUploadStatus('idle');
    setUploadMessage('');
  };

  const filteredData = employeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = selectedMonth === 'All Months' || employee.month === selectedMonth;
    const matchesDepartment = selectedDepartment === 'All Departments' || employee.department === selectedDepartment;
    const matchesCollieryArea = selectedCollieryArea === 'All Areas' || employee.collieryArea === selectedCollieryArea;
    return matchesSearch && matchesMonth && matchesDepartment && matchesCollieryArea;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedMonth('All Months');
    setSelectedDepartment('All Departments');
    setSelectedCollieryArea('All Areas');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedMonth !== 'All Months' || selectedDepartment !== 'All Departments' || selectedCollieryArea !== 'All Areas';

  const activeFilterCount = [
    searchQuery,
    selectedMonth !== 'All Months' ? selectedMonth : null,
    selectedDepartment !== 'All Departments' ? selectedDepartment : null,
    selectedCollieryArea !== 'All Areas' ? selectedCollieryArea : null,
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="stat-card"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              Upload Dataset
            </DialogTitle>
            <DialogDescription>
              Upload a CSV or XLSX file containing payroll data
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {uploadStatus === 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={handleUploadClick}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-1">Click to upload</p>
                <p className="text-sm text-muted-foreground">CSV or XLSX files supported</p>
              </motion.div>
            )}

            {uploadStatus === 'loading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-foreground font-medium">{uploadMessage}</p>
                <div className="w-48 h-2 bg-muted rounded-full mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}

            {uploadStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <CheckCircle2 className="w-16 h-16 text-ecl-green mb-4" />
                <p className="text-foreground font-medium text-lg">{uploadMessage}</p>
                <p className="text-sm text-muted-foreground mt-2">{recordCount} employee records loaded</p>
                <Button onClick={closeUploadDialog} className="mt-6">
                  Done
                </Button>
              </motion.div>
            )}

            {uploadStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <AlertCircle className="w-16 h-16 text-destructive mb-4" />
                <p className="text-foreground font-medium">{uploadMessage}</p>
                <Button variant="outline" onClick={() => setUploadStatus('idle')} className="mt-6">
                  Try Again
                </Button>
              </motion.div>
            )}
          </div>

          {uploadStatus === 'idle' && (
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Expected columns:</p>
              <p>Employee Code, Name, Department, Colliery Area, Month, Gross, Net</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">Payroll Data</h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Dataset
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              <X className="w-4 h-4" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search name or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetFilters();
              }}
              className="pl-10 bg-background"
            />
          </div>

          {/* Month Filter */}
          <div className="space-y-1.5">
            <Select
              value={selectedMonth}
              onValueChange={(value) => {
                setSelectedMonth(value);
                resetFilters();
              }}
            >
              <SelectTrigger className="bg-background">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Month" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department Filter */}
          <div className="space-y-1.5">
            <Select
              value={selectedDepartment}
              onValueChange={(value) => {
                setSelectedDepartment(value);
                resetFilters();
              }}
            >
              <SelectTrigger className="bg-background">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Colliery Area Filter */}
          <div className="space-y-1.5">
            <Select
              value={selectedCollieryArea}
              onValueChange={(value) => {
                setSelectedCollieryArea(value);
                resetFilters();
              }}
            >
              <SelectTrigger className="bg-background">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Area" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {collieryAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Colliery Area</th>
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
                <td className="py-3 px-4 text-sm text-muted-foreground">{employee.collieryArea}</td>
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
