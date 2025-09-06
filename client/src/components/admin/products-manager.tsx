import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Fish, 
  Save, 
  X, 
  Eye,
  EyeOff,
  Image as ImageIcon,
  Package,
  Upload,
  Camera
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ProductFormData {
  name: string;
  description: string;
  featuredImage: string;
  category: string;
  specifications: string;
  published: boolean;
  order: number;
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  featuredImage: "",
  category: "",
  specifications: "",
  published: true,
  order: 0,
};

export default function ProductsManager() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showUnpublished, setShowUnpublished] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const response = await apiRequest("POST", "/api/products", productData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsCreateModalOpen(false);
      setFormData(initialFormData);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, productData }: { id: number; productData: Partial<ProductFormData> }) => {
      const response = await apiRequest("PUT", `/api/products/${id}`, productData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingProduct(null);
      setFormData(initialFormData);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Update product error:", error);
      toast({
        title: "Error", 
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(products?.map(p => p.category) || []));

  // Filter products based on criteria
  const filteredProducts = products?.filter(product => {
    const categoryMatch = filterCategory === "all" || product.category === filterCategory;
    const publishedMatch = showUnpublished || product.published;
    return categoryMatch && publishedMatch;
  }) || [];

  const handleCreateProduct = () => {
    setFormData(initialFormData);
    setEditingProduct(null);
    setIsCreateModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      featuredImage: product.featuredImage || "",
      category: product.category,
      specifications: product.specifications || "",
      published: product.published ?? true,
      order: product.order ?? 0,
    });
    setEditingProduct(product);
    setIsCreateModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, productData: formData });
    } else {
      createProductMutation.mutate(formData);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProductMutation.mutate(id);
    }
  };

  const togglePublished = (product: Product) => {
    updateProductMutation.mutate({
      id: product.id,
      productData: { published: !product.published }
    });
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    try {
      // Compress and convert to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        // Set canvas size and draw compressed image
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        setFormData(prev => ({ ...prev, featuredImage: compressedDataUrl }));
        toast({
          title: "Success",
          description: "Image uploaded and compressed successfully",
        });
        setUploadingImage(false);
      };
      
      img.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to process image",
          variant: "destructive",
        });
        setUploadingImage(false);
      };
      
      // Load image from file
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setUploadingImage(false);
    }
  };

  const isSubmitting = createProductMutation.isPending || updateProductMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-blue"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your seafood products and categories
          </p>
        </div>
        <Button 
          onClick={handleCreateProduct}
          className="bg-ocean-blue hover:bg-deep-navy"
          data-testid="button-create-product"
        >
          <Plus size={20} className="mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="category-filter">Category:</Label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              data-testid="select-category-filter"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              id="show-unpublished"
              checked={showUnpublished}
              onCheckedChange={setShowUnpublished}
              data-testid="switch-show-unpublished"
            />
            <Label htmlFor="show-unpublished">Show Unpublished</Label>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredProducts.length} of {products?.length || 0} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Fish className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {products?.length === 0 ? "No products yet" : "No products match your filters"}
          </h3>
          <p className="text-gray-600 mb-6">
            {products?.length === 0 
              ? "Create your first seafood product to get started." 
              : "Try adjusting your filters to see more products."
            }
          </p>
          {products?.length === 0 && (
            <Button 
              onClick={handleCreateProduct}
              className="bg-ocean-blue hover:bg-deep-navy"
              data-testid="button-create-first-product"
            >
              Create First Product
            </Button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative h-48 bg-gray-100">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => togglePublished(product)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                          data-testid={`button-toggle-published-${product.id}`}
                        >
                          {product.published ? "Published" : "Draft"}
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 mb-1" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Category: {product.category}
                      </p>
                      {product.order !== undefined && product.order !== 0 && (
                        <p className="text-xs text-gray-500">
                          Order: {product.order}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>
                        Created {formatDistanceToNow(new Date(product.createdAt!))} ago
                      </span>
                      {product.updatedAt !== product.createdAt && (
                        <span>
                          Updated {formatDistanceToNow(new Date(product.updatedAt!))} ago
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditProduct(product)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      
                      <Button
                        onClick={() => togglePublished(product)}
                        variant="outline"
                        size="sm"
                        className="px-2"
                        title={product.published ? "Unpublish" : "Publish"}
                        data-testid={`button-visibility-${product.id}`}
                      >
                        {product.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </Button>
                      
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete product"
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create/Edit Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package size={20} />
              {editingProduct ? "Edit Product" : "Create New Product"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Fresh Atlantic Salmon"
                  required
                  data-testid="input-product-name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Fish, Shellfish, Frozen"
                  required
                  data-testid="input-product-category"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed product description..."
                required
                rows={4}
                data-testid="textarea-product-description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <div className="flex gap-2">
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg or upload below"
                  type="url"
                  className="flex-1"
                  data-testid="input-product-image"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadingImage}
                    data-testid="input-upload-image"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImage}
                    className="px-3"
                    data-testid="button-upload-image"
                  >
                    {uploadingImage ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    ) : (
                      <Upload size={16} />
                    )}
                  </Button>
                </div>
              </div>
              {formData.featuredImage && (
                <div className="mt-2">
                  <div className="relative inline-block">
                    <img 
                      src={formData.featuredImage} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: "" }))}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white"
                      data-testid="button-remove-image"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Upload an image file (max 10MB, will be automatically compressed) or enter a URL above
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specifications">Specifications</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
                placeholder="Product specifications, certifications, etc."
                rows={3}
                data-testid="textarea-product-specifications"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  min="0"
                  data-testid="input-product-order"
                />
                <p className="text-xs text-gray-500">Higher numbers appear first</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="published">Publish Status</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                    data-testid="switch-product-published"
                  />
                  <span className="text-sm text-gray-600">
                    {formData.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-ocean-blue hover:bg-deep-navy flex-1"
                data-testid="button-save-product"
              >
                <Save size={16} className="mr-2" />
                {isSubmitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isSubmitting}
                data-testid="button-cancel-product"
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}