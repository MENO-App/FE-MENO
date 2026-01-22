import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>403 - Forbidden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You do not have permission to access this page.</p>
          <div className="flex gap-2">
            <Button onClick={() => navigate(-1)}>Go back</Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Go home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
