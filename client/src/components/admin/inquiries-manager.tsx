import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Eye, 
  Trash2, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  MessageSquare,
  User,
  Building,
  Phone,
  Calendar,
  Tag,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Inquiry } from "@shared/schema";

export default function InquiriesManager() {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const { toast } = useToast();

  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const updateInquiryMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PUT", `/api/inquiries/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({
        title: "Success",
        description: "Inquiry status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/inquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      setSelectedInquiry(null);
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      });
    },
  });

  // Filter and sort inquiries
  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesStatus = filterStatus === "all" || inquiry.status === filterStatus;
    const matchesSearch = !searchQuery || 
      inquiry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  })?.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      case "oldest":
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
      case "name":
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      default:
        return 0;
    }
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "replied": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new": return <Clock className="w-3 h-3" />;
      case "replied": return <MessageSquare className="w-3 h-3" />;
      case "resolved": return <CheckCircle className="w-3 h-3" />;
      default: return <Mail className="w-3 h-3" />;
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case "product": return "bg-marine-teal text-white";
      case "export": return "bg-ocean-blue text-white";
      case "logistics": return "bg-golden-orange text-white";
      case "partnership": return "bg-coral-accent text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    updateInquiryMutation.mutate({ id, status: newStatus });
  };

  const handleDeleteInquiry = (id: number) => {
    if (window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
      deleteInquiryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Contact Inquiries
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredInquiries.length} inquiries
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-inquiries"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40" data-testid="select-filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "name") => setSortBy(value)}>
              <SelectTrigger className="w-40" data-testid="select-sort-by">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {inquiries?.length === 0 ? "No inquiries yet" : "No inquiries match your filters"}
            </h3>
            <p className="text-gray-600">
              {inquiries?.length === 0 
                ? "Contact inquiries will appear here when received."
                : "Try adjusting your search or filter criteria."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {inquiry.firstName} {inquiry.lastName}
                      </h3>
                      <Badge className={`text-xs px-2 py-1 ${getStatusColor(inquiry.status!)}`}>
                        {getStatusIcon(inquiry.status!)}
                        <span className="ml-1 capitalize">{inquiry.status}</span>
                      </Badge>
                      {inquiry.topic && (
                        <Badge className={`text-xs px-2 py-1 ${getTopicColor(inquiry.topic)}`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {inquiry.topic}
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {inquiry.email}
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {inquiry.phone}
                        </div>
                      )}
                      {inquiry.company && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="w-4 h-4 mr-2" />
                          {inquiry.company}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {format(new Date(inquiry.createdAt!), "MMM dd, yyyy 'at' HH:mm")}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {inquiry.message}
                    </p>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInquiry(inquiry)}
                            data-testid={`button-view-inquiry-${inquiry.id}`}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Inquiry Details</DialogTitle>
                          </DialogHeader>
                          {selectedInquiry && (
                            <div className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Name</label>
                                  <p className="text-gray-900">{selectedInquiry.firstName} {selectedInquiry.lastName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Email</label>
                                  <p className="text-gray-900">{selectedInquiry.email}</p>
                                </div>
                                {selectedInquiry.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Phone</label>
                                    <p className="text-gray-900">{selectedInquiry.phone}</p>
                                  </div>
                                )}
                                {selectedInquiry.company && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Company</label>
                                    <p className="text-gray-900">{selectedInquiry.company}</p>
                                  </div>
                                )}
                                {selectedInquiry.topic && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Topic</label>
                                    <p className="text-gray-900 capitalize">{selectedInquiry.topic}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <p className="text-gray-900 capitalize">{selectedInquiry.status || 'new'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Received</label>
                                  <p className="text-gray-900">
                                    {format(new Date(selectedInquiry.createdAt!), "MMMM dd, yyyy 'at' HH:mm")}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Message</label>
                                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                  <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 pt-4 border-t">
                                <Select
                                  value={selectedInquiry.status || 'new'}
                                  onValueChange={(value) => handleStatusUpdate(selectedInquiry.id, value)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="replied">Replied</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                                  data-testid={`button-delete-inquiry-${selectedInquiry.id}`}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Select
                        value={inquiry.status || 'new'}
                        onValueChange={(value) => handleStatusUpdate(inquiry.id, value)}
                      >
                        <SelectTrigger className="w-32" data-testid={`select-status-${inquiry.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        data-testid={`button-delete-inquiry-list-${inquiry.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 ml-4">
                    {formatDistanceToNow(new Date(inquiry.createdAt!))} ago
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}