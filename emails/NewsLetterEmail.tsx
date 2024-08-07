// import React from 'react';
// import {
//   Html,
//   Head,
//   Body,
//   Container,
//   Section,
//   Text,
//   Link,
//   Preview,
// } from '@react-email/components';

// interface JobListing {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   url: string;
// }

// interface NewsletterProps {
//   firstName: string;
//   jobListings: JobListing[];
// }
// interface NewsletterPropsTemp {
//   email:string
// }

//  const NewsLetterEmail: React.FC<NewsletterPropsTemp> = ({
//   email
// }) => (
//   <Html>
//     <Head>
//       <title>NewsLetter</title>
//     </Head>
//     <Preview>Job Portal - Weekly Job Listings</Preview>
//     <Body className="bg-gray-100 font-sans">
//       <Container className="mx-auto p-4 max-w-xl">
//         <Section className="bg-blue-600 p-6 rounded-t-lg">
//           <Text className="text-white text-2xl font-bold text-center m-0">
//             Job Portal Newsletter
//           </Text>
//         </Section>
//         <Section className="bg-white p-8 rounded-b-lg">
//           <Text className="text-xl font-bold mb-4">Hello {email},</Text>
//           {/* <Text className="text-base mb-6">
//             Here are this week's top job listings tailored for you:
//           </Text>
//           {jobListings.map((job) => (
//             <Section key={job.id} className="mb-6">
//               <Text className="text-lg font-bold mb-2">{job.title}</Text>
//               <Text className="text-sm text-gray-600 mb-2">
//                 {job.company} - {job.location}
//               </Text>
//               <Link href={job.url} className="text-blue-600 hover:underline">
//                 View Job
//               </Link>
//             </Section>
//           ))} */}
//           <Text className="text-base mb-6">
//             Don't miss out on these opportunities! Visit our website for more
//             job listings.
//           </Text>
//           <Link
//             href="https://job-portal-beta-coral.vercel.app/jobs-and-opportunity"
//             className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-center inline-block"
//           >
//             Explore More Jobs
//           </Link>
//         </Section>
//         <Section className="text-center py-6">
//           <Text className="text-sm text-gray-600 mb-2">
//             © 2024 Your Job Portal. All rights reserved.
//           </Text>
//           <Text className="text-sm text-gray-600">
//             You're receiving this email because you subscribed to our job alerts.{' '}
//             <Link
//               href="https://job-portal-beta-coral.vercel.app/"
//               className="text-blue-600 hover:underline"
//             >
//               Unsubscribe
//             </Link>
//           </Text>
//         </Section>
//       </Container>
//     </Body>
//   </Html>
// );

// export default NewsLetterEmail;

import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link, Preview } from '@react-email/components';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
}

interface NewsletterProps {
  firstName: string;
  jobListings: JobListing[];
}

interface NewsletterPropsTemp {
  email: string;
}

const NewsLetterEmail: React.FC<NewsletterPropsTemp> = ({ email }) => (
  <Html>
    <Head>
      <title>Weekly Job Portal Newsletter</title>
    </Head>
    <Preview>Unlock Your Potential - Explore New Job Opportunities</Preview>
    <Body className="bg-gray-100 font-sans">
      <Container className="mx-auto p-4 max-w-xl">
        <Section className="bg-blue-600 p-6 rounded-t-lg">
          <Text className="text-white text-2xl font-bold text-center m-0">
            Your Weekly Job Digest
          </Text>
        </Section>
        <Section className="bg-white p-8 rounded-b-lg">
          <Text className="text-xl font-bold mb-4">Greetings, {email}!</Text>
          <Text className="text-base mb-6">
            Stay ahead in your career with our curated selection of job opportunities. Dive into the latest openings and find your next challenge:
          </Text>
          {/* Uncomment and populate with actual job listings for dynamic content
          {jobListings.map((job) => (
            <Section key={job.id} className="mb-6">
              <Text className="text-lg font-bold mb-2">{job.title}</Text>
              <Text className="text-sm text-gray-600 mb-2">
                {job.company} - {job.location}
              </Text>
              <Link href={job.url} className="text-blue-600 hover:underline">
                View Job
              </Link>
            </Section>
          ))}
          */}
          <Text className="text-base mb-6">
            Explore more opportunities and find the perfect fit for your skills and aspirations on our website.
          </Text>
          <Link
            href="https://job-portal-beta-coral.vercel.app/jobs-and-opportunity"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-center inline-block"
          >
            Discover More Jobs
          </Link>
        </Section>
        <Section className="text-center py-6">
          <Text className="text-sm text-gray-600 mb-2">
            © 2023 Job Portal. All rights reserved.
          </Text>
          <Text className="text-sm text-gray-600">
            You received this email because you signed up for job alerts on our platform. If you prefer not to receive these emails, you can{' '}
            <Link
              href="https://job-portal-beta-coral.vercel.app/unsubscribe"
              className="text-blue-600 hover:underline"
            >
              unsubscribe here.
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewsLetterEmail;