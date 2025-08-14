import * as yup from 'yup';

// Create todo validation schema
export const createTodoSchema = yup.object({
  title: yup
    .string()
    .min(1, 'Title must be at least 1 character long')
    .max(200, 'Title cannot exceed 200 characters')
    .required('Title is required')
    .trim(),
  
  content: yup
    .string()
    .min(1, 'Content must be at least 1 character long')
    .max(1000, 'Content cannot exceed 1000 characters')
    .required('Content is required')
    .trim(),
  
  status: yup
    .string()
    .oneOf(['pending', 'completed'], 'Status must be either pending or completed')
    .default('pending')
});

// Update todo validation schema
export const updateTodoSchema = yup.object({
  title: yup
    .string()
    .min(1, 'Title must be at least 1 character long')
    .max(200, 'Title cannot exceed 200 characters')
    .optional()
    .trim(),
  
  content: yup
    .string()
    .min(1, 'Content must be at least 1 character long')
    .max(1000, 'Content cannot exceed 1000 characters')
    .optional()
    .trim(),
  
  status: yup
    .string()
    .oneOf(['pending', 'completed'], 'Status must be either pending or completed')
    .optional()
});
