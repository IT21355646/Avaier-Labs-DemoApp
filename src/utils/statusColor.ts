export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-blue-100 text-blue-700";
    case "in review":
      return "bg-yellow-100 text-yellow-700";
    case "approved":
      return "bg-green-100 text-green-700";
    case "renew":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};
