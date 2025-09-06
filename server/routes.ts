import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth, requireAdmin } from "./auth";
import { sendInquiryNotification, sendInquiryConfirmation } from "./email-service";
import { 
  insertBlogPostSchema, 
  insertTestimonialSchema, 
  insertProductSchema, 
  insertInquirySchema,
  insertWebsiteContentSchema,
  insertMediaFileSchema,
  insertWebsiteSettingSchema
} from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ObjectStorageService } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Multer configuration for file uploads (using memory storage for object storage)
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: function (req, file, cb) {
      // Allow only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    }
  });

  const objectStorageService = new ObjectStorageService();

  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Test route for debugging production
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working', timestamp: new Date().toISOString() });
  });

  // Auth middleware
  setupAuth(app);

  // Public object serving endpoint
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Authentication is now handled in auth.ts

  // Blog routes
  app.get('/api/blog', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get('/api/blog/slug/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post('/api/blog', requireAuth, async (req: any, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      
      // Get author ID from authenticated user
      const authorId = req.user.id;
      
      // Generate slug from title
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const post = await storage.createBlogPost({ ...postData, slug }, authorId);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put('/api/blog/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const postData = insertBlogPostSchema.partial().parse(req.body);
      
      // Update slug if title changed
      if (postData.title) {
        postData.slug = postData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      
      const post = await storage.updateBlogPost(id, postData);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/blog/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      await storage.deleteBlogPost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Testimonial routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const testimonials = await storage.getTestimonials(published);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Public endpoint for customer testimonial submissions
  app.post('/api/testimonials/submit', async (req, res) => {
    try {
      // Create a specific schema for public submissions (no admin-only fields)
      const publicTestimonialSchema = insertTestimonialSchema.pick({
        name: true,
        company: true,
        content: true,
        rating: true
      });
      
      const testimonialData = publicTestimonialSchema.parse(req.body);
      
      // Set published to false for customer submissions - require admin approval
      const testimonial = await storage.createTestimonial({
        ...testimonialData,
        published: false
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your testimonial! It will be reviewed and published soon.",
        testimonial 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to submit testimonial" });
    }
  });

  app.post('/api/testimonials', requireAuth, async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put('/api/testimonials/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, testimonialData);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete('/api/testimonials/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      await storage.deleteTestimonial(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Product routes
  app.get('/api/products', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const products = await storage.getProducts(published);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post('/api/products', requireAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put('/api/products/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Product validation errors:", error.errors);
        console.error("Request body:", req.body);
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      console.error("Error updating product:", error);
      console.error("Request body:", req.body);
      console.error("Product ID:", req.params.id);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/products/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      await storage.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Inquiry routes
  app.get('/api/inquiries', requireAuth, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.post('/api/inquiries', async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      
      // Send email notifications asynchronously (don't block the response)
      Promise.all([
        sendInquiryNotification(inquiry),
        sendInquiryConfirmation(inquiry)
      ]).catch((emailError) => {
        console.error("Failed to send email notifications:", emailError);
        // Don't fail the request if email fails
      });
      
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  app.put('/api/inquiries/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid inquiry ID" });
      }
      
      const inquiryData = { status: req.body.status };
      const inquiry = await storage.updateInquiry(id, inquiryData);
      res.json(inquiry);
    } catch (error) {
      console.error("Error updating inquiry:", error);
      res.status(500).json({ message: "Failed to update inquiry" });
    }
  });

  app.delete('/api/inquiries/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid inquiry ID" });
      }
      
      await storage.deleteInquiry(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      res.status(500).json({ message: "Failed to delete inquiry" });
    }
  });

  // Website Content routes
  app.get('/api/content', async (req, res) => {
    try {
      const section = req.query.section as string;
      const content = await storage.getWebsiteContent(section);
      res.json(content);
    } catch (error) {
      console.error("Error fetching website content:", error);
      res.status(500).json({ message: "Failed to fetch website content" });
    }
  });

  app.get('/api/content/:section', async (req, res) => {
    try {
      const section = req.params.section;
      const content = await storage.getWebsiteContentBySection(section);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      console.error("Error fetching website content:", error);
      res.status(500).json({ message: "Failed to fetch website content" });
    }
  });

  app.post('/api/content', requireAuth, async (req, res) => {
    try {
      const contentData = insertWebsiteContentSchema.parse(req.body);
      const content = await storage.createWebsiteContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      console.error("Error creating website content:", error);
      res.status(500).json({ message: "Failed to create website content" });
    }
  });

  app.put('/api/content/:section', requireAuth, async (req, res) => {
    try {
      const section = req.params.section;
      const contentData = insertWebsiteContentSchema.partial().parse(req.body);
      const content = await storage.updateWebsiteContentBySection(section, contentData);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      console.error("Error updating website content:", error);
      res.status(500).json({ message: "Failed to update website content" });
    }
  });

  app.delete('/api/content/:section', requireAuth, async (req, res) => {
    try {
      const section = req.params.section;
      await storage.deleteWebsiteContentBySection(section);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting website content:", error);
      res.status(500).json({ message: "Failed to delete website content" });
    }
  });

  // Media Files routes
  app.get('/api/media', requireAuth, async (req, res) => {
    try {
      const category = req.query.category as string;
      const mediaFiles = await storage.getMediaFiles(category);
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.get('/api/media/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media file ID" });
      }
      
      const mediaFile = await storage.getMediaFile(id);
      if (!mediaFile) {
        return res.status(404).json({ message: "Media file not found" });
      }
      
      res.json(mediaFile);
    } catch (error) {
      console.error("Error fetching media file:", error);
      res.status(500).json({ message: "Failed to fetch media file" });
    }
  });

  // File upload endpoint using object storage (no auth required for blog images)
  app.post('/api/media/upload', upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get user ID from authenticated user (or default for blog images)
      const uploadedBy = req.user?.id || 1;

      // Check if object storage is available, fallback to local storage in production
      let fileUrl: string;
      
      try {
        // Try object storage first
        fileUrl = await objectStorageService.uploadFileBuffer(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );
      } catch (storageError: any) {
        console.log("Object storage failed, using fallback:", storageError?.message);
        
        // Fallback to local storage for production
        const uploadsDir = path.join(process.cwd(), 'uploads/media');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(req.file.originalname);
        const filepath = path.join(uploadsDir, filename);
        
        fs.writeFileSync(filepath, req.file.buffer);
        fileUrl = `/uploads/media/${filename}`;
        console.log("Using local file storage:", fileUrl);
      }
      
      const mediaData = {
        filename: req.file.originalname,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        alt: req.body.alt || req.file.originalname,
        category: req.body.category || 'general',
        uploadedBy,
      };

      const mediaFile = await storage.createMediaFile(mediaData);
      res.status(201).json({ 
        ...mediaFile,
        url: fileUrl
      });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      console.error("Error details:", error?.message);
      console.error("Stack trace:", error?.stack);
      res.status(500).json({ message: "Failed to upload file", error: error?.message || "Unknown error" });
    }
  });

  app.post('/api/media', requireAuth, async (req: any, res) => {
    try {
      const mediaData = insertMediaFileSchema.parse(req.body);
      
      // Get user ID from authenticated user
      const uploadedBy = req.user.id;
      
      const mediaFile = await storage.createMediaFile({ ...mediaData, uploadedBy });
      res.status(201).json(mediaFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid media file data", errors: error.errors });
      }
      console.error("Error creating media file:", error);
      res.status(500).json({ message: "Failed to create media file" });
    }
  });

  app.put('/api/media/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media file ID" });
      }
      
      const mediaData = insertMediaFileSchema.partial().parse(req.body);
      const mediaFile = await storage.updateMediaFile(id, mediaData);
      res.json(mediaFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid media file data", errors: error.errors });
      }
      console.error("Error updating media file:", error);
      res.status(500).json({ message: "Failed to update media file" });
    }
  });

  app.delete('/api/media/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media file ID" });
      }
      
      await storage.deleteMediaFile(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // Website Settings routes
  app.get('/api/settings', requireAuth, async (req, res) => {
    try {
      const category = req.query.category as string;
      const settings = await storage.getWebsiteSettings(category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching website settings:", error);
      res.status(500).json({ message: "Failed to fetch website settings" });
    }
  });

  app.get('/api/settings/:key', async (req, res) => {
    try {
      const key = req.params.key;
      const setting = await storage.getWebsiteSettingByKey(key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      console.error("Error fetching website setting:", error);
      res.status(500).json({ message: "Failed to fetch website setting" });
    }
  });

  app.post('/api/settings', requireAuth, async (req, res) => {
    try {
      const settingData = insertWebsiteSettingSchema.parse(req.body);
      const setting = await storage.createWebsiteSetting(settingData);
      res.status(201).json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid setting data", errors: error.errors });
      }
      console.error("Error creating website setting:", error);
      res.status(500).json({ message: "Failed to create website setting" });
    }
  });

  app.put('/api/settings/:key', requireAuth, async (req, res) => {
    try {
      const key = req.params.key;
      const settingData = insertWebsiteSettingSchema.partial().parse(req.body);
      const setting = await storage.updateWebsiteSettingByKey(key, settingData);
      res.json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid setting data", errors: error.errors });
      }
      console.error("Error updating website setting:", error);
      res.status(500).json({ message: "Failed to update website setting" });
    }
  });

  app.delete('/api/settings/:key', requireAuth, async (req, res) => {
    try {
      const key = req.params.key;
      await storage.deleteWebsiteSettingByKey(key);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting website setting:", error);
      res.status(500).json({ message: "Failed to delete website setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
