import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { categories, careers, about, settings } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const seedCategories = [
  { id: 'healthcare', name: 'Healthcare', icon: '🩺', description: 'Caring for people’s health and wellbeing.', sort: 1 },
  { id: 'technology', name: 'Technology', icon: '💻', description: 'Building software, devices, and digital tools.', sort: 2 },
  { id: 'education', name: 'Education', icon: '📚', description: 'Teaching and supporting learners of all ages.', sort: 3 },
  { id: 'engineering', name: 'Engineering', icon: '⚙️', description: 'Designing and building structures and systems.', sort: 4 },
  { id: 'arts', name: 'Arts & Design', icon: '🎨', description: 'Creating visual, written, and performing art.', sort: 5 },
  { id: 'business', name: 'Business & Finance', icon: '📈', description: 'Managing money, people, and organizations.', sort: 6 },
  { id: 'science', name: 'Science', icon: '🔬', description: 'Discovering how the world works through research.', sort: 7 },
  { id: 'publicsvc', name: 'Public Service', icon: '🛡️', description: 'Serving and protecting the community.', sort: 8 },
];

const seedCareers = [
  {
    id: 'registered-nurse', title: 'Registered Nurse', categoryId: 'healthcare', icon: '🩺', featured: true,
    shortDescription: 'Nurses care for patients, give treatments, and help people recover and stay healthy.',
    whatTheyDo: 'Registered Nurses (RNs) provide direct care to patients in hospitals, clinics, schools, and homes. They check vital signs, give medications, assist doctors during procedures, and explain treatment plans to patients and families. Nurses are often the people who spend the most time with patients, so they are key to comfort and recovery.',
    workEnvironment: 'Most nurses work in hospitals, but you can also find them in clinics, schools, nursing homes, and community health centers. The work can be fast-paced and involves standing, walking, and sometimes night or weekend shifts.',
    howToBecome: 'Earn a nursing degree (an Associate or Bachelor of Science in Nursing), then pass the NCLEX-RN licensing exam. Many nurses start by job shadowing or volunteering at a hospital to learn what the job is really like.',
    skills: ['Compassion and patience', 'Attention to detail', 'Communication', 'Staying calm under pressure', 'Teamwork'],
    salary: '$75,000 - $95,000 / year', jobOutlook: 'high', education: 'Associate or Bachelor’s degree in Nursing + license',
    dayInLife: 'A nurse might start their shift by checking on each patient, recording how they are feeling, and giving morning medications. Throughout the day they update doctors, comfort worried families, help patients move safely, and carefully chart everything. No two days are exactly the same.',
  },
  {
    id: 'software-engineer', title: 'Software Engineer', categoryId: 'technology', icon: '💻', featured: true,
    shortDescription: 'Software engineers design and build the apps, websites, and programs we use every day.',
    whatTheyDo: 'Software engineers write code to create computer programs — from phone apps and video games to the websites you visit. They solve problems by breaking big ideas into small steps a computer can follow, then test their work to make sure it runs smoothly.',
    workEnvironment: 'Many software engineers work in offices or from home on a computer. They often collaborate in teams, share ideas in meetings, and use online tools to work together even when they are far apart.',
    howToBecome: 'Most software engineers study computer science or a related field, but many also learn through coding bootcamps and online courses. Building small projects (like a simple game or website) is one of the best ways to start.',
    skills: ['Problem solving', 'Logical thinking', 'Curiosity and learning', 'Attention to detail', 'Teamwork'],
    salary: '$90,000 - $140,000 / year', jobOutlook: 'high', education: 'Bachelor’s in Computer Science (or bootcamp/self-taught)',
    dayInLife: 'An engineer might begin by checking messages from their team, then spend a few hours writing and testing code. They join a short meeting to plan what to build next, fix a bug someone reported, and review a teammate’s work before it goes live.',
  },
  {
    id: 'elementary-teacher', title: 'Elementary School Teacher', categoryId: 'education', icon: '📚', featured: true,
    shortDescription: 'Teachers help young students learn reading, math, and how to think and work together.',
    whatTheyDo: 'Elementary teachers plan lessons and teach core subjects like reading, writing, math, and science to young children. They create a safe, encouraging classroom, grade work, and help each student grow both academically and socially.',
    workEnvironment: 'Teachers work in elementary schools, usually with the same class of students all day. The job is active and social, with planning and grading often done before or after school hours.',
    howToBecome: 'Earn a bachelor’s degree in education (or a subject plus a teaching credential) and complete supervised student teaching. Each state also requires a teaching license.',
    skills: ['Patience', 'Creativity', 'Clear communication', 'Organization', 'Empathy'],
    salary: '$48,000 - $68,000 / year', jobOutlook: 'medium', education: 'Bachelor’s degree + teaching license',
    dayInLife: 'A teacher greets students in the morning, leads a reading lesson, then guides a hands-on math activity. After lunch they might do a science experiment, help students who need extra support, and end the day planning tomorrow’s lessons.',
  },
  {
    id: 'civil-engineer', title: 'Civil Engineer', categoryId: 'engineering', icon: '🏗️', featured: false,
    shortDescription: 'Civil engineers design roads, bridges, and buildings that keep communities running.',
    whatTheyDo: 'Civil engineers plan and design large structures like bridges, roads, dams, and buildings. They make sure these structures are safe, strong, and good for the environment, using math and science to test their designs before construction begins.',
    workEnvironment: 'Civil engineers split their time between offices (designing and calculating) and construction sites (checking that work matches the plans). The job often involves teamwork with architects and builders.',
    howToBecome: 'Earn a bachelor’s degree in civil engineering. To lead projects, engineers become licensed Professional Engineers (PE) by passing exams and gaining work experience.',
    skills: ['Math and physics', 'Problem solving', 'Attention to detail', 'Project planning', 'Communication'],
    salary: '$70,000 - $100,000 / year', jobOutlook: 'medium', education: 'Bachelor’s in Civil Engineering (PE license to lead)',
    dayInLife: 'An engineer might review blueprints in the morning, use software to test whether a bridge design can hold enough weight, then visit a construction site to make sure everything is being built correctly and safely.',
  },
  {
    id: 'graphic-designer', title: 'Graphic Designer', categoryId: 'arts', icon: '🎨', featured: false,
    shortDescription: 'Graphic designers create logos, posters, and visuals that share ideas and tell stories.',
    whatTheyDo: 'Graphic designers use art and technology to communicate ideas visually. They design logos, posters, websites, packaging, and social media graphics, choosing colors, fonts, and images that grab attention and send the right message.',
    workEnvironment: 'Designers work at agencies, companies, or as freelancers from home. They spend much of their time on a computer using design software, and often present ideas to clients.',
    howToBecome: 'Many designers earn a degree in graphic design or art, but a strong portfolio of work matters most. Learning design software and practicing with real projects helps build that portfolio.',
    skills: ['Creativity', 'Visual eye', 'Software skills', 'Communication', 'Time management'],
    salary: '$45,000 - $75,000 / year', jobOutlook: 'medium', education: 'Degree in Design or strong portfolio',
    dayInLife: 'A designer might start by reading a client’s request, sketch a few logo ideas, then build them on the computer. They share drafts for feedback, make changes, and prepare the final files for printing or the web.',
  },
  {
    id: 'accountant', title: 'Accountant', categoryId: 'business', icon: '📊', featured: false,
    shortDescription: 'Accountants track money, prepare taxes, and help people and businesses stay financially healthy.',
    whatTheyDo: 'Accountants keep track of money for people and businesses. They record income and spending, prepare tax returns, create financial reports, and give advice on how to save and budget. Their work helps organizations make smart decisions.',
    workEnvironment: 'Accountants usually work in offices or from home, often at firms, companies, or government agencies. The busiest time is tax season in early spring.',
    howToBecome: 'Earn a bachelor’s degree in accounting or finance. Many accountants become Certified Public Accountants (CPAs) by passing the CPA exam, which opens up more job opportunities.',
    skills: ['Math', 'Attention to detail', 'Organization', 'Honesty', 'Computer skills'],
    salary: '$58,000 - $85,000 / year', jobOutlook: 'medium', education: 'Bachelor’s in Accounting (CPA for advancement)',
    dayInLife: 'An accountant might review a company’s expenses in the morning, enter transactions into accounting software, prepare a report for a manager, and answer questions about a client’s taxes in the afternoon.',
  },
  {
    id: 'marine-biologist', title: 'Marine Biologist', categoryId: 'science', icon: '🐬', featured: false,
    shortDescription: 'Marine biologists study ocean life to protect animals, plants, and habitats in the sea.',
    whatTheyDo: 'Marine biologists study creatures and plants that live in oceans and other waters. They research how animals behave, track ocean health, and work to protect endangered species and habitats from pollution and climate change.',
    workEnvironment: 'Their work happens in labs, on boats, and underwater while diving. Fieldwork can mean travel to coasts and remote areas, while research and writing happen at a desk.',
    howToBecome: 'Earn a bachelor’s degree in marine biology or biology. Many roles, especially in research, require a master’s or PhD. Volunteering at aquariums or research centers is a great first step.',
    skills: ['Curiosity', 'Science and research', 'Patience', 'Swimming/diving', 'Writing'],
    salary: '$55,000 - $90,000 / year', jobOutlook: 'medium', education: 'Bachelor’s in Biology (advanced degree for research)',
    dayInLife: 'A marine biologist might collect water samples from a boat in the morning, record observations of dolphins, then return to the lab to study samples under a microscope and write up what they found.',
  },
  {
    id: 'firefighter', title: 'Firefighter', categoryId: 'publicsvc', icon: '🚒', featured: false,
    shortDescription: 'Firefighters protect communities by responding to fires, accidents, and emergencies.',
    whatTheyDo: 'Firefighters respond to fires, car accidents, and medical emergencies to keep people safe. They put out fires, rescue people and animals, give first aid, and teach the community about fire safety and prevention.',
    workEnvironment: 'Firefighters work at fire stations and respond to emergencies anywhere in their area. The job is physical and can be dangerous, with long shifts that include time living at the station.',
    howToBecome: 'Finish high school, then complete fire academy training. Many firefighters also become certified Emergency Medical Technicians (EMTs). Staying physically fit is essential and tested during hiring.',
    skills: ['Physical fitness', 'Bravery', 'Teamwork', 'Quick thinking', 'Staying calm in emergencies'],
    salary: '$50,000 - $80,000 / year', jobOutlook: 'medium', education: 'High school + fire academy + EMT training',
    dayInLife: 'A firefighter checks and cleans equipment at the start of a shift, trains and exercises with the crew, then responds to emergency calls when the alarm sounds — which could be a fire, a crash, or someone needing medical help.',
  },
];

