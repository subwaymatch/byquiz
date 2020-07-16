import Layout from 'src/components/layout';

export default function CourseModulePage() {
  return (
    <Layout>
      <h2>Course Module Page</h2>
    </Layout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [
//     {
//       params: { id: 'iaa' },
//     },
//   ];

//   return {
//     paths,
//     fallback: false,
//   };
// };

// function getStaticPaths(): GetStaticPaths {
//   const paths = [
//     {
//       params: { id: 'iaa' },
//     },
//   ];

//   return {
//     paths,
//     fallback: false,
//   };
// }

// function getStaticPaths() {
//   return {
//     paths: {
//       params: {
//         id: 'test',
//       },
//     },
//     fallback: false,
//   };
// }

async function getStaticProps() {}
