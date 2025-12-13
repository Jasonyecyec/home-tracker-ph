import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Users() {
  return (
    <div className="p-5 border rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Users</h2>

        <Button>
          <Plus />
          Add Users
        </Button>
      </div>
    </div>
  );
}
