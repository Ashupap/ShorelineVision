#!/usr/bin/env node

// Quick production debugging script for product update issues
// Usage: node debug-production.js

console.log('=== Production Debug Script ===');

// Check if we're in production environment
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

// Test data size limits
const testBase64Image = 'data:image/jpeg;base64,' + 'A'.repeat(100000); // ~100KB
console.log('Test image size:', testBase64Image.length, 'characters');

// Test product data structure
const testProductData = {
  name: "Test Product",
  description: "Test description",
  category: "Test Category",
  specifications: "Test specs",
  published: true,
  order: 1,
  featuredImage: testBase64Image
};

console.log('Test product data size:', JSON.stringify(testProductData).length, 'bytes');

// Check for potential issues
const issues = [];

if (JSON.stringify(testProductData).length > 10 * 1024 * 1024) {
  issues.push('Product data exceeds 10MB limit');
}

if (testProductData.featuredImage.length > 1024 * 1024) {
  issues.push('Image data is very large (>1MB)');
}

if (issues.length > 0) {
  console.log('\n⚠️  Potential Issues Found:');
  issues.forEach(issue => console.log(`  - ${issue}`));
} else {
  console.log('\n✅ No obvious data size issues detected');
}

console.log('\n💡 To debug further:');
console.log('1. Check production server logs for detailed error messages');
console.log('2. Verify database schema matches development');
console.log('3. Test with smaller images first');
console.log('4. Check network/proxy limits in production');