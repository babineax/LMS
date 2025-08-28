import PendingRequests from '@/components/librarian/PendingRequests';
import OverdueBooks from '@/components/librarian/OverdueBooks';

export default function LibrarianDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PendingRequests />
      <OverdueBooks />
    </div>
  );
}