const seedAbout = {
  id: 1,
  heading: 'About Us',
  intro: 'We are three Girl Scouts on a mission to help students discover careers and the steps to reach them. Career Compass is our Silver Award project.',
  mission: 'Our goal is to make career exploration easy and exciting. We research careers — what people really do, the skills they need, and how to get there — and share it all in one friendly place so every student can dream big and plan their future.',
  members: [
    { name: 'Scout One', role: 'Research & Content', emoji: '🌸', bio: 'Loves learning how things work and interviewing people about their jobs. Researches each career so the information is accurate and helpful.' },
    { name: 'Scout Two', role: 'Design & Website', emoji: '🌟', bio: 'Enjoys art and technology. Helps design how the site looks and makes sure it is easy and fun for students to use.' },
    { name: 'Scout Three', role: 'Outreach & Categories', emoji: '🦋', bio: 'Passionate about helping others. Organizes careers into categories and shares the project with schools in the community.' },
  ],
};

async function main() {
  console.log('🌱 Seeding database...');

  await db.insert(categories).values(seedCategories).onConflictDoNothing();
  console.log(`  ✓ ${seedCategories.length} categories`);

  await db.insert(careers).values(seedCareers).onConflictDoNothing();
  console.log(`  ✓ ${seedCareers.length} careers`);

  await db.insert(about).values(seedAbout).onConflictDoNothing();
  console.log('  ✓ about page content');

  await db.insert(settings).values({ key: 'theme', value: 'sky' }).onConflictDoNothing();
  console.log('  ✓ default theme (sky)');

  console.log('✅ Seed complete!');
}

main().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
