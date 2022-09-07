// For the supervisor only - to be able to create a new carer in the database
import { CreateCarerForm } from "../components/organisms/CreateCarer";

export const SupervisorCreateCarerPage = () => {
  return (
    <div>
      <h1>Welcome to the Supervisor Page - Form to add a carer</h1>
      <CreateCarerForm />
    </div>
  );
};
