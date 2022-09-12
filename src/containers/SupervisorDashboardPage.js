// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others

export const SupervisorDashboardPage = () => {
  return (
    <>
      <h1>SupervisorDashboardPage</h1>
      <h3>Displaying a test image here with the aws bucket image url:</h3>
      <div>
        <img
          src="https://wecarebootcampappbucket.s3.eu-west-1.amazonaws.com/avatar3.png"
          alt="carer"
        />
      </div>
      <h3>Displaying below the form to upload an image to the aws bucket:</h3>
    </>
  );
};
