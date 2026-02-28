import { useNavigate } from "react-router-dom";
import { Button, Card } from "../design-system/components/ui";

export default function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="app-container">
        <Card className="text-center">
          <img
            src="/assets/logo.png"
            alt="Todo logo"
            className="mx-auto h-12 w-12"
            loading="eager"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">
            Page not found
          </h1>
          <p className="mt-2 text-base text-text-secondary">
            This route does not exist. Return to your todos to continue.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate("/")}>Go to todos</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
