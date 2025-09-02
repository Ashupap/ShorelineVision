import {
  users,
  blogPosts,
  testimonials,
  products,
  inquiries,
  websiteContent,
  mediaFiles,
  websiteSettings,
  type User,
  type UpsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type Product,
  type InsertProduct,
  type Inquiry,
  type InsertInquiry,
  type WebsiteContent,
  type InsertWebsiteContent,
  type MediaFile,
  type InsertMediaFile,
  type WebsiteSetting,
  type InsertWebsiteSetting,
} from "@shared/schema";
import { db } from "./db-dev";
import { eq, desc, like, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Blog operations
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost, authorId: string): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Testimonial operations
  getTestimonials(published?: boolean): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;
  
  // Product operations
  getProducts(published?: boolean): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  
  // Inquiry operations
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: number, inquiry: Partial<InsertInquiry>): Promise<Inquiry>;
  deleteInquiry(id: number): Promise<void>;
  
  // Website Content operations
  getWebsiteContent(section?: string): Promise<WebsiteContent[]>;
  getWebsiteContentBySection(section: string): Promise<WebsiteContent | undefined>;
  createWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent>;
  updateWebsiteContentBySection(section: string, content: Partial<InsertWebsiteContent>): Promise<WebsiteContent>;
  deleteWebsiteContentBySection(section: string): Promise<void>;
  
  // Media File operations
  getMediaFiles(category?: string): Promise<MediaFile[]>;
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(media: InsertMediaFile & { uploadedBy: string }): Promise<MediaFile>;
  updateMediaFile(id: number, media: Partial<InsertMediaFile>): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<void>;
  
  // Website Settings operations
  getWebsiteSettings(category?: string): Promise<WebsiteSetting[]>;
  getWebsiteSettingByKey(key: string): Promise<WebsiteSetting | undefined>;
  createWebsiteSetting(setting: InsertWebsiteSetting): Promise<WebsiteSetting>;
  updateWebsiteSettingByKey(key: string, setting: Partial<InsertWebsiteSetting>): Promise<WebsiteSetting>;
  deleteWebsiteSettingByKey(key: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // MySQL doesn't have onConflictDoUpdate, so we'll first try to insert
    // If that fails, we'll update
    try {
      await db.insert(users).values(userData);
      const [user] = await db.select().from(users).where(eq(users.id, userData.id));
      return user;
    } catch (error) {
      // If insert fails due to duplicate key, update instead
      await db.update(users)
        .set({ ...userData, updatedAt: new Date() })
        .where(eq(users.id, userData.id));
      const [user] = await db.select().from(users).where(eq(users.id, userData.id));
      return user;
    }
  }

  // Blog operations
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const query = db.select().from(blogPosts);
    if (published !== undefined) {
      query.where(eq(blogPosts.published, published));
    }
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost, authorId: string): Promise<BlogPost> {
    const result = await db
      .insert(blogPosts)
      .values({ ...post, authorId });
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(blogPosts).where(eq(blogPosts.id, insertId));
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id));
    
    const [updated] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Testimonial operations
  async getTestimonials(published?: boolean): Promise<Testimonial[]> {
    const query = db.select().from(testimonials);
    if (published !== undefined) {
      query.where(eq(testimonials.published, published));
    }
    return await query.orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db
      .insert(testimonials)
      .values(testimonial);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(testimonials).where(eq(testimonials.id, insertId));
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id));
    
    const [updated] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Product operations
  async getProducts(published?: boolean): Promise<Product[]> {
    const query = db.select().from(products);
    if (published !== undefined) {
      query.where(eq(products.published, published));
    }
    return await query.orderBy(products.order, desc(products.createdAt));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db
      .insert(products)
      .values(product);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(products).where(eq(products.id, insertId));
    return created;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id));
    
    const [updated] = await db.select().from(products).where(eq(products.id, id));
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Inquiry operations
  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const result = await db
      .insert(inquiries)
      .values(inquiry);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(inquiries).where(eq(inquiries.id, insertId));
    return created;
  }

  async updateInquiry(id: number, inquiry: Partial<InsertInquiry>): Promise<Inquiry> {
    await db
      .update(inquiries)
      .set({ ...inquiry, updatedAt: new Date() })
      .where(eq(inquiries.id, id));
    
    const [updated] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return updated;
  }

  async deleteInquiry(id: number): Promise<void> {
    await db.delete(inquiries).where(eq(inquiries.id, id));
  }

  // Website Content operations
  async getWebsiteContent(section?: string): Promise<WebsiteContent[]> {
    const query = db.select().from(websiteContent);
    if (section) {
      query.where(eq(websiteContent.section, section));
    }
    return await query.orderBy(websiteContent.section);
  }

  async getWebsiteContentBySection(section: string): Promise<WebsiteContent | undefined> {
    const [content] = await db.select().from(websiteContent).where(eq(websiteContent.section, section));
    return content;
  }

  async createWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent> {
    const result = await db
      .insert(websiteContent)
      .values(content);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(websiteContent).where(eq(websiteContent.id, insertId));
    return created;
  }

  async updateWebsiteContentBySection(section: string, content: Partial<InsertWebsiteContent>): Promise<WebsiteContent> {
    await db
      .update(websiteContent)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(websiteContent.section, section));
    
    const [updated] = await db.select().from(websiteContent).where(eq(websiteContent.section, section));
    return updated;
  }

  async deleteWebsiteContentBySection(section: string): Promise<void> {
    await db.delete(websiteContent).where(eq(websiteContent.section, section));
  }

  // Media File operations
  async getMediaFiles(category?: string): Promise<MediaFile[]> {
    const query = db.select().from(mediaFiles);
    if (category) {
      query.where(eq(mediaFiles.category, category));
    }
    return await query.orderBy(desc(mediaFiles.createdAt));
  }

  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    const [media] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return media;
  }

  async createMediaFile(media: InsertMediaFile & { uploadedBy: string }): Promise<MediaFile> {
    const result = await db
      .insert(mediaFiles)
      .values(media);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, insertId));
    return created;
  }

  async updateMediaFile(id: number, media: Partial<InsertMediaFile>): Promise<MediaFile> {
    await db
      .update(mediaFiles)
      .set(media)
      .where(eq(mediaFiles.id, id));
    
    const [updated] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return updated;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }

  // Website Settings operations
  async getWebsiteSettings(category?: string): Promise<WebsiteSetting[]> {
    const query = db.select().from(websiteSettings);
    if (category) {
      query.where(eq(websiteSettings.category, category));
    }
    return await query.orderBy(websiteSettings.category, websiteSettings.key);
  }

  async getWebsiteSettingByKey(key: string): Promise<WebsiteSetting | undefined> {
    const [setting] = await db.select().from(websiteSettings).where(eq(websiteSettings.key, key));
    return setting;
  }

  async createWebsiteSetting(setting: InsertWebsiteSetting): Promise<WebsiteSetting> {
    const result = await db
      .insert(websiteSettings)
      .values(setting);
    
    const insertId = result[0].insertId;
    const [created] = await db.select().from(websiteSettings).where(eq(websiteSettings.id, insertId));
    return created;
  }

  async updateWebsiteSettingByKey(key: string, setting: Partial<InsertWebsiteSetting>): Promise<WebsiteSetting> {
    await db
      .update(websiteSettings)
      .set({ ...setting, updatedAt: new Date() })
      .where(eq(websiteSettings.key, key));
    
    const [updated] = await db.select().from(websiteSettings).where(eq(websiteSettings.key, key));
    return updated;
  }

  async deleteWebsiteSettingByKey(key: string): Promise<void> {
    await db.delete(websiteSettings).where(eq(websiteSettings.key, key));
  }
}

export const storage = new DatabaseStorage();
