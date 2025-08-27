import { motion } from "framer-motion";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import { PerformanceImage } from "@/components/ui/performance-image";
import type { BlogPost } from "@shared/schema";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      {post.featuredImage && (
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 overflow-hidden"
          >
            <PerformanceImage
              src={post.featuredImage.includes('unsplash') ? `${post.featuredImage}&q=85&w=800&h=400` : post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </motion.div>
          <div className="absolute top-4 right-4 bg-ocean-blue text-white px-2 py-1 rounded text-xs">
            {post.category}
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{formatDistanceToNow(new Date(post.createdAt!))} ago</span>
          {!post.featuredImage && (
            <>
              <span className="mx-2">•</span>
              <span className="bg-ocean-blue text-white px-2 py-1 rounded text-xs">
                {post.category}
              </span>
            </>
          )}
        </div>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <Link href={`/blog/${post.slug}`}>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-ocean-blue font-semibold hover:text-deep-navy transition-colors flex items-center"
            data-testid={`button-read-more-${post.id}`}
          >
            Read More <ArrowRight size={16} className="ml-1" />
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );
}
