import { Module } from '../types/course';

export const careerPlanningModules: Module[] = [
  {
    id: 'module-1',
    title: 'Understanding Career Development',
    description: 'Learn the fundamentals of career planning and development',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to Career Planning',
        duration: '15 mins',
        type: 'content',
        content: `
# Introduction to Career Planning

Career planning is a lifelong process that helps you manage your learning and development to make informed career choices. This lesson will introduce you to the key concepts and principles of effective career planning.

## What is Career Planning?

Career planning is the continuous process of:
- Setting career goals
- Developing skills and competencies
- Making informed decisions about your career path
- Taking action to achieve your objectives

## Why is Career Planning Important?

1. **Direction and Purpose**
   - Provides clear goals and objectives
   - Helps maintain focus and motivation
   - Creates a sense of purpose

2. **Better Decision Making**
   - Informed choices about education and training
   - Strategic approach to job opportunities
   - Understanding of industry trends

3. **Professional Growth**
   - Continuous skill development
   - Increased job satisfaction
   - Better work-life balance

## The Career Planning Process

1. Self-Assessment
2. Career Exploration
3. Goal Setting
4. Action Planning
5. Implementation
6. Evaluation and Adjustment

Remember: Career planning is not a one-time event but an ongoing process that evolves with your experiences and goals.
        `
      },
      {
        id: 'lesson-1-2',
        title: 'Self-Assessment Techniques',
        duration: '20 mins',
        type: 'content',
        content: `
# Self-Assessment Techniques

Understanding yourself is the foundation of effective career planning. This lesson covers various techniques to assess your skills, interests, values, and personality.

## Key Areas of Self-Assessment

### 1. Skills Assessment
- Technical skills
- Soft skills
- Transferable skills
- Areas for development

### 2. Interest Inventory
- Professional interests
- Industry preferences
- Work environment preferences
- Role types

### 3. Values Clarification
- Work-life balance
- Salary expectations
- Company culture
- Professional ethics

### 4. Personality Analysis
- Work style
- Communication preferences
- Leadership potential
- Team dynamics

## Common Assessment Tools
1. SWOT Analysis
2. Myers-Briggs Type Indicator
3. Holland Code (RIASEC)
4. Skills Inventory Matrix

## Action Steps
1. Complete a personal SWOT analysis
2. List your top 5 skills
3. Identify 3 areas for improvement
4. Define your core work values
        `
      },
      {
        id: 'lesson-1-3',
        title: 'Module 1 Quiz',
        duration: '10 mins',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the primary purpose of career planning?',
            options: [
              'To find a job immediately',
              'To manage learning and development for informed career choices',
              'To earn a higher salary',
              'To impress potential employers'
            ],
            correctAnswer: 1
          },
          {
            id: 'q2',
            question: 'Which of the following is NOT a key area of self-assessment?',
            options: [
              'Skills Assessment',
              'Interest Inventory',
              'Social Media Presence',
              'Values Clarification'
            ],
            correctAnswer: 2
          },
          {
            id: 'q3',
            question: 'How many main steps are there in the career planning process?',
            options: [
              '3 steps',
              '4 steps',
              '5 steps',
              '6 steps'
            ],
            correctAnswer: 3
          }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Goal Setting and Action Planning',
    description: 'Learn how to set SMART career goals and create action plans',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Setting SMART Career Goals',
        duration: '25 mins',
        type: 'content',
        content: 'This content will be unlocked in the full course.'
      },
      {
        id: 'lesson-2-2',
        title: 'Career Action Plan Workshop',
        duration: '30 mins',
        type: 'assignment',
        content: 'This content will be unlocked in the full course.'
      }
    ],
    isLocked: true
  }
];