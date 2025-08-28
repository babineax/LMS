import { getPendingRequests } from '@/services/library';

export default async function ApprovalPage() {
  const requests = await getPendingRequests();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Requests</h1>
      {requests.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}