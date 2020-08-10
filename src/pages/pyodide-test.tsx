import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';

const templateCode = `# Program to display the Fibonacci sequence up to n-th term

nterms = int(input("How many terms? "))

# first two terms
n1, n2 = 0, 1
count = 0

# check if the number of terms is valid
if nterms <= 0:
   print("Please enter a positive integer")
elif nterms == 1:
   print("Fibonacci sequence upto",nterms,":")
   print(n1)
else:
   print("Fibonacci sequence:")
   while count < nterms:
       print(n1)
       nth = n1 + n2
       # update values
       n1 = n2
       n2 = nth
       count += 1`;
const checkCode = `from nose.tools import assert_equal
assert_equal(some_list, [-4, 'cat', 8.7])`;

export default function PyodideTest() {
  return (
    <Layout>
      <div>
        <h3>Challenge</h3>
        <p>
          Create a variable called <code>some_list</code> and set its value to a
          list containing the values <code>-4</code>, <code>'cat'</code>, and{' '}
          <code>8.7</code>.
        </p>

        <PythonCodingQuestion
          templateCode={templateCode}
          checkCode={checkCode}
        />
      </div>
    </Layout>
  );
}